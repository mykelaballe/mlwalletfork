import React from 'react'
import {View} from 'react-native'
import {Text, Spacer, Row} from '../'
import {Func, _} from '../../utils'

export default props => {
    const {receiver, amount, charges, total} = props.data

    return (
        <>
            <Text mute center>You are about to send</Text>

            <Text center xl b>PHP {Func.formatToCurrency(amount)}</Text>

            <Spacer lg />

            <Row>
                <View style={{flex:1}}>
                    <Text mute sm>First Name</Text>
                    <Text md>{receiver.firstname}</Text>
                </View>

                <Spacer h xl />

                <View style={{flex:1}}>
                    <Text mute sm>Middle Name</Text>
                    <Text md>{receiver.middlename || _('50')}</Text>
                </View>
            </Row>

            <Spacer />

            <Row>
                <View style={{flex:1}}>
                    <Text mute sm>Last Name</Text>
                    <Text md>{receiver.lastname}</Text>
                </View>

                <Spacer h xl />

                <View style={{flex:1}}>
                    <Text mute sm>Suffix</Text>
                    <Text md>{receiver.suffix || _('51')}</Text>
                </View>
            </Row>

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