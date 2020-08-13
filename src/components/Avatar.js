import React from 'react'
//import {Image} from 'react-native'
import ActivityIndicator from './ActivityIndicator'
import Text from './Text'
import {Metrics, Res} from '../themes'
import Image from 'react-native-image-progress'

export default props => {
	let wh = Metrics.image.rg,
		width = props.size ? props.size : wh,
		height = props.size ? props.size : wh,
		borderRadius = 0,
		source = Res.default_avatar
	
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
			indicator={ActivityIndicator}
			renderError={() => <Text>There is an issue with your profile photo</Text>}
		/>
	)
}