import React from 'react'
import {Text, Spacer} from '../'

export default props => {
    const {receiver, account_name, account_number, amount} = props.data

    return (
        <>
            <Text mute center>You are about to send</Text>

            <Text center xl b>PHP {amount}</Text>

            <Spacer lg />

            <Text mute sm>Partner Bank</Text>
            <Text md>{receiver}</Text>

            <Spacer />

            <Text mute sm>Account Name</Text>
            <Text md>{account_name}</Text>

            <Spacer />

            <Text mute sm>Account No.</Text>
            <Text md>{account_number}</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>PHP {amount}</Text>

            <Spacer />

            <Text mute sm>Fixed Charge</Text>
            <Text md>PHP 100.00</Text>

            <Spacer />

            <Text mute sm>Convenience Fee</Text>
            <Text md>PHP 15.00</Text>

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>PHP 215.00</Text>
        </>
    )
}