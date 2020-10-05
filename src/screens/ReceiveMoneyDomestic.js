import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Text, Spacer, Button, TextInput} from '../components'
import {_, Consts, Say, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:Consts.tcn.rmd.short_desc
    }

    state = {
        transaction_no:'',
        amount:'',
        firstname:'',
        lastname:'',
        processing:false
    }

    handleChangeTransactionNo = transaction_no => this.setState({transaction_no})
    handleChangeAmount = amount => this.setState({amount})
    handleChangeFirstName = firstname => this.setState({firstname})
    handleChangeLastName = lastname => this.setState({lastname})

    handleFocusAmount = () => this.refs.amount.focus()
    handleFocusFirstName = () => this.refs.firstname.focus()
    handleFocusLastName = () => this.refs.lastname.focus()

    handleSubmit = async () => {
        const {walletno} = this.props.user
        const {params} = this.props.navigation.state
        let {transaction_no, amount, firstname, lastname, processing} = this.state
        let latitude = Consts.defaultLatitude, longitude = Consts.defaultLongitude

        if(processing) return false
        
        try {
            this.setState({processing:true})

            if(Func.isCheckLocation(Consts.tcn.rmd.code)) {
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
            firstname = firstname.trim()
            lastname = lastname.trim()

            if(!transaction_no || !amount || !firstname || !lastname) Say.some(_('8'))
            else if(Func.formatToCurrency(amount) <= 0) Say.warn(_('89'))
            else {
                this.props.startTransaction()

                let res = await API.receiveMoneyDomestic({
                    walletno,
                    kptn:transaction_no,
                    principal:amount,
                    sender_firstname:firstname,
                    sender_lastname:lastname,
                    latitude,
                    longitude
                })

                if(res.error) {
                    Say.attemptLeft(res.message)

                    if(res.message == Consts.error.blk1d) this.props.logout()
                }
                else {

                    if(parseFloat(res.data.forexRate) > 0) amount = amount * res.data.forexRate

                    this.props.updateBalance(res.data.balance)

                    let transRes = await API.getTransaction(transaction_no)

                    this.props.navigation.navigate('TransactionReceipt',{
                        ...params,
                        ...res.data,
                        transaction: {
                            ...this.state,
                            ...res.data,
                            amount,
                            sender:`${firstname} ${lastname}`,
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

        this.props.endTransaction()

        this.setState({processing:false})
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {transaction_no, amount, firstname, lastname, processing} = this.state
        let ready = false

        if(transaction_no && amount && firstname && lastname) ready = true

        return (
            <>
                <Screen>
                    <TextInput
                        editable={!processing}
                        ref='transaction_no'
                        label='Transaction No.'
                        value={transaction_no}
                        onChangeText={this.handleChangeTransactionNo}
                        onSubmitEditing={this.handleFocusAmount}
                        autoCapitalize='characters'
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
                        ref='amount'
                        label={`Amount (${Consts.currency.PH}/USD)`}
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleFocusFirstName}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
                        ref='firstname'
                        label="Sender's First Name"
                        value={firstname}
                        onChangeText={this.handleChangeFirstName}
                        onSubmitEditing={this.handleFocusLastName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
                        ref='lastname'
                        label="Sender's Last Name"
                        value={lastname}
                        onChangeText={this.handleChangeLastName}
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
    startTransaction: () => dispatch(Creators.startTransaction()),
    endTransaction: () => dispatch(Creators.endTransaction()),
    updateBalance: newBalance => dispatch(Creators.updateBalance(newBalance)),
    logout: () => dispatch(Creators.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)