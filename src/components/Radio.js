import React from 'react'
import {Row, Text, Spacer} from './'
import {Colors} from '../themes'
import {RadioButton} from 'react-native-paper'

export default props => (
    <Row>
        <RadioButton value={props.value} color={Colors.brand} />
        <Text md mute>{props.label}</Text>
    </Row>
)