import React from 'react'
import {Image} from 'react-native'
import {Res} from '../themes'

export default props => (
	<Image
		source={Res.icon[props.name]}
		resizeMode='contain'
		style={{
			width:props.size || 30,
			height:props.size || 30,
			...props.style
		}}
	/>
)