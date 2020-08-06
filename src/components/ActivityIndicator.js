import React from 'react'
import {ActivityIndicator as AC} from 'react-native'
import {Colors} from '../themes'

export default props => (
    <AC color={props.color || Colors.brand} />
)