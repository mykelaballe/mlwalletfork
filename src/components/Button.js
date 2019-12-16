import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button as Btn} from 'react-native-paper'
import {Colors, Metrics} from '../themes'

export default props => {

    let customStyle = {
        backgroundColor:Colors.brand
    }

    //color theme
    if(props.success) customStyle.backgroundColor = Colors.success
    else if(props.info) customStyle.backgroundColor = Colors.info
    else if(props.warning) customStyle.backgroundColor = Colors.warning
    else if(props.danger) customStyle.backgroundColor = Colors.danger
    else if(props.dark) customStyle.backgroundColor = Colors.dark
    
    return (
        <Btn
            {...props}
            mode='contained'
            color={customStyle.backgroundColor}
            onPress={props.onPress}
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