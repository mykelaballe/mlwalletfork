import React from 'react'
import {ScrollFix, Text, Spacer} from '../'
import {Consts, Func} from '../../utils'
import {Metrics} from '../../themes'

export default props => {
    const {user, amount, charges, total} = props.data

    return (
        <ScrollFix style={{padding:Metrics.lg}}>
            <Text mute center>You are about to withdraw</Text>
            
            <Text center xl b>{Consts.currency.PH} {Func.formatToRealCurrency(amount)}</Text>

            <Spacer lg />

            <Text mute sm>Full Legal Name</Text>
            <Text md>{user.fname} {user.lname}</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(amount)}</Text>

            <Spacer />

            <Text mute sm>Charges</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(charges)}</Text>

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(total)}</Text>
        </ScrollFix>
    )
}