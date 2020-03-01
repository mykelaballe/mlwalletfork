import React from 'react'
import {Text, Spacer} from '../'

export default props => {
    const {wallet_account_number, receiver, amount, notes} = props.data

    return (
        <>
            <Text mute center>You are about to send</Text>

            <Text center xl b>PHP {amount}</Text>

            <Spacer lg />

            <Text mute sm>Wallet Account Number</Text>
            <Text md>{wallet_account_number}</Text>

            <Spacer />

            <Text mute sm>Receiver</Text>
            <Text md>{receiver}</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>PHP {amount}</Text>

            <Spacer />

            <Text mute sm>Notes</Text>
            <Text md>{notes}</Text>

            <Spacer />

            <Text mute sm>Charges</Text>
            <Text md>PHP 25.00</Text>

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>PHP 25.00</Text>
        </>
    )
}