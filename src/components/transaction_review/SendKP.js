import React from 'react'
import {View} from 'react-native'
import {Text, Spacer, Row} from '../'

export default props => {
    const {wallet_account_number, receiver, amount, notes} = props.data

    return (
        <>
            <Text mute center>You are about to send</Text>

            <Text center xl b>PHP {amount}</Text>

            <Spacer lg />

            <Row>
                <View style={{flex:1}}>
                    <Text mute sm>First Name</Text>
                    <Text md>John</Text>
                </View>

                <Spacer h xl />

                <View style={{flex:1}}>
                    <Text mute sm>Middle Name</Text>
                    <Text md>WAIVED</Text>
                </View>
            </Row>

            <Spacer />

            <Row>
                <View style={{flex:1}}>
                    <Text mute sm>Last Name</Text>
                    <Text md>Smith</Text>
                </View>

                <Spacer h xl />

                <View style={{flex:1}}>
                    <Text mute sm>Suffix</Text>
                    <Text md>NONE</Text>
                </View>
            </Row>

            <Spacer />

            <Text mute sm>Amount</Text>
            <Text md>PHP {amount}</Text>

            <Spacer />

            <Text mute sm>Charges</Text>
            <Text md>PHP 25.00</Text>

            <Spacer />

            <Text mute sm>Total</Text>
            <Text md>PHP 25.00</Text>
        </>
    )
}