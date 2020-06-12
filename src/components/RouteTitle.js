import React from 'react'
import {View} from 'react-native'
import Text from './Text'

export default ({t, s}) => (
	<View style={{flex:1}}>
		<Text center md numberOfLines={2} light>{t}</Text>
	</View>
)