import React from 'react'
import {View as Vw} from 'react-native'

export default props => (
    <Vw {...props}>
        {props.children}
    </Vw>
)