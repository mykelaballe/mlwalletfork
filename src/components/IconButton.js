import React from 'react'
import {IconButton} from 'react-native-paper'
import {Colors} from '../themes'

export default props => {
    return (
        <IconButton
            icon={props.icon}
            color={props.color || Colors.brand}
            onPress={props.onPress}
            style={{...props.style}}
            {...props}
        />
    )
}