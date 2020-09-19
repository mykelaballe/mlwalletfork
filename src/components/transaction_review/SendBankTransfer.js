import React from 'react'
import {ScrollFix, Text, Spacer} from '../'
import {Consts, Func} from '../../utils'
import {Metrics} from '../../themes'

export default props => {
    const {bank, account_name, account_no, cAccountFname, cAccountLname, amount, fixed_charge, convenience_fee, total} = props.data

    return (
        <ScrollFix style={{padding:Metrics.lg}}>
            <Text mute center>You are about to send</Text>

            <Text center xl b>{Consts.currency.PH} {Func.formatToRealCurrency(amount)}</Text>

            <Spacer lg />

            {/*<Text mute sm>Customer Name</Text>
            <Text md>{cAccountFname} {cAccountLname}</Text>

            <Spacer />*/}

            <Text mute sm>Partner Bank</Text>
            <Text md>{bank.bankname}</Text>

            <Spacer />

            <Text mute sm>Account Name</Text>
            <Text md>{account_name}</Text>

            <Spacer />

            <Text mute sm>Account No.</Text>
            <Text md>{account_no}</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(amount)}</Text>

            <Spacer />

            <Text mute sm>Fixed Charge</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(fixed_charge)}</Text>

            <Spacer />

            <Text mute sm>Convenience Fee</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(convenience_fee)}</Text>

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(parseFloat(amount) + parseFloat(fixed_charge) + parseFloat(convenience_fee))}</Text>
        </ScrollFix>
    )
}