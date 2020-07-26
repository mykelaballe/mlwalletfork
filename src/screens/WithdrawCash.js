import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text, Spacer, Button, TextInput, Icon} from '../components'
import {Metrics} from '../themes'
import {_, Consts, Func, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Withdraw Money'
    }

    state = {
        type:Consts.tcn.wdc.code,
        amount:'',
        charges:'',
        total:'',
        processing:false
    }

    handleChangeAmount = amount => {
        this.setState({
            amount,
            total:Func.compute(this.state.charges, amount)
        })
    }

    handleWithdraw = async () => {
        const {amount, processing} = this.state
        const {params} = this.props.navigation.state

        if(processing) return false

        try {
            this.setState({processing:true})

            if(Func.formatToCurrency(amount) <= 0) Say.warn(_('89'))
            else {
                let res = await API.withdrawCashValidate({
                    walletno:this.props.user.walletno,
                    amount
                })
        
                if(!res.error) {
                    this.props.navigation.navigate('TransactionReview',{
                        type:this.state.type,
                        ...params,
                        transaction: {
                            user:this.props.user,
                            ...this.state
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

        const {type, amount, charges, total, processing} = this.state
        let ready = false

        if(amount) ready = true

        return (
            <>
                <Screen>
                    <View style={{alignItems:'center'}}>
                        <Icon name='withdraw_cash' size={Metrics.icon.xl} />
                    </View>

                    <Spacer md />

                    <Headline subtext='Enter amount to be withdrawn' />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />
                </Screen>
                
                <Footer>
                    <Text mute>Charges</Text>
                    <Text md>PHP {Func.formatToRealCurrency(charges)}</Text>

                    <Spacer />

                    <Text mute>Total</Text>
                    <Text md>PHP {Func.formatToRealCurrency(total)}</Text>

                    <Spacer />
                    
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleWithdraw} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)