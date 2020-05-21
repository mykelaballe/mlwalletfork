import React from 'react'
import {View} from 'react-native'
import {ScrollFix, Spacer} from './'
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

    if(props.fix) {
        <KeyboardAwareScrollView style={style} showsVerticalScrollIndicator={false}>
                <ScrollFix>
                    {props.children}
                </ScrollFix>
        </KeyboardAwareScrollView>
    }

    return (
        <KeyboardAwareScrollView style={style} showsVerticalScrollIndicator={false}>
                {props.children}
                <Spacer />
        </KeyboardAwareScrollView>
    )
}