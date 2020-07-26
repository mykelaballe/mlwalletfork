import React from 'react'
import Outline from './Outline'
import Text from './Text'
import TextInput from './TextInput'
import {Colors, Metrics} from '../themes'

const DISABLED_COLOR = '#bbb'

export default React.forwardRef((props, ref) => {
	const InputUI = (
		<Outline>
			<Text size={props.value === '' ? Metrics.font.md : 11} color={props.disabled ? DISABLED_COLOR : Colors.mute}>{props.label}</Text>
			{props.value !== '' && <Text md color={props.disabled ? DISABLED_COLOR : Colors.mute}>{props.value}</Text>}
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
				disabled={props.disabled}
			/>
		)
	}

	return InputUI
})