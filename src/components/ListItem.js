import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Ripple} from './'
import {Colors, Metrics} from '../themes'

export default props => {
    if(props.onPress) {
        return (
            <Ripple onPress={props.onPress} style={style.container}>
                {props.children}
            </Ripple>
        )
    }

    return (
        <View style={style.container}>
            {props.children}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        padding:Metrics.md,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.gray
    }
})