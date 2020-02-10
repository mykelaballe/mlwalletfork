import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Button, Spacer, ButtonIcon, HR, Ripple, TopBuffer, HeaderRight, Prompt} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'
import Icon from 'react-native-vector-icons/AntDesign'

const moment = require('moment')

class TransactionReceipt extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title:'Transaction Receipt',
            headerLeft:params._from === 'history' ? undefined : <View />,
            headerRight: (
                <HeaderRight>
                    <ButtonIcon icon={<Icon name='download' size={Metrics.icon.sm} color={Colors.light} />} onPress={() => {}} />
                </HeaderRight>
            )
        }
    }

    state = {
        today:moment().format('MMMM DD, YYYY'),
        amount:parseFloat(this.props.navigation.state.params.amount).toFixed(2),
        showSuccessModal:true,
        showCancelModal:false,
        showOkModal:false
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    handleCloseModal = () => {
        this.setState({
            showSuccessModal:false,
            showCancelModal:false,
            showOkModal:false
        })
    }

    handleCancelTransaction = () => this.setState({showCancelModal:true})

    handleOnCancel = () => {
        this.cancelTransaction()
        this.setState({showCancelModal:false})
    }

    cancelTransaction = async () => {
        this.setState({showOkModal:true})
        this.props.navigation.setParams({
            cancellable:false,
            status:'cancelled',
            statusMessage:''
        })
    }

    render() {
        let balance = '900.00'
        const {_from, type, status, statusMessage, cancellable, wallet_account_number, biller, receiver, sender, partner, account_name, account_number, notes, charges, fixed_charge, convenience_fee, total} = this.props.navigation.state.params
        const {today, amount, showSuccessModal, showCancelModal, showOkModal} = this.state
        let statusIcon = 'clockcircleo'
        let statusColor = Colors.gray
        let statusText = 'Transaction'

        if(status) {
            if(status === 'success') {
                statusIcon = 'check'
                statusColor = Colors.success
                statusText = `${statusText} Successful`
            }
            else if(status === 'cancelled') {
                statusIcon = 'close'
                statusColor = Colors.danger
                statusText = `${statusText} Cancelled`
            }
        }
        else {
            statusText = `${statusText} Pending`
        }

        if(statusMessage) statusText = statusMessage

        return (
            <ScrollView style={style.container}>

                <Row style={[style.smallBanner,{backgroundColor:statusColor}]}>
                    <Icon name={statusIcon} color={!status ? Colors.dark : Colors.light} size={Metrics.icon.sm} />
                    <Spacer h xs />
                    <Text center color={!status ? Colors.dark : Colors.light}>{statusText}</Text>
                </Row> 

                <View style={style.bigBanner}>
                    <Text center light>Transaction No.</Text>
                    <Text b lg center light>MLW-0011-718-2031-822-1211</Text>
                </View>

                <View style={style.innerContainer}>
                    {type === Consts.tcn.stw.code &&
                    <>
                        <Prompt
                            visible={showSuccessModal}
                            title='Success'
                            customMessage={
                                <>
                                    <Text mute md>You successfully sent money worth PHP {amount}</Text>
                                    <Spacer lg />
                                    <Text mute>Your new balance is</Text>
                                    <Text xl b>Php {balance}</Text>
                                </>
                            }
                            onDismiss={this.handleCloseModal}
                        />
 
                        <Text sm mute>Wallet Account Number</Text>
                        <Text>{wallet_account_number}</Text>

                        <Spacer />

                        <Text sm mute>Receiver</Text>
                        <Text>{receiver}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

                        <Spacer />

                        <Text sm mute>Notes</Text>
                        <Text>{notes}</Text>

                        <Spacer />

                        <Text sm mute>Charges</Text>
                        <Text>PHP 25.00</Text>
                    </>
                    }

                    {type === Consts.tcn.skp.code &&
                    <>
                        <Prompt
                            visible={showSuccessModal}
                            title='Success'
                            customMessage={
                                <>
                                    <Text mute md>Share the transaction number to {receiver} to complete this transaction.</Text>
                                    <Spacer lg />
                                    <Text mute>Your new balance is</Text>
                                    <Text xl b>Php {balance}</Text>
                                </>
                            }
                            onDismiss={this.handleCloseModal}
                        />

                        <Prompt
                            type='yes_no'
                            visible={showCancelModal}
                            title='Cancel Transaction'
                            message='Are you sure you want to cancel this transaction?'
                            onDismiss={this.handleCloseModal}
                            onConfirm={this.handleOnCancel}
                        />

                        <Prompt
                            visible={showOkModal}
                            title='Success'
                            message={`Your transaction ${Consts.tcn[type].short_desc} has been cancelled`}
                            onDismiss={this.handleCloseModal}
                        />

                        <Text sm mute>Full Legal Name</Text>
                        <Text>{receiver}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

                        <Spacer />

                        <Text sm mute>Charges</Text>
                        <Text>PHP 25.00</Text>
                    </>
                    }

                    {type === Consts.tcn.stb.code &&
                    <>
                        <Prompt
                            visible={showSuccessModal}
                            title='Success'
                            customMessage={
                                <>
                                    <Text mute md>You successfully transferred money to bank. Expect 2-3 banking days for your new balance to reflect.</Text>
                                    <Spacer lg />
                                    <Text mute>Your new balance is</Text>
                                    <Text xl b>Php {balance}</Text>
                                </>
                            }
                            onDismiss={this.handleCloseModal}
                        />
 
                        <Text sm mute>Partner's Name</Text>
                        <Text>{receiver}</Text>

                        <Spacer />

                        <Text sm mute>Account Name</Text>
                        <Text>{account_name}</Text>

                        <Spacer />

                        <Text sm mute>Account No.</Text>
                        <Text>PHP {account_number}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

                        <Spacer />

                        <Text sm mute>Fixed Charge</Text>
                        <Text>PHP 25.00</Text>

                        <Spacer />

                        <Text sm mute>Convenience Fee</Text>
                        <Text>PHP 25.00</Text>
                    </>
                    }

                    {type === Consts.tcn.rmd.code &&
                    <>
                        <Prompt
                            visible={showSuccessModal}
                            title='Success'
                            customMessage={
                                <>
                                    <Text mute md>You have successfully received Php {amount} from {sender}.</Text>
                                    <Spacer lg />
                                    <Text mute>Your new balance is</Text>
                                    <Text xl b>Php {balance}</Text>
                                </>
                            }
                            onDismiss={this.handleCloseModal}
                        />
 
                        <Text sm mute>Sender</Text>
                        <Text>{sender}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>
                    </>
                    }

                    {type === Consts.tcn.rmi.code &&
                    <>
                        <Prompt
                            visible={showSuccessModal}
                            title='Success'
                            customMessage={
                                <>
                                    <Text mute md>You have successfully received Php {amount} from {sender}.</Text>
                                    <Spacer lg />
                                    <Text mute>Your new balance is</Text>
                                    <Text xl b>Php {balance}</Text>
                                </>
                            }
                            onDismiss={this.handleCloseModal}
                        />
 
                        <Text sm mute>Sender</Text>
                        <Text>{sender}</Text>

                        <Spacer />

                        <Text sm mute>Partner</Text>
                        <Text>{partner}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>
                    </>
                    }

                    {type === Consts.tcn.wdc.code &&
                    <>
                        <Prompt
                            visible={showSuccessModal}
                            title='Success'
                            customMessage={
                                <>
                                    <Text mute md>Your transaction is pending. Go to the nearest M Lhuillier branch to complete your withdraw</Text>
                                    <Spacer lg />
                                    <Text mute>Your new balance is</Text>
                                    <Text xl b>Php {balance}</Text>
                                </>
                            }
                            onDismiss={this.handleCloseModal}
                        />

                        <Prompt
                            type='yes_no'
                            visible={showCancelModal}
                            title='Cancel Transaction'
                            message='Are you sure you want to cancel this transaction?'
                            onDismiss={this.handleCloseModal}
                            onConfirm={this.handleOnCancel}
                        />

                        <Prompt
                            visible={showOkModal}
                            title='Success'
                            message={`Your transaction has been cancelled`}
                            onDismiss={this.handleCloseModal}
                        />

                        <Text sm mute>Full Legal Name</Text>
                        <Text>John Smith</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>
                    </>
                    }

                    {type === Consts.tcn.bpm.code &&
                    <>
                        <Text sm mute>Biller</Text>
                        <Text>{biller.name}</Text>

                        <Spacer />

                        <Text sm mute>Account No.</Text>
                        <Text>123456789</Text>

                        <Spacer />

                        <Text sm mute>Account Name</Text>
                        <Text>John Smith</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

                        <Spacer />

                        <Text sm mute>Fixed Charge</Text>
                        <Text>PHP 15.00</Text>

                        <Spacer />

                        <Text sm mute>Convenience Fee</Text>
                        <Text>PHP 7.00</Text>

                        <Spacer />

                        <Text sm mute>Total Amount</Text>
                        <Text>PHP 30.00</Text>
                    </>
                    }

                    {type === Consts.tcn.bul.code &&
                    <>
                        <Prompt
                            visible={showSuccessModal}
                            title='Success'
                            customMessage={
                                <>
                                    <Text mute md>Your successfully sent load worth PHP 10.00 to 0912345678</Text>
                                    <Spacer lg />
                                    <Text mute>Your new balance is</Text>
                                    <Text xl b>Php {balance}</Text>
                                </>
                            }
                            onDismiss={this.handleCloseModal}
                        />

                        <Text sm mute>Mobile Number</Text>
                        <Text>0912345678</Text>

                        <Spacer />

                        <Text sm mute>Promo Code</Text>
                        <Text>GoSURF10</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP 10.00</Text>
                    </>
                    }

                    <Spacer />

                    {Consts.tcn[type].action === 'send' &&
                    <>
                        <Text sm mute>Total</Text>
                        <Text>PHP 25.00</Text>

                        <Spacer />
                    </>
                    }

                    <Text sm mute>Date</Text>
                    <Text>{today}</Text>

                    <Spacer />

                    <Text sm mute>Type</Text>
                    <Text>{Consts.tcn[type].long_desc}</Text>

                    <Spacer />

                    <View style={style.footer}>
                        {cancellable &&
                        <>
                            <Button mode='outlined' t='Cancel Transaction' onPress={this.handleCancelTransaction} />
                            <Spacer sm />
                        </>
                        }
                        {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1
    },
    smallBanner: {
        backgroundColor:Colors.black,
        padding:Metrics.sm,
        justifyContent:'center'
    },
    bigBanner: {
        backgroundColor:Colors.dark,
        padding:Metrics.xl
    },
    innerContainer: {
        flex:1,
        padding:Metrics.lg
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default TransactionReceipt