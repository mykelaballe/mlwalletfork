import React from 'react'
import {View} from 'react-native'
import {Metrics} from '../themes'

export default props => <View style={{marginVertical:props.sm ? Metrics.md : Metrics.xl}} />