import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Metrics, Colors} from '../themes'

export default props => (
    <View style={style.container} />
)

const style = StyleSheet.create({
    container: {
        marginHorizontal:Metrics.sm,
        backgroundColor:'#ccc',
        padding:2,
        borderRadius:2
    }
})