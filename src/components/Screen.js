import React from 'react'
import {KeyboardAvoidingView} from 'react-native'
import {ScrollView} from './'
import {Metrics} from '../themes'

export default props => {
    let style = {
        flex:1,
        paddingTop:props.compact ? 0 : Metrics.lg,
        paddingHorizontal:props.compact ? 0 : Metrics.lg
    }

    if(props.ns) {
        return (
            <KeyboardAvoidingView style={style}>
                {props.children}
            </KeyboardAvoidingView>
        )
    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView style={style}>
                {props.children}
            </KeyboardAvoidingView>
        </ScrollView>
    )

    return (
        <KeyboardAvoidingView style={style}>
            {props.ns ? props.children : <ScrollView keyboardShouldPersistTaps='handled'>{props.children}</ScrollView>}
        </KeyboardAvoidingView>
    )
}