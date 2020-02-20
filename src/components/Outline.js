import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors, Metrics} from '../themes'

export default props => (
    <View style={[style.container,{...props.style}]}>
        {props.children}
    </View>
)

const style = StyleSheet.create({
    container: {
        //minHeight:60,
        justifyContent:'center',
        paddingHorizontal:Metrics.rg,
        paddingVertical:Metrics.lg,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.lightgray,
        borderRadius:Metrics.sm,
        marginVertical:Metrics.sm
    }
})