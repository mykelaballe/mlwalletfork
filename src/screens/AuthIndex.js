import React from 'react'
import {View, StyleSheet, ImageBackground, Image} from 'react-native'
import {Text, Button, Spacer} from '../components'
import {Colors} from '../themes'
import {_, Storage, Consts} from '../utils'
import RNRestart from 'react-native-restart'

export default class Scrn extends React.Component {

    componentDidMount = async () => {
        let db = await Storage.doLoad(Consts.db.app)
        db.isFirstTime = false
        await Storage.doSave(Consts.db.app,db)
    }

    handleChangeLang = async lang => {
        let db = await Storage.doLoad(Consts.db.app)
        db.lang = lang
        await Storage.doSave(Consts.db.app,db)
        RNRestart.Restart()
    }

    handleGoToLogin = () => this.props.navigation.navigate('Login')

    handleGoToSignUp = () => this.props.navigation.navigate('SignUp')

    render() {

        return (
            <View style={style.imgBg}>

                <View style={style.backdrop} />

                <View style={{alignItems:'center'}}>
                    <Image source={require('../res/logo_white.png')} style={style.logo} resizeMode='contain' />
                </View>

                <Text md light center>{_('6')}</Text>

                <View>
                    <Button light mode='outlined' contentStyle={style.btnContent} style={style.btn} t={_('5')} onPress={this.handleGoToLogin} />
                    <Spacer />
                    <Button light t={_('18')} mode='outlined' contentStyle={style.btnContent} style={style.btn} onPress={this.handleGoToSignUp} />

                    {/*<Button t='Cebuano' onPress={() => this.handleChangeLang('ceb')} />
                    <Button t='Tagalog' onPress={() => this.handleChangeLang('tgl')} />
                    <Button t='English' onPress={() => this.handleChangeLang('en')} />*/}
                </View>
            </View>
        )

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
                
                    <Button sm t='Tagalog' onPress={this.handleChangeToTagalog} />
                    <Button sm t='English' onPress={this.handleChangeToEnglish} />
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
        backgroundColor:Colors.brand
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