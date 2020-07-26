import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Outline, Text, Row} from './'
import {Colors, Metrics} from '../themes'

const DISABLED_COLOR = '#bbb'

export default props => {
	const InputUI = (
		<Outline style={{...props.style}} {...props}>
			<Row bw>
				<View>
					<Text size={(!props.value || props.value === '') ? Metrics.font.md : 11} color={props.disabled ? DISABLED_COLOR : Colors.mute}>{props.label}</Text>
					{(props.value !== '' && props.value) && <Text md color={props.disabled ? DISABLED_COLOR : Colors.mute}>{props.value}</Text>}
				</View>

				{props.rightContent}
			</Row>
			{props.bottomContent}
		</Outline>
	)

	if(props.onPress && !props.disabled) {

		if(props.editable === false) return InputUI

		return (
			<TouchableOpacity onPress={props.onPress} style={{...props.style}}>
				{InputUI}
			</TouchableOpacity>
		)
	}

	return InputUI
}