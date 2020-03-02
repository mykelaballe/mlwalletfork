import React from 'react'
import {Text, Spacer} from '../'

export default props => {
    const {amount} = props.data

    return (
        <>
            <Text mute center>You are about to load</Text>
            
            <Text center xl b>PHP {amount}</Text>

            <Spacer lg />

            <Text mute sm>Mobile Number</Text>
            <Text md>09123456789</Text>

            <Spacer />

            <Text mute sm>Promo</Text>
            <Text md>Regular</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>PHP 20.00</Text>
        </>
    )
}