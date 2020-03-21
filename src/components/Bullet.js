import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Metrics} from '../themes'

const SIZE = 2

export default props => (
    <View
        style={{
            ...style.container,
            backgroundColor:props.color || '#ccc',
            padding:props.size || SIZE,
            borderRadius:props.size || SIZE
        }}
    />
)

const style = StyleSheet.create({
    container: {
        marginHorizontal:Metrics.sm
    }
})