import React from 'react'
import {Text, Spacer} from '../'
import {Func} from '../../utils'

export default props => {
    const {user, amount, charges, total} = props.data

    return (
        <>
            <Text mute center>You are about to withdraw</Text>
            
            <Text center xl b>PHP {Func.formatToCurrency(amount)}</Text>

            <Spacer lg />

            <Text mute sm>Full Legal Name</Text>
            <Text md>{user.fname} {user.lname}</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>PHP {Func.formatToCurrency(amount)}</Text>

            <Spacer />

            <Text mute sm>Charges</Text>
            <Text md>PHP {Func.formatToCurrency(charges)}</Text>

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>PHP {Func.formatToCurrency(total)}</Text>
        </>
    )
}