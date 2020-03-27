import React from 'react'
import {View, StyleSheet, Linking} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Text, Button, ButtonText, Spacer, TextInput, Row, Icon, Screen, MLBanner} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Consts} from '../utils'
import {API} from '../services'
import TouchID from 'react-native-touch-id'

const TOUCHID_IGNORED_ERRORS = [
    'USER_CANCELED',
    'SYSTEM_CANCELED'
]

//config is optional to be passed in on Android
const touchIDConfig = {
    unifiedErrors:true,
    title: 'Fingerprint Login', // Android
    imageColor: Colors.dark, // Android,
    imageErrorColor: Colors.danger, //Android
    fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}

class Scrn extends React.Component {

    state = {
        walletno:null,
        username:'',
        password:'',
        show_password:false,
        processing:false
    }

    handleLogin = async () => {
        const {username, password} = this.state
        this.login({username, password})
    }

    handleTouchID = () => {
        const {isUsingTouchID} = this.props

        if(isUsingTouchID) {
            TouchID.authenticate('Place your finger on the fingerprint scanner to verify your identity', touchIDConfig)
            .then(async success => {
                let res = await API.loginByTouchID()

                if(!res.error) {
                    this.login({
                        username:res.data.username,
                        password:res.data.password
                    })
                }
                else {
                    Say.warn(res.message)
                }
            })
            .catch(err => {
                if(err && TOUCHID_IGNORED_ERRORS.indexOf(err.code) < 0) {
                    Say.some(err.message)
                }
            })
        }
        else {
            this.props.navigation.navigate('TouchID')
        }
    }

    login = async payload => {
        const {processing} = this.state

        let username = payload.username
        let password = payload.password

        if(processing) return false

        try {
            this.setState({processing:true})

            username = username.trim()
            password = password.trim()

            let payload = {
                username,
                password
            }

            if(!username || !password) Say.some(_('8'))
            else {
                let res = await API.login(payload)
                const {error,error_description} = res
                
                if(error) {
                    if([Consts.error.atl1, Consts.error.atl2, 'reach_maximum_attempts', Consts.error.blk1d].indexOf(error) >= 0) {
                        Say.attemptLeft(error)
                    }
                    else if(error === Consts.error.blk) Say.warn(error_description)
                    else if(error === 'invalid_grant' || error === 'username_notexists' || error === 'wrong_password') {
                        Say.warn(_('72'))
                    }
                    else if(error === 'version_outofdate') {
                        Say.warn(
                            'Please install the latest version of the app',
                            'Version Out of date',
                            {
                                OkBtnLabel:'Update Now',
                                onConfirm:() => Linking.openURL(Consts.storeListingUrl)
                            }
                        )
                    }
                    else if(error === 'registered_anotherdevice') {

                        this.setState({
                            walletno:error_description
                        })

                        Say.ask(
                            'Oh no! You can only access your ML Wallet account in one device. To transfer your ML Wallet account to this device, click OK',
                            'New Device',
                            {
                                noBtnLabel:'CANCEL',
                                onConfirm:this.handleRegisterNewDevice
                            }
                        )
                    }
                    else if(error === 'server_error') throw new Error()
                }
                else {
                    if(res.isresetpass === '1') {
                        this.props.navigation.navigate('CreatePassword',{
                            walletno:res.walletno,
                            old_password:res.password
                        })
                    }
                    else if(res.isresetpin === '1') {
                        this.props.navigation.navigate('ValidatePIN',{
                            data:res
                        })
                    }
                    else {
                        this.props.setIsUsingTouchID(res.fingerprintstat === '1')
                        this.props.setUser(res)
                        this.props.login()
                    }
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    handleGoToForgotPassword = () => this.props.navigation.navigate('ForgotPassword')

    handleGoToSignUp = () => this.props.navigation.navigate('SignUpUsername')

    handleChangeUsername = username => this.setState({username})

    handleChangePassword = password => this.setState({password})

    handleFocusPassword = () => this.refs.password.focus()

    handleTogglePassword = () => this.setState(prevState => ({show_password:!prevState.show_password}))

    handleRegisterNewDevice = () => {
        const {username, walletno} = this.state

        this.props.navigation.navigate('SecurityQuestion',{
            walletno,
            username,
            steps:[
                'registered',
                'personal',
                'transactional'
            ],
            func:async () => {
                let res = await API.updateDevice({
                    username
                })
                
                if(!res.error) {
                    Say.ok('Success! You can now access your ML Wallet account in this device')
                    this.props.navigation.navigate('Login')
                }
                else {
                    Say.warn('Error registering new device')
                }
            }
        })
    }

    render() {

        const {isUsingTouchID} = this.props
        const {username, password, show_password, processing} = this.state
        let ready = false

        if(username && password) ready = true

        return (
            <>  
                <MLBanner />
                
                <Screen>
                    <Spacer sm />

                    <View>
                        <Text center b xl>{_('54')}</Text>
                        <Text center mute md>{_('55')}</Text>
                    </View>

                    <Spacer />

                    <View style={style.midContainer}>
                        <TextInput
                            ref='username'
                            label={_('1')}
                            value={username}
                            onChangeText={this.handleChangeUsername}
                            onSubmitEditing={this.handleFocusPassword}
                            autoCapitalize='none'
                            returnKeyType='next'
                        />

                        <Spacer sm />

                        <TextInput
                            ref='password'
                            label={_('2')}
                            value={password}
                            onChangeText={this.handleChangePassword}
                            autoCapitalize='none'
                            secureTextEntry={show_password ? false : true}
                            rightContent={
                                <ButtonText color={Colors.gray} t={show_password ? _('47') : _('48')} onPress={this.handleTogglePassword} />
                            }
                        />

                        <View style={{alignItems:'flex-end'}}>
                            <ButtonText t={`${_('4')}?`} onPress={this.handleGoToForgotPassword} />
                        </View>

                        <Spacer />

                        <Button disabled={!ready} t={_('5')} onPress={this.handleLogin} loading={processing} />

                        <Spacer sm />

                        <Row c>
                            <Text>{_('7')}</Text>
                            <ButtonText t={_('3')} onPress={this.handleGoToSignUp} />
                        </Row>
                    </View>

                    <Spacer sm />

                    <Row c>
                        <Icon name='fingerprint' size={Metrics.icon.rg} />
                        <ButtonText t={isUsingTouchID ? _('46') : _('45')} onPress={this.handleTouchID} />
                    </Row>
                </Screen>
            </>
        )
    }
}

const style = StyleSheet.create({
    midContainer: {
        flex:1,
        justifyContent:'space-around'
    }
})

const mapStateToProps = state => ({
    isUsingTouchID: state.app.isUsingTouchID
})

const mapDispatchToProps = dispatch => ({
    login:() => dispatch(Creators.login()),
    setUser:user => dispatch(Creators.setUser(user)),
    setIsUsingTouchID:isUsing => dispatch(Creators.setIsUsingTouchID(isUsing))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)