import React from 'react'
import {ScrollFix, Text, Spacer} from '../'
import {Consts, Func} from '../../utils'
import {Metrics} from '../../themes'

export default props => {
    const {partner, account_no, account_name, amount, email, fixed_charge, convenience_fee, total} = props.data

    return (
        <ScrollFix style={{padding:Metrics.lg}}>
            <Text center lg b>{partner}</Text>

            <Spacer lg />

            <Text mute sm>Account Number</Text>
            <Text md>{account_no}</Text>

            <Spacer />

            <Text mute sm>Account Name</Text>
            <Text md>{account_name}</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(amount)}</Text>

            <Spacer />

            <Text mute sm>Fixed Charge</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(fixed_charge)}</Text>

            {/*Func.formatToCurrency(fixed_charge) > 0 &&
            <>
                <Spacer />

                <Text mute sm>Fixed Charge</Text>
                <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(fixed_charge)}</Text>
            </>
            */}

            <Spacer />

            <Text mute sm>Convenience Fee</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(convenience_fee)}</Text>

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(total)}</Text>
        </ScrollFix>
    )
}