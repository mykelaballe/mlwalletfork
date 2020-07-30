import React from 'react'
import {View} from 'react-native'
import {ScrollFix, Text, Spacer, Row} from '../'
import {Consts, Func, _} from '../../utils'
import {Metrics} from '../../themes'

export default props => {
    const {receiver, amount, charges, total} = props.data

    return (
        <ScrollFix style={{padding:Metrics.lg}}>
            <Text mute center>You are about to send</Text>

            <Text center xl b>{Consts.currency.PH} {Func.formatToRealCurrency(amount)}</Text>

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