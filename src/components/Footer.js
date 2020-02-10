import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Metrics} from '../themes'

export default props => (
    <View style={style.container}>
        {props.children}
    </View>
)

const style = StyleSheet.create({
    container: {
        paddingTop:Metrics.xs,
        paddingHorizontal:Metrics.lg,
        paddingBottom:Metrics.lg
    }
})