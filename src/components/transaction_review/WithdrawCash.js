import React from 'react'
import {Text, Spacer} from '../'

export default props => {
    const {amount} = props.data

    return (
        <>
            <Text mute center>You are about to withdraw</Text>
            
            <Text center xl b>PHP {amount}</Text>

            <Spacer lg />

            <Text mute sm>Full Legal Name</Text>
            <Text md>John Smith</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>PHP {amount}</Text>

            <Spacer />

            <Text mute sm>Charges</Text>
            <Text md>PHP 0.00</Text>

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>PHP 25.00</Text>
        </>
    )
}