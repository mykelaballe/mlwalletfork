import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors, Metrics} from '../themes'

export default props => {
    let style = {
        //minHeight:60,
        justifyContent:'center',
        paddingHorizontal:Metrics.rg,
        paddingVertical:Metrics.lg,
        borderWidth:props.error ? 2 : StyleSheet.hairlineWidth,
        borderColor:props.error ? Colors.brand : Colors.lightgray,
        borderRadius:Metrics.sm,
        marginVertical:Metrics.sm
    }

    return (
        <View style={[style,{...props.style}]}>
            {props.children}
        </View>
    )
}