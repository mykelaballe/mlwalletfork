import React from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Text, Spacer, Button, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts, Say, Func} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn.rmi.short_desc
    })

    state = {
        transaction_no:'',
        currency:Consts.currency.PH,
        amount:'',
        partner:null,
        sender:'',
        processing:false
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state

        if(params.currency && params.currency.abbr !== prevState.currency) {
            this.props.navigation.setParams({currency:null})
            this.setState({currency:params.currency.abbr})
        }

        if(params.partner && params.partner !== prevState.partner) {
            this.props.navigation.setParams({partner:null})
            this.setState({partner:params.partner})
        }
    }

    handleChangeTransactionNo = transaction_no => this.setState({transaction_no})
    handleChooseCurrency = () => this.props.navigation.navigate('Currencies')
    handleChangeAmount = amount => this.setState({amount})
    handleChoosePartner = () => this.props.navigation.navigate('Partners')
    handleChangeSender = sender => this.setState({sender})

    handleFocusAmount = () => this.refs.amount.focus()
    handleFocusSender = () => this.refs.sender.focus()

    handleSubmit = async () => {
        const {walletno} = this.props.user
        const {params} = this.props.navigation.state
        let {transaction_no, currency, amount, partner, sender, processing} = this.state
        let latitude = Consts.defaultLatitude, longitude = Consts.defaultLongitude

        if(processing) return false
        
        try {
            this.setState({processing:true})

            if(Func.isCheckLocation(Consts.tcn.rmi.code)) {
                const locationRes = await Func.getLocation()
                if(locationRes.error) {
                    this.setState({processing:false})
                    return false
                }
                else {
                    latitude = locationRes.data.latitude
                    longitude = locationRes.data.longitude
                }
            }

            transaction_no = transaction_no.trim()
            amount = amount.trim()
            sender = sender.trim()

            if(!transaction_no || !currency || !amount || !partner || !sender) Say.some(_('8'))
            else if(Func.formatToCurrency(amount) <= 0) Say.warn(_('89'))
            else {
   
                let res = await API.receiveMoneyInternational({
                    walletno,
                    referenceno:transaction_no,
                    currency,
                    amount,
                    accountid:partner.PartnersID,
                    partnersname:partner.PartnersName,
                    sendername:sender,
                    latitude,
                    longitude
                })

                if(res.error) {
                    Say.attemptLeft(res.message)

                    if(res.message == Consts.error.blk1d) this.props.logout()
                }
                else {
                    this.props.updateBalance(res.data.balance)

                    let transRes = await API.getTransaction(transaction_no)

                    this.props.navigation.navigate('TransactionReceipt',{
                        ...params,
                        ...res.data,
                        kptn:transaction_no,
                        transaction: {
                            ...this.state,
                            partner:partner.PartnersName,
                            transdate:transRes.data.transdate
                        },
                        kptn:transaction_no,
                        status:'success'
                    })
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {transaction_no, currency, amount, partner, sender, processing} = this.state
        let ready = false

        if(transaction_no && currency && amount && partner && sender) ready = true

        return (
            <>
                <Screen>
                    <TextInput
                        ref='transaction_no'
                        label='Transaction No.'
                        value={transaction_no}
                        onChangeText={this.handleChangeTransactionNo}
                        onSubmitEditing={this.handleFocusAmount}
                        autoCapitalize='none'
                        returnKeyType='next'
                    />

                    <TouchableOpacity onPress={this.handleChooseCurrency}>
                        <TextInput
                            disabled
                            label='Currency'
                            value={currency}
                            rightContent={<Icon name='ios-arrow-forward' color={Colors.gray} size={Metrics.icon.sm} />}
                        />
                    </TouchableOpacity>

                    <TextInput
                        ref='amount'
                        label={`Amount (${currency})`}
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleFocusSender}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TouchableOpacity onPress={this.handleChoosePartner}>
                        <TextInput
                            disabled
                            label="Partner's Name"
                            value={partner && partner.PartnersName}
                            rightContent={<Icon name='ios-list' color={Colors.gray} size={Metrics.icon.rg} />}
                        />
                    </TouchableOpacity>

                    <TextInput
                        ref='sender'
                        label="Sender's Name"
                        placeholder="Lastname, Firstname Middlename"
                        value={sender}
                        onChangeText={this.handleChangeSender}
                        autoCapitalize='words'
                    />
                </Screen>
                
                <Footer>
                    <Text center>Make sure to enter the correct Transaction No. Five attempts will block your account for 24 hrs.</Text>
                    <Spacer sm />
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updateBalance: newBalance => dispatch(Creators.updateBalance(newBalance)),
    logout: () => dispatch(Creators.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)