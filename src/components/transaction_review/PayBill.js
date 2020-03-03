import React from 'react'
import {Text, Spacer} from '../'
import {Func} from '../../utils'

export default props => {
    const {biller, account_no, account_name, amount, email, fixed_charge, convenience_fee, total} = props.data

    return (
        <>
            <Text center lg b>{biller.name}</Text>

            <Spacer lg />

            <Text mute sm>Account Number</Text>
            <Text md>{account_no}</Text>

            <Spacer />

            <Text mute sm>Account Name</Text>
            <Text md>{account_name}</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>PHP {Func.formatToCurrency(amount)}</Text>

            <Spacer />

            <Text mute sm>Fixed Charge</Text>
            <Text md>PHP {Func.formatToCurrency(fixed_charge)}</Text>

            <Spacer />

            <Text mute sm>Convenience Fee</Text>
            <Text md>PHP {Func.formatToCurrency(convenience_fee)}</Text>

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>PHP {Func.formatToCurrency(total)}</Text>
        </>
    )
}