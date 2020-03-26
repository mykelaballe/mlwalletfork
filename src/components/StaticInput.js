import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Outline, Text} from './'
import {Metrics} from '../themes'

export default props => {
	const InputUI = (
		<Outline style={{...props.style}} {...props}>
			<Text size={(!props.value || props.value === '') ? Metrics.font.md : 11} mute>{props.label}</Text>
			{(props.value !== '' && props.value) && <Text md mute>{props.value}</Text>}
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