import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, View} from '../'
import {Metrics} from '../../themes'
import {Consts, Func, Say} from '../../utils'

const moment = require('moment')

class WithdrawCash extends React.Component {
    
    state = {
        status:this.props.data.status,
        cancellable:this.props.data.cancellable
    }

    componentDidMount = () => {
        Say.ok(
            null,
            'Success',
            {
                customMessage:(
                    <>
                        <Text mute md>Your transaction is pending. Go to the nearest M Lhuillier branch to complete your withdraw</Text>
                        <Spacer lg />
                        <Text mute>Your new balance is</Text>
                        <Text xl b>Php 1000</Text>
                    </>
                )
            }
        )
    }

    handleCancelTransaction = () => {
        Say.ask(
            'Are you sure you want to cancel this transaction?',
            'Cancel Transaction',
            {
                onConfirm:this.cancelTransaction
            }
        )
    }

    cancelTransaction = async () => {
        this.setState({
            cancellable:false,
            status:'cancelled'
        })
    }

    handleShowQR = () => this.props.navigation.navigate('TransactionQR',{transaction_no:this.props.data.tcn})

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, tcn, timestamp, user, amount, charges, total} = this.props.data
        const {status, cancellable} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        status={status}
                        cancellable={cancellable}
                        tcn={tcn}
                    />

                    <View style={{padding:Metrics.lg}}>
                        <Text sm mute>Full Legal Name</Text>
                        <Text>{user.fname} {user.lname}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {Func.formatToCurrency(amount)}</Text>

                        <Spacer />

                        <Text sm mute>Date</Text>
                        <Text>{moment(timestamp).format('MMMM DD, YYYY')}</Text>

                        <Spacer />

                        <Text sm mute>Time</Text>
                        <Text>{moment(timestamp).format('hh:mm:ss a')}</Text>

                        <Spacer />

                        <Text sm mute>Type</Text>
                        <Text>{Consts.tcn.wdc.long_desc}</Text>
                    </View>
                </Screen>

                <Footer>
                    {cancellable &&
                    <>
                        <Button mode='outlined' t='Withdraw using QR Code' onPress={this.handleShowQR} />
                        <Spacer sm />
                        <Button mode='outlined' t='Cancel Transaction' onPress={this.handleCancelTransaction} />

                        <Spacer sm />
                    </>
                    }

                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(WithdrawCash)