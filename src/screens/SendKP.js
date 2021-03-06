import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Text, Spacer, Button, ButtonText, TextInput, Icon, HeaderRight} from '../components'
import {Colors} from '../themes'
import {_, Consts, Func, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn.skp.short_desc,
        headerRight:(
            <HeaderRight>
                <ButtonText color={Colors.light} t='Rates' onPress={() => navigation.navigate('Rates')} />
            </HeaderRight>
        )
    })

    state = {
        receiver:this.props.navigation.state.params.receiver,
        amount:'',
        charges:'',
        total:'',
        processing:false
    }

    componentDidMount = () => this.getData()

    getData = async () => {
        try {
            let rates = await API.getRates()
            this.props.setRates(rates)
        }
        catch(err) {

        }
    }

    handleChangeAmount = amount => {
        let charges = Func.calculateKPRate(amount, this.props.rates)
        if(Func.isAmount2Decimal(amount)) {
            this.setState({
                amount,
                charges,
                total:Func.compute(charges, amount)
            })
        }
    }

    handleAddNewReceiver = () => this.props.navigation.navigate('SavedKPReceivers')

    handleSendMoney = async () => {
        const {amount, total, processing} = this.state
        const {params} = this.props.navigation.state

        if(processing) return false

        try {
            this.setState({processing:true})
            
            if(Func.formatToCurrency(amount) <= 0) Say.warn(_('89'))
            else {
                let res = await API.sendKPValidate({
                    walletno:this.props.user.walletno,
                    principal:amount
                })
    
                if(!res.error) {
    
                    this.props.navigation.navigate('TransactionReview',{
                        type:Consts.tcn.skp.code,
                        ...params,
                        transaction: {
                            ...this.state,
                            sender:Func.formatName(this.props.user)
                        },
                        cancellable:true
                    })
                }
                else {
                    Say.warn(res.message)
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {receiver, amount, charges, total, processing} = this.state
        let ready = false

        if(receiver && amount) ready = true

        return (
            <>
                <Screen>

                    <TextInput
                        disabled
                        label='Receiver'
                        value={Func.formatName(receiver)}
                        rightContent={<Icon name='user_plus' size={20} />}
                    />

                    <TextInput
                        editable={!processing}
                        label={`Amount (${Consts.currency.PH})`}
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />
                </Screen>
                
                <Footer>
                    <Text mute>Charge</Text>
                    <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(charges)}</Text>

                    <Spacer />

                    <Text mute>Total</Text>
                    <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(total)}</Text>

                    <Spacer />
                    
                    <Button disabled={!ready} t={Consts.tcn.skp.submit_text} onPress={this.handleSendMoney} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data,
    ...state.kp
})

const mapDispatchToProps = dispatch => ({
    setRates: rates => dispatch(Creators.setKPRates(rates))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)