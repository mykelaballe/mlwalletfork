import React from 'react'
import {Image} from 'react-native'
import {Metrics, Res} from '../themes'

export default props => {
	let wh = Metrics.image.rg,
		width = props.size ? props.size : wh,
		height = props.size ? props.size : wh,
		borderRadius = 0,
		source = Res.logo_mini
	
	if(props.source) source = {uri:props.source}

	borderRadius = (height > width) ? height / 2 : width / 2
	
	return (
		<Image
			style={
				[
					{width, height, borderRadius},
					props.style
				]
			}
			source={source}
			/>
	)
}