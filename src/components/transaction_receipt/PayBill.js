import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, View, Text, Spacer, Prompt, Button} from '../'
import {Metrics} from '../../themes'
import {Consts, Func, Say} from '../../utils'

const moment = require('moment')

class PayBill extends React.Component {

    componentDidMount = () => {
        Say.ok(
            null,
            'Success',
            {
                customMessage:(
                    <>
                        <Text mute md>You successfully transferred money to bank. Expect 2-3 banking days for your new balance to reflect.</Text>
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

        const {_from, tcn, timestamp, biller, account_no, account_name, amount, email, fixed_charge, convenience_fee, total} = this.props.data

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={tcn}
                        status='success'
                    />

                    <View style={{padding:Metrics.lg}}>
                        <Text sm mute>Biller</Text>
                        <Text>{biller.name}</Text>

                        <Spacer />

                        <Text sm mute>Account No.</Text>
                        <Text>{account_no}</Text>

                        <Spacer />

                        <Text sm mute>Account Name</Text>
                        <Text>{account_name}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {Func.formatToCurrency(amount)}</Text>

                        <Spacer />

                        <Text sm mute>Fixed Charge</Text>
                        <Text>PHP {Func.formatToCurrency(fixed_charge)}</Text>

                        <Spacer />

                        <Text sm mute>Convenience Fee</Text>
                        <Text>PHP {Func.formatToCurrency(convenience_fee)}</Text>

                        <Spacer />

                        <Text sm mute>Total Amount</Text>
                        <Text>PHP {Func.formatToCurrency(total)}</Text>

                        <Spacer />

                        <Text sm mute>Date</Text>
                        <Text>{moment(timestamp).format('MMMM DD, YYYY')}</Text>

                        <Spacer />

                        <Text sm mute>Time</Text>
                        <Text>{moment(timestamp).format('hh:mm:ss a')}</Text>

                        <Spacer />

                        <Text sm mute>Type</Text>
                        <Text>{Consts.tcn.bpm.long_desc}</Text>
                    </View>
                </Screen>

                <Footer>
                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(PayBill)