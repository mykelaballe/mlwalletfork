import React from 'react'
import {View} from 'react-native'
import {Header} from './'
import {Screen, Footer, Text, Spacer, ScrollFix, BackHomeButton} from '../'
import {Colors, Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'
import ViewShot from 'react-native-view-shot'

export default class PayBill extends React.Component {

    state = {
        amount:Func.formatToRealCurrency(this.props.data.amount),
        fixed_charge:Func.formatToRealCurrency(this.props.data.fixed_charge),
        convenience_fee:Func.formatToRealCurrency(this.props.data.convenience_fee),
        total:Func.formatToRealCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.bpm.long_desc
    }

    componentDidMount = async () => {
        const {_from, sender, biller, biller_partner_name, account_no, account_name, balance} = this.props.data
        const {amount, fixed_charge, convenience_fee, total} = this.state

        /*this.props.onExport(
            Func.buildReceiptBody({
                Sender: sender,
                'Customer Name': '',
                Biller:biller ? biller.partner: biller_partner_name,
                'Account No.': account_no,
                'Account Name': account_name,
                Amount: amount,
                'Fixed Charge': Func.formatToCurrency(fixed_charge),
                'Convenience Fee': convenience_fee,
                Total:total
            })
        )*/

        this.props.onExport(this.refs.viewShot)

        if(_from != 'history') {
            Say.ok(
                null,
                'Success',
                {
                    customMessage:(
                        <>
                            <Text mute md>You've processed your billspayment transaction.</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>{Consts.currency.PH} {Func.formatToRealCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    render() {

        const {_from, kptn, sender, biller, bankname, cAccountFname, cAccountLname, account_no, account_name, email, iscancelled} = this.props.data
        const {amount, fixed_charge, convenience_fee, total, date, time, type} = this.state

        const status = iscancelled ? 'cancelled' : 'success'

        return (
            <>
                <Screen compact>
                    <ViewShot ref="viewShot" options={{ format:'jpg', quality: 0.9 }}>
                    <Header
                        tcn={kptn}
                        status={status}
                    />

                    <ScrollFix style={{padding:Metrics.lg,backgroundColor:Colors.light}}>
                        <Text sm mute>Sender</Text>
                        <Text>{sender}</Text>

                        <Spacer />

                        <Text sm mute>Customer Name</Text>
                        <Text>{cAccountFname} {cAccountLname}</Text>

                        <Spacer />

                        <Text sm mute>Biller</Text>
                        <Text>{biller ? biller.bankname : bankname}</Text>

                        <Spacer />

                        <Text sm mute>Account Number</Text>
                        <Text>{account_no}</Text>

                        <Spacer />

                        <Text sm mute>Account Name</Text>
                        <Text>{account_name}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>{Consts.currency.PH} {amount}</Text>

                        <Spacer />

                        <Text sm mute>Fixed Charge</Text>
                        <Text>{Consts.currency.PH} {fixed_charge}</Text>

                        <Spacer />

                        <Text sm mute>Convenience Fee</Text>
                        <Text>{Consts.currency.PH} {convenience_fee}</Text>

                        <Spacer />

                        <Text sm mute>Total</Text>
                        <Text>{Consts.currency.PH} {total}</Text>

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
                    </ViewShot>
                </Screen>

                <Footer>
                    {_from !== 'history' && <BackHomeButton />}
                </Footer>
            </>
        )
    }
}