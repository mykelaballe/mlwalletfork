import React from 'react'
import {View, StyleSheet, ImageBackground, Image} from 'react-native'
import {ScrollView, Text, Button, Spacer} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_} from '../utils'

export default class AuthIndex extends React.Component {

    handleGoToLogin = () => this.props.navigation.navigate('Login')

    handleGoToSignUp = () => this.props.navigation.navigate('SignUp')

    render() {

        return (
            <ImageBackground source={require('../res/bg.png')} style={style.imgBg}>

                <View style={style.backdrop} />

                <View style={{alignItems:'center'}}>
                    <Image source={require('../res/logo_white.png')} style={style.logo} resizeMode='contain' />
                </View>

                <Text md light center>Withdraw, send cash and pay your bills anytime, from virtually anywhere!</Text>

                <View>
                    <Button light mode='outlined' contentStyle={style.btnContent} style={style.btn} t='Login' onPress={this.handleGoToLogin} />
                    <Spacer />
                    <Button light t='Create Account' mode='outlined' contentStyle={style.btnContent} style={style.btn} onPress={this.handleGoToSignUp} />
                </View>
            </ImageBackground>
        )
    }
}

const style = StyleSheet.create({
    imgBg: {
        padding:50,
        flex:1,
        justifyContent:'space-around'
    },
    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor:Colors.brand,
        opacity:.85
    },
    logo: {
        width:300
    },
    btn: {
        borderColor:Colors.light,
        borderWidth:2
    },
    btnContent: {
        height:50
    }
})