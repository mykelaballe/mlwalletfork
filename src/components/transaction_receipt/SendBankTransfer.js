import React from 'react'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, ScrollFix, BackHomeButton} from '../'
import {Colors, Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

export default class SendBankTransfer extends React.Component {

    state = {
        amount:Func.formatToCurrency(this.props.data.amount),
        fixed_charge:Func.formatToCurrency(this.props.data.fixed_charge),
        convenience_fee:Func.formatToCurrency(this.props.data.bank.convenienceFee),
        total:Func.formatToCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.stb.long_desc,
        receipt:null
    }

    componentDidMount = () => {
        const {_from, kptn, bank, account_name, account_no, cAccountFname, cAccountLname, balance} = this.props.data
        const {amount, fixed_charge, convenience_fee, total, date, time, type} = this.state

        const receipt = (
            <>
                <Header tcn={kptn} status='success' />
                    
                <ScrollFix style={{padding:Metrics.lg,backgroundColor:Colors.light}}>
                    {/*<Text sm mute>Customer Name</Text>
                    <Text>{cAccountFname} {cAccountLname}</Text>

                    <Spacer />*/}
                    
                    <Text sm mute>Partner's Name</Text>
                    <Text>{bank.bankname}</Text>

                    <Spacer />

                    <Text sm mute>Account Name</Text>
                    <Text>{account_name}</Text>

                    <Spacer />

                    <Text sm mute>Account No.</Text>
                    <Text>{account_no}</Text>

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
                    <Text>{Consts.currency.PH} {Func.formatToRealCurrency(parseFloat(amount) + parseFloat(fixed_charge) + parseFloat(convenience_fee))}</Text>

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
            </>
        )

        this.props.onExport(receipt)

        this.setState({receipt})

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
                            <Text xl b>{Consts.currency.PH} {Func.formatToRealCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    render() {

        const {_from} = this.props.data
        const {receipt} = this.state

        return (
            <>
                <Screen compact>
                    {receipt}
                </Screen>

                <Footer>
                    {_from !== 'history' && <BackHomeButton />}
                </Footer>
            </>
        )
    }
}