import React from 'react'
import Outline from './Outline'
import Text from './Text'
import TextInput from './TextInput'
import {Metrics} from '../themes'

export default React.forwardRef((props, ref) => {
	const InputUI = (
		<Outline>
			<Text size={props.value === '' ? Metrics.font.md : 11} mute>{props.label}</Text>
			{props.value !== '' && <Text md mute>{props.value}</Text>}
		</Outline>
	)

	if(props.editable === true) {
		return (
			<TextInput
				{...props}
				ref={ref}
				label={props.label}
				value={props.value}
				onChangeText={props.onChangeText}
			/>
		)
	}

	return InputUI
})