import React from 'react'
import {Switch} from 'react-native'
import {Row, ActivityIndicator} from './'
import {Colors} from '../themes'

export default props => (
    <Row>
        <Switch
            disabled={(props.loading || props.disabled) ? true : false}
            value={props.value}
            onValueChange={props.onValueChange}
            thumbColor={props.value ? Colors.brand : Colors.gray}
            trackColor={{
                false:Colors.gray,
                true:Colors.brandlight
            }}
        />
        {props.loading && <ActivityIndicator />}
    </Row>
)