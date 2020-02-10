import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors, Metrics} from '../themes'

export default props => (
    <View
        style={{
            borderWidth:StyleSheet.hairlineWidth,
            borderColor:props.c || Colors.lightgray,
            marginVertical:props.m || Metrics.xs
        }}
    />
)