import React from 'react'
import {StyleSheet, ImageBackground, Image, Dimensions} from 'react-native'

const {height} = Dimensions.get('window')

export default () => {	
	return (
		<ImageBackground source={require('../res/login_header.png')} resizeMode='cover' style={style.banner}>
			<Image source={require('../res/logo_white.png')} resizeMode='contain' style={style.logo} />
		</ImageBackground>
	)
}

const style = StyleSheet.create({
	banner: {
        width:undefined,
        height:height * .26,
        justifyContent:'center'
	},
	logo: {
		width:undefined,
		height:height * .08
	}
})