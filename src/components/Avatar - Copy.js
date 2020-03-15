import React from 'react'
import {StyleSheet} from 'react-native'
import {Ripple, Row, Text} from './'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Ionicons'

export default props => (
	<Ripple onPress={props.onPress} style={style.item}>
		<Row bw>
			<Text md mute>{props.t}</Text>
			<Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
		</Row>
	</Ripple>
)

const style = StyleSheet.create({
    item: {
        paddingVertical:Metrics.lg,
        paddingHorizontal:Metrics.md,
        marginVertical:Metrics.rg,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.mute,
        borderRadius:Metrics.sm
    }
})