import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button as Btn} from 'react-native-paper'
import {Colors, Metrics} from '../themes'

export default props => {

    let customStyle = {
        backgroundColor:Colors.brand
    }

    let btnStyle = {
        padding:Metrics.rg
    }

    //color theme
    if(props.success) customStyle.backgroundColor = Colors.success
    else if(props.info) customStyle.backgroundColor = Colors.info
    else if(props.warning) customStyle.backgroundColor = Colors.warning
    else if(props.danger) customStyle.backgroundColor = Colors.danger
    else if(props.dark) customStyle.backgroundColor = Colors.dark
    else if(props.light) customStyle.backgroundColor = Colors.light
    
    return (
        <Btn
            {...props}
            style={{
                ...props.style,
                borderWidth:props.disabled ? 0 : 1,
                borderColor:customStyle.backgroundColor
            }}
            contentStyle={{
                ...btnStyle
            }}
            mode={props.mode || 'contained'}
            color={customStyle.backgroundColor}
            onPress={props.onPress}
            uppercase={false}
        >
            {props.t}
        </Btn>
    )
}

const style = StyleSheet.create({
    container: {
        paddingVertical:Metrics.rg,
        paddingHorizontal:Metrics.sm,
        borderRadius:Metrics.sm
    }
})