import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Metrics, Colors} from '../themes'

const SIZE = 2

export default props => (
    <View
        style={{
            ...style.container,
            padding:props.size || SIZE,
            borderRadius:props.size || SIZE
        }}
    />
)

const style = StyleSheet.create({
    container: {
        marginHorizontal:Metrics.sm,
        backgroundColor:'#ccc',
    }
})