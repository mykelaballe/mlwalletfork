import React from 'react'
import {StyleSheet, KeyboardAvoidingView} from 'react-native'
import {ScrollView} from './'
import {Metrics} from '../themes'

export default props => (
    <KeyboardAvoidingView style={style.container}>
        {props.ns ? props.children : <ScrollView keyboardShouldPersistTaps='handled'>{props.children}</ScrollView>}
    </KeyboardAvoidingView>
)

const style = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:Metrics.lg,
        paddingHorizontal:Metrics.lg
    }
})