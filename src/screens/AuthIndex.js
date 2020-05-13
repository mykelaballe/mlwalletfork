import React from 'react'
import {View, StyleSheet, ImageBackground, Image} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Text, Button, Spacer} from '../components'
import {Colors} from '../themes'
import {_, Storage, Consts} from '../utils'

class Scrn extends React.Component {

    /*componentDidMount = async () => {
        let db = await Storage.doLoad(Consts.db.app)
        db.isFirstTime = false
        await Storage.doSave(Consts.db.app,db)
    }*/

    handleChangeLang = async lang => {
        let db = await Storage.doLoad(Consts.db.app)
        db.lang = lang
        await Storage.doSave(Consts.db.app,db)
        //RNRestart.Restart()
    }

    handleGoToLogin = () => this.props.setIsFirstTime(false)

    handleGoToSignUp = () => this.props.navigation.navigate('SignUpUsername')

    render() {

        /*return (
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
                </View>
            </View>
        )*/

        return (
            <ImageBackground source={require('../res/bg.png')} style={style.imgBg}>

                <View style={style.backdrop} />

                <Spacer />

                <View style={{alignItems:'center'}}>
                    <Image source={require('../res/logo_white.png')} style={style.logo} resizeMode='contain' />
                </View>

                <Text md light center>{_('6')}</Text>

                <View>
                    <Button light mode='outlined' contentStyle={style.btnContent} style={style.btn} t={_('5')} onPress={this.handleGoToLogin} />
                    <Spacer />
                    <Button light t={_('18')} mode='outlined' contentStyle={style.btnContent} style={style.btn} onPress={this.handleGoToSignUp} />
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
        opacity:.8
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

const mapDispatchToProps = dispatch => ({
    setIsFirstTime: isFirstTime => dispatch(Creators.setIsFirstTime(isFirstTime))
})

export default connect(null, mapDispatchToProps)(Scrn)