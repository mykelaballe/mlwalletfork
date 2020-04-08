import React from 'react'
import {View, TouchableWithoutFeedback} from 'react-native'
import {Consts} from '../utils'

export default props => {
    if(!Consts.is_android) {
        return (
            <TouchableWithoutFeedback>
                <View>
                    {props.children}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return props.children
}