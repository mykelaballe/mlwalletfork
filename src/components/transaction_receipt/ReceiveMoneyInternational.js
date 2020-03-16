import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, View, Text, Spacer, Button} from '../'
import {Metrics} from '../../themes'
import {Consts, Func, Say} from '../../utils'

const moment = require('moment')

class ReceiveMoneyInternational extends React.Component {

    componentDidMount = () => {
        const {sender, currency, amount} = this.props.data

        Say.ok(
            null,
            'Success',
            {
                customMessage:(
                    <>
                        <Text mute md>You have successfully received {currency} {Func.formatToCurrency(amount)} from {sender}.</Text>
                        <Spacer lg />
                        <Text mute>Your new balance is</Text>
                        <Text xl b>Php 1000</Text>
                    </>
                )
            }
        )
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, tcn, timestamp, transaction_no, currency, amount, partner, sender, } = this.props.data

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={tcn}
                        status='success'
                    />

                    <View style={{padding:Metrics.lg}}>
                        <Text sm mute>Sender</Text>
                        <Text>{sender}</Text>

                        <Spacer />

                        <Text sm mute>Partner</Text>
                        <Text>{partner.name}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>{currency} {Func.formatToCurrency(amount)}</Text>

                        <Spacer />

                        <Text sm mute>Date</Text>
                        <Text>{moment(timestamp).format('MMMM DD, YYYY')}</Text>

                        <Spacer />

                        <Text sm mute>Time</Text>
                        <Text>{moment(timestamp).format('hh:mm:ss a')}</Text>

                        <Spacer />

                        <Text sm mute>Type</Text>
                        <Text>{Consts.tcn.rmi.long_desc}</Text>
                    </View>
                </Screen>

                <Footer>
                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(ReceiveMoneyInternational)