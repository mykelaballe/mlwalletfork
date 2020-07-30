import React from 'react'
import {ScrollFix, Text, Spacer} from '../'
import {Consts, Func} from '../../utils'
import {Metrics} from '../../themes'

export default props => {
    const {contact_no, amount, promo} = props.data

    return (
        <ScrollFix style={{padding:Metrics.lg}}>
            <Text mute center>You are about to load</Text>
            
            <Text center xl b>{Consts.currency.PH} {Func.formatToRealCurrency(amount)}</Text>

            <Spacer lg />

            <Text mute sm>Mobile Number</Text>
            <Text md>{Func.formatToPHMobileNumberFull(contact_no)}</Text>

            {promo &&
            <>
                <Spacer />
                
                <Text mute sm>Promo</Text>
                <Text md>{promo.promoCode}</Text>
            </>
            }

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(amount)}</Text>
        </ScrollFix>
    )
}