import React from 'react'
import {Text, Spacer} from '../'
import {Func} from '../../utils'

export default props => {
    const {contact_no, amount, promo_code} = props.data

    return (
        <>
            <Text mute center>You are about to load</Text>
            
            <Text center xl b>PHP {Func.formatToCurrency(amount)}</Text>

            <Spacer lg />

            <Text mute sm>Mobile Number</Text>
            <Text md>{contact_no}</Text>

            {promo_code != '' &&
            <>
                <Spacer />
                
                <Text mute sm>Promo</Text>
                <Text md>{promo_code}</Text>
            </>
            }

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>PHP {Func.formatToCurrency(amount)}</Text>
        </>
    )
}