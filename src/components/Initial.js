import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Colors} from '../themes'
import {Text} from './'

const SIZE = 50

export default props => (
	<View style={style.container}>
		<Text light center>{props.text[0]}</Text>
	</View>
)

const style = StyleSheet.create({
	container: {
		alignItems:'center',
		justifyContent:'center',
		backgroundColor:Colors.brand,
		width:SIZE,
		height:SIZE,
		borderRadius:SIZE
	}
})