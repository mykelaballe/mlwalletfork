import React from 'react'
import {ScrollFix, Text, Spacer} from '../'
import {_, Func} from '../../utils'
import {Metrics} from '../../themes'

export default props => {
    const {walletno, receiver, amount, notes, points, charges, total} = props.data

    return (
        <ScrollFix style={{padding:Metrics.lg}}>
            <Text mute center>You are about to send</Text>

            <Text center xl b>PHP {Func.formatToCurrency(amount)}</Text>

            <Spacer lg />

            <Text mute sm>{_('90')}</Text>
            <Text md>{Func.formatWalletNo(walletno)}</Text>

            <Spacer />

            <Text mute sm>Receiver</Text>
            <Text md>{receiver.fullname}</Text>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>PHP {Func.formatToCurrency(amount)}</Text>

            <Spacer />

            <Text mute sm>Notes</Text>
            <Text md>{notes}</Text>

            <Spacer />

            <Text mute sm>Charges</Text>
            <Text md>PHP {Func.formatToCurrency(charges)}</Text>

            {/*<Spacer />

            <Text mute sm>Applied Points</Text>
            <Text md>- {points}</Text>*/}

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>PHP {Func.formatToCurrency(total)}</Text>
        </ScrollFix>
    )
}