import React from 'react'
import {TouchableRipple as Rpl} from 'react-native-paper'

export default props => (
    <Rpl {...props}>
        <>
            {props.children}
        </>
    </Rpl>
)