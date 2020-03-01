import React from 'react'
import {Text, Spacer} from '../'

export default props => {
    const {amount} = props.data

    return (
        <>
            <Text center lg b>BDO</Text>

            <Spacer lg />

            <Text mute sm>Account Number</Text>
            <Text md>123456789</Text>

            <Spacer />

            <Text mute sm>Account Name</Text>
            <Text md>John Smith</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>PHP {amount}</Text>

            <Spacer />

            <Text mute sm>Fixed Charges</Text>
            <Text md>PHP 15.00</Text>

            <Spacer />

            <Text mute sm>Convenience Fee</Text>
            <Text md>PHP 7.00</Text>

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>PHP 25.00</Text>
        </>
    )
}