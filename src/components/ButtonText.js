import React from 'react'
import {Button} from 'react-native-paper'
import {Colors, Metrics} from '../themes'

export default props => (
    <Button
        compact
        color={props.color || Colors.dark}
        uppercase={false}
        onPress={props.onPress}
        {...props}
    >
        {props.t}
    </Button>
)