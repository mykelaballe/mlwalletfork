import React from 'react'
import Ripple from './Ripple'
import Row from './Row'
import Spacer from './Spacer'
import Text from './Text'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default props => (
    <Ripple disabled={props.disabled} onPress={props.onPress}>
        <Row c style={{paddingVertical:Metrics.sm}}>
            <Icon name={props.i} size={Metrics.icon.rg} color={props.ic || Colors.brand} />
            <Spacer h xs />
            <Text b dark color={props.disabled ? Colors.gray : Colors.dark}>{props.t}</Text>
        </Row>
    </Ripple>
)