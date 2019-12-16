import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors, Metrics} from '../themes'
import {Text} from './'

export default props => (
    <View style={style.pill}>
        <Text light sm center>{props.text}</Text>
    </View>
)

const style = StyleSheet.create({
    pill: {
        backgroundColor:Colors.warning,
        borderRadius:Metrics.rg,
        paddingVertical:1
    }
})