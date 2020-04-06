import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, View, Text, Spacer, Prompt, Button} from '../'
import {Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

const moment = require('moment')

class PayBill extends React.Component {

    state = {
        amount:Func.formatToCurrency(this.props.data.amount),
        charges:Func.formatToCurrency(this.props.data.fixed_charge),
        convenience_fee:Func.formatToCurrency(this.props.data.convenience_fee),
        total:Func.formatToCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.bpm.long_desc
    }

    componentDidMount = () => {
        const {_from, biller_partner_name, account_no, account_name, balance} = this.props.data
        const {amount, fixed_charge, convenience_fee, total} = this.state

        this.props.onExport(`
            <h4 style="color:#6A6A6A;line-height:0">Biller</h4>
            <h3>${biller_partner_name}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Account No.</h4>
            <h3 style="margin-top:0">PHP ${account_no}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Account Name</h4>
            <h3 style="margin-top:0">PHP ${account_name}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Amount</h4>
            <h3 style="margin-top:0">PHP ${amount}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Fixed Charge</h4>
            <h3 style="margin-top:0">PHP ${fixed_charge}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Convenience Fee</h4>
            <h3 style="margin-top:0">PHP ${convenience_fee}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Total</h4>
            <h3 style="margin-top:0">PHP ${total}</h3>
        `)

        if(_from != 'history') {
            Say.ok(
                null,
                'Success',
                {
                    customMessage:(
                        <>
                            <Text mute md>You successfully transferred money to bank. Expect 2-3 banking days for your new balance to reflect.</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>Php {Func.formatToRealCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, tcn, biller_partner_name, account_no, account_name, email} = this.props.data
        const {amount, fixed_charge, convenience_fee, total, date, time} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={tcn}
                        status='success'
                    />

                    <View style={{padding:Metrics.lg}}>
                        <Text sm mute>Biller</Text>
                        <Text>{biller_partner_name}</Text>

                        <Spacer />

                        <Text sm mute>Account No.</Text>
                        <Text>{account_no}</Text>

                        <Spacer />

                        <Text sm mute>Account Name</Text>
                        <Text>{account_name}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

                        <Spacer />

                        <Text sm mute>Fixed Charge</Text>
                        <Text>PHP {fixed_charge}</Text>

                        <Spacer />

                        <Text sm mute>Convenience Fee</Text>
                        <Text>PHP {convenience_fee}</Text>

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

export default withNavigation(PayBill)