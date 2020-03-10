import React from 'react'
import {KeyboardAvoidingView, View} from 'react-native'
import {ScrollView} from './'
import {Metrics} from '../themes'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default props => {
    let style = {
        flex:1,
        paddingTop:props.compact ? 0 : Metrics.lg,
        paddingHorizontal:props.compact ? 0 : Metrics.lg
    }

    if(props.ns) {
        return (
            <View style={style}>
                {props.children}
            </View>
        )
    }

    return (
        <KeyboardAwareScrollView style={style} showsVerticalScrollIndicator={false}>
                {props.children}
        </KeyboardAwareScrollView>
    )

    return (
        <ScrollView keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView style={style} behavior='padding'>
                {props.children}
                <View style={{height:10}} />
            </KeyboardAvoidingView>
        </ScrollView>
    )

    return (
        <KeyboardAvoidingView style={style}>
            {props.ns ? props.children : <ScrollView keyboardShouldPersistTaps='handled'>{props.children}</ScrollView>}
        </KeyboardAvoidingView>
    )
}