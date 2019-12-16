import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Colors, Metrics} from '../themes'
import {Ripple} from './'

export default props => {
    if(props.onPress) {
        return (
                <Ripple onPress={props.onPress} style={[style.container,props.style]}>
                    <>
                        {props.children}
                    </>
                </Ripple>
        )
    }

    return (
        <View style={[style.container,props.style]}>
            {props.children}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor:Colors.light,
        borderRadius:Metrics.sm,
        padding:Metrics.rg,
        marginVertical:Metrics.xs,
        elevation:Metrics.elevation
    }
})