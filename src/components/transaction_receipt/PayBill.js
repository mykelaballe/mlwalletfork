import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, ScrollFix} from '../'
import {Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

class PayBill extends React.Component {

    state = {
        amount:Func.formatToRealCurrency(this.props.data.amount),
        fixed_charge:Func.formatToRealCurrency(this.props.data.fixed_charge),
        convenience_fee:Func.formatToRealCurrency(this.props.data.convenience_fee),
        total:Func.formatToRealCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.bpm.long_desc
    }

    componentDidMount = () => {
        const {_from, biller, biller_partner_name, account_no, account_name, balance} = this.props.data
        const {amount, fixed_charge, convenience_fee, total} = this.state

        this.props.onExport(
            Func.buildReceiptBody({
                Biller:biller ? biller.partner: biller_partner_name,
                'Account No.': account_no,
                'Account Name': account_name,
                Amount: amount,
                'Fixed Charge': Func.formatToCurrency(fixed_charge) > 0 ? fixed_charge : false,
                'Convenience Fee': convenience_fee,
                Total:total
            })
        )

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

        const {_from, kptn, biller, biller_partner_name, account_no, account_name, email} = this.props.data
        const {amount, fixed_charge, convenience_fee, total, date, time, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={kptn}
                        status='success'
                    />

                    <ScrollFix style={{padding:Metrics.lg}}>
                        <Text sm mute>Biller</Text>
                        <Text>{biller ? biller.partner : biller_partner_name}</Text>

                        <Spacer />

                        <Text sm mute>Account No.</Text>
                        <Text>{account_no}</Text>

                        <Spacer />

                        <Text sm mute>Account Name</Text>
                        <Text>{account_name}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

                        {Func.formatToCurrency(fixed_charge) > 0 &&
                        <>
                            <Spacer />

                            <Text sm mute>Fixed Charge</Text>
                            <Text>PHP {fixed_charge}</Text>
                        </>
                        }

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
                    </ScrollFix>
                </Screen>

                <Footer>
                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(PayBill)