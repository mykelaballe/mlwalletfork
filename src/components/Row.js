import React from 'react'
import {StyleSheet, View} from 'react-native'

export default props => {
    let customStyle = {}

    if(props.f) customStyle.flex = 1

    if(props.bw) customStyle.justifyContent = 'space-between'
    else if(props.ar) customStyle.justifyContent = 'space-around'
    else if(props.c) customStyle.justifyContent = 'center'

    return (
        <View style={[style.container,customStyle,props.style]}>
            {props.children}
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection:'row',
        alignItems:'center'
    }
})