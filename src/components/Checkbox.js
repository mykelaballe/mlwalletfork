import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Text, Row} from './'
import {Colors} from '../themes'
import {Checkbox} from 'react-native-paper'

export default props => {

    const checkboxUI = (
        <Checkbox.Android
            color={Colors.brand}
            uncheckedColor={Colors.brand}
            status={props.status ? 'checked' : 'unchecked'}
            onPress={props.onPress}
            disabled={props.disabled}
        />
    )
    
    if(props.label) {
        return (
            <TouchableOpacity onPress={props.disabled ? null : props.onPress}>
                <Row>
                    {checkboxUI}
    
                    <Text md mute style={props.labelStyle}>{props.label}</Text>
                </Row>
            </TouchableOpacity>
        )
    }

    return checkboxUI
}