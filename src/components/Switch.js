import React from 'react'
import {Switch} from 'react-native'
import {Colors} from '../themes'

export default props => (
    <Switch
        value={props.value}
        onValueChange={props.onValueChange}
        thumbColor={props.value ? Colors.brand : Colors.gray}
        trackColor={{
            false:Colors.gray,
            true:Colors.brandlight
        }}
    />
)