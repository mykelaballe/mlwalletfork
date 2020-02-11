import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class TransactionReview extends React.Component {

    static navigationOptions = {
        title:'Review Transaction'
    }

    state = {
        amount:parseFloat(this.props.navigation.state.params.amount).toFixed(2)
    }

    handleConfirm = () => {
        const {navigate, state} = this.props.navigation
        navigate('OTPConfirmation',{...state.params})
    }

    render() {

        const {type, wallet_account_number, receiver, biller, account_name, account_number, notes, load} = this.props.navigation.state.params
        const {amount} = this.state

        return (
            <View style={style.container}>
                {Consts.tcn[type].action === 'send' && <Text mute center>You are about to send</Text>}
                {Consts.tcn[type].action === 'receive' && <Text mute center>You are about to receive</Text>}
                {Consts.tcn[type].action === 'withdraw' && <Text mute center>You are about to withdraw</Text>}
                {Consts.tcn[type].action === 'load' && <Text mute center>You are about to load</Text>}
                
                {!biller && <Text center xl b>PHP {amount}</Text>}
                {biller && <Text center lg b>{biller.name}</Text>}

                <Spacer lg />

                {type === Consts.tcn.stw.code &&
                <>
                    <Text mute sm>Wallet Account Number</Text>
                    <Text md>{wallet_account_number}</Text>

                    <Spacer />

                    <Text mute sm>Receiver</Text>
                    <Text md>{receiver}</Text>

                    <Spacer />

                    <Text mute sm>Amount</Text>
                    <Text md>PHP {amount}</Text>

                    <Spacer />

                    <Text mute sm>Notes</Text>
                    <Text md>{notes}</Text>

                    <Spacer />

                    <Text mute sm>Charges</Text>
                    <Text md>PHP 25.00</Text>

                    <Spacer />

                    <Text mute sm>Total</Text>
                    <Text md>PHP 25.00</Text>
                </>
                }

                {type === Consts.tcn.skp.code &&
                <>
                    <Text mute sm>Receiver</Text>
                    <Text md>{receiver}</Text>

                    <Spacer />

                    <Text mute sm>Amount</Text>
                    <Text md>PHP {amount}</Text>

                    <Spacer />

                    <Text mute sm>Charges</Text>
                    <Text md>PHP 25.00</Text>

                    <Spacer />

                    <Text mute sm>Total</Text>
                    <Text md>PHP 25.00</Text>
                </>
                }

                {type === Consts.tcn.stb.code &&
                <>
                    <Text mute sm>Partner Bank</Text>
                    <Text md>{receiver}</Text>

                    <Spacer />

                    <Text mute sm>Account Name</Text>
                    <Text md>{account_name}</Text>

                    <Spacer />

                    <Text mute sm>Account No.</Text>
                    <Text md>{account_number}</Text>

                    <Spacer />

                    <Text mute sm>Amount</Text>
                    <Text md>PHP {amount}</Text>

                    <Spacer />

                    <Text mute sm>Fixed Charge</Text>
                    <Text md>PHP 100.00</Text>

                    <Spacer />

                    <Text mute sm>Convenience Fee</Text>
                    <Text md>PHP 15.00</Text>

                    <Spacer />

                    <Text mute sm>Total</Text>
                    <Text md>PHP 215.00</Text>
                </>
                }

                {type === Consts.tcn.wdc.code &&
                <>
                    <Text mute sm>Full Legal Name</Text>
                    <Text md>John Smith</Text>

                    <Spacer />

                    <Text mute sm>Amount</Text>
                    <Text md>PHP {amount}</Text>

                    <Spacer />

                    <Text mute sm>Charges</Text>
                    <Text md>PHP 0.00</Text>

                    <Spacer />

                    <Text mute sm>Total</Text>
                    <Text md>PHP 25.00</Text>
                </>
                }

                {type === Consts.tcn.bpm.code &&
                <>
                    <Text mute sm>Account Number</Text>
                    <Text md>123456789</Text>

                    <Spacer />

                    <Text mute sm>Account Name</Text>
                    <Text md>John Smith</Text>

                    <Spacer />

                    <Text mute sm>Amount</Text>
                    <Text md>PHP {amount}</Text>

                    <Spacer />

                    <Text mute sm>Fixed Charges</Text>
                    <Text md>PHP 15.00</Text>

                    <Spacer />

                    <Text mute sm>Convenience Fee</Text>
                    <Text md>PHP 7.00</Text>

                    <Spacer />

                    <Text mute sm>Total</Text>
                    <Text md>PHP 25.00</Text>
                </>
                }

                {type === Consts.tcn.bul.code &&
                <>
                    <Text mute sm>Mobile Number</Text>
                    <Text md>09123456789</Text>

                    <Spacer />

                    <Text mute sm>Promo Code</Text>
                    <Text md>Regular</Text>

                    <Spacer />

                    <Text mute sm>Amount</Text>
                    <Text md>PHP 20.00</Text>
                </>
                }

                <View style={style.footer}>
                    <Text center mute>Please review the details before you proceed.</Text>
                    <Spacer sm />
                    <Button t='Next' onPress={this.handleConfirm} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    },
    item: {
        padding:Metrics.rg
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default TransactionReview