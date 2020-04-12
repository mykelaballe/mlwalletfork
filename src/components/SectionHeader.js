import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from './'
import {Colors, Metrics} from '../themes'

export default ({text}) => (
    <View style={style.container}>
        <Text mute>{text}</Text>
    </View>
)

const style = StyleSheet.create({
    container: {
        backgroundColor:Colors.lightgray,
        padding:Metrics.rg,
    }
})