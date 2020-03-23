import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, View, Text, Spacer, Button} from '../'
import {Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

const moment = require('moment')

class SendWalletToWallet extends React.Component {

    state = {
        amount:Func.formatToCurrency(amount),
        charges:Func.formatToCurrency(charges),
        total:Func.formatToCurrency(total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.stw.long_desc
    }

    componentDidMount = () => {
        const {walletno, receiver, notes, balance} = this.props.data
        const {amount, charges, total} = this.state

        this.props.onExport(`
            <h4 style="color:#6A6A6A;line-height:0">Wallet Account Number</h4>
            <h3>${walletno}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Receiver</h4>
            <h3>${receiver.fullname}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Amount</h4>
            <h3 style="margin-top:0">PHP ${amount}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Notes</h4>
            <h3 style="margin-top:0">PHP ${notes}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Charges</h4>
            <h3 style="margin-top:0">PHP ${charges}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Total</h4>
            <h3 style="margin-top:0">PHP ${total}</h3>
        `)

        Say.ok(
            null,
            'Success',
            {
                customMessage:(
                    <>
                        <Text mute md>You successfully sent money worth PHP {amount} to {walletno}</Text>
                        <Spacer lg />
                        <Text mute>Your new balance is</Text>
                        <Text xl b>Php {Func.formatToCurrency(balance)}</Text>
                    </>
                )
            }
        )
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, tcn, walletno, receiver, notes} = this.props.data
        const {amount, charges, total, date, time, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={tcn}
                        status='success'
                    />

                    <View style={{padding:Metrics.lg}}>
                        <Text sm mute>Wallet Account Number</Text>
                        <Text>{walletno}</Text>

                        <Spacer />

                        <Text sm mute>Receiver</Text>
                        <Text>{receiver.fullname}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

                        <Spacer />

                        <Text sm mute>Notes</Text>
                        <Text>{notes}</Text>

                        <Spacer />

                        <Text sm mute>Charges</Text>
                        <Text>PHP {charges}</Text>

                        <Spacer />

                        <Text sm mute>Total</Text>
                        <Text>PHP {total}</Text>

                        <Spacer />

                        <Text sm mute>Date</Text>
                        <Text>{date}</Text>

                        <Spacer />

                        <Text sm mute>Time</Text>
                        <Text>{time}</Text>

                        <Spacer />

                        <Text sm mute>Type</Text>
                        <Text>{type}</Text>
                    </View>
                </Screen>

                <Footer>
                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(SendWalletToWallet)