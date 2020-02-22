import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Text, Row, Spacer} from './'
import {Colors} from '../themes'
import {Checkbox} from 'react-native-paper'

export default props => {

    const checkboxUI = (
        <Checkbox.Android
            color={Colors.brand}
            uncheckedColor={Colors.brand}
            status={props.status ? 'checked' : 'unchecked'}
            onPress={props.onPress}
        />
    )
    
    if(props.label) {
        return (
            <TouchableOpacity onPress={props.onPress}>
                <Row>
                    {checkboxUI}
    
                    <Spacer h xs />
    
                    <Text md mute>{props.label}</Text>
                </Row>
            </TouchableOpacity>
        )
    }

    return checkboxUI
}