import React from 'react'
import {StyleSheet, View, Image, ImageBackground, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Text, Button, Card, Spacer, Row, TextInput, TopBuffer, Ripple, ScrollView, ButtonText, ButtonIcon} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import TouchID from 'react-native-touch-id'

const {height} = Dimensions.get('window')

//config is optional to be passed in on Android
const optionalConfigObject = {
    title: 'Fingerprint Login', // Android
    imageColor: Colors.dark, // Android,
    imageErrorColor: Colors.danger, //Android
    fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}

class LoginScreen extends React.Component {

    static navigationOptions = {
        header:null
    }

    state = {
        username:'',
        password:'',
        processing:false
    }

    handleLogin = async () => {
        let {username, password, processing} = this.state

        if(processing) return false

        try {
            this.setState({processing:true})

            username = username.trim()
            password = password.trim()

            let payload = {
                username,
                password,
                grant_type:'password'
            }

            let res = await API.login(payload)

            if(username == '' || password == '') Say.some(_('8'))
            else {
                if(res.error) Say.some(res.error_description)
                else {
                    this.props.login()
                }
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err(_('18'))
        }
    }

    handleFingerprint = () => {
        const {login} = this.props

        TouchID.authenticate('Place your finger on the fingerprint scanner to verify your identity', optionalConfigObject)
        .then(success => {
            login()
        })
        .catch(error => {
            
        })
    }

    handleChangeUsername = username => this.setState({username})

    handleChangePassword = password => this.setState({password})

    handleSignUp = () => this.props.navigation.navigate('RegisterIndex')

    handleForgotPassword = () => this.props.navigation.navigate('ForgotPassword')

    handleRates = () => this.props.navigation.navigate('Rates')

    handleLocator = () => this.props.navigation.navigate('Locator')

    handleInformation = () => this.props.navigation.navigate('Information')

    handleQRCode = () => this.props.navigation.navigate('QRCode')

    handleShop = () => this.props.navigation.navigate('ShopStoreListing')

    render() {

        const {username, password, processing} = this.state

        return (
            <ScrollView style={style.container}>

                <TopBuffer />

                <View style={style.innerContainer}>
                    <Card>
                        
                        <View style={style.logoWrapper}>
                            <Image source={Res.logo_mini} style={style.logo} />
                        </View>

                        <TextInput
                            label={_('1')}
                            value={username}
                            onChangeText={this.handleChangeUsername}
                            autoCapitalize='none'
                        />

                        <Spacer />

                        <Row>
                            <TextInput
                                style={{flex:1}}
                                label={_('2')}
                                value={password}
                                onChangeText={this.handleChangePassword}
                                autoCapitalize='none'
                                secureTextEntry
                            />
                            <ButtonIcon
                                onPress={this.handleFingerprint}
                                icon={<Icon name='ios-finger-print' color={Colors.dark} size={Metrics.icon.md} />}
                            />
                        </Row>

                        <Spacer />

                        <Button t={_('5')} onPress={this.handleLogin} loading={processing} />

                        <Spacer />

                        <View style={{alignItems:'center'}}>
                            <Text b sm>{_('6')}</Text>
                            <Text mute sm>{_('7')}</Text>
                        </View>

                        <Spacer />

                        <Row bw>
                            <ButtonText t={_('3')} onPress={this.handleSignUp} />
                            <ButtonText t={_('4')} onPress={this.handleForgotPassword} />
                        </Row>
                    </Card>
                </View>

                <ImageBackground style={style.footer} source={Res.branch_store}>
                    <Row style={{paddingBottom:Metrics.rg}}>
                        <ButtonIcon
                            onPress={this.handleRates}
                            style={style.card}
                            icon={<Icon name='ios-trending-up' size={Metrics.icon.md} color={Colors.success} />}
                        />
                        <ButtonIcon
                            onPress={this.handleLocator}
                            style={style.card}
                            icon={<Icon name='ios-pin' size={Metrics.icon.md} color={Colors.info} />}
                        />
                        <ButtonIcon
                            onPress={this.handleInformation}
                            style={style.card}
                            icon={<Icon name='ios-information-circle' size={Metrics.icon.md} color={Colors.warning} />}
                        />
                        <ButtonIcon
                            onPress={this.handleQRCode}
                            style={style.card}
                            icon={<MaterialIcon name='qrcode' size={Metrics.icon.md} color={Colors.purple} />}
                        />
                        <ButtonIcon
                            onPress={this.handleShop}
                            style={style.card}
                            icon={<Icon name='ios-cart' size={Metrics.icon.md} color={Colors.pink} />}
                        />
                    </Row>
                </ImageBackground>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor:Colors.brand
    },
    innerContainer: {
        padding:Metrics.lg
    },
    footer: {
        height:height * .27,
        justifyContent:'center',
        paddingHorizontal:Metrics.lg
    },
    card: {
        marginHorizontal:Metrics.sm,
        backgroundColor:Colors.light,
        borderRadius:Metrics.sm,
        elevation:Metrics.elevation
    },
    logoWrapper: {
        alignItems:'center',
        paddingVertical:Metrics.lg
    },
    logo: {
        width:250,
        height:100
    }
})

mapDispatchToProps = dispatch => {
    return {
        login: () => dispatch(Actions.login())
    }
}

export default connect(null, mapDispatchToProps)(LoginScreen)