import React from 'react'
import {Text, Spacer} from '../'
import {Func} from '../../utils'

export default props => {
    const {bank, account_name, account_number, amount, fixed_charge, convenience_fee, total} = props.data

    return (
        <>
            <Text mute center>You are about to send</Text>

            <Text center xl b>PHP {Func.formatToCurrency(amount)}</Text>

            <Spacer lg />

            <Text mute sm>Partner Bank</Text>
            <Text md>{bank}</Text>

            <Spacer />

            <Text mute sm>Account Name</Text>
            <Text md>{account_name}</Text>

            <Spacer />

            <Text mute sm>Account No.</Text>
            <Text md>{account_number}</Text>

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