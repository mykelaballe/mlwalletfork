import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Outline, Text, Row} from './'
import {Metrics} from '../themes'

export default props => {
	const InputUI = (
		<Outline style={{...props.style}} {...props}>
			<Row bw>
				<View>
					<Text size={(!props.value || props.value === '') ? Metrics.font.md : 11} mute>{props.label}</Text>
					{(props.value !== '' && props.value) && <Text md mute>{props.value}</Text>}
				</View>

				{props.rightContent}
			</Row>
		</Outline>
	)

	if(props.onPress) {

		if(props.editable === false) return InputUI

		return (
			<TouchableOpacity onPress={props.onPress} style={{...props.style}}>
				{InputUI}
			</TouchableOpacity>
		)
	}

	return InputUI
}