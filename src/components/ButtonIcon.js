import React from 'react'
import {Button} from 'react-native-paper'
import {Colors, Metrics} from '../themes'
//import Icon from 'react-native-vector-icons/Ionicons'

export default props => {
    return (
        <Button
            onPress={props.onPress}
            style={{...props.style}}
            theme={{
                colors:{
                    primary:Colors.mute
                }
            }}
        >
            {props.icon}
        </Button>
    )
}