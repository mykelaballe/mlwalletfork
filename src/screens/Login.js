import React from 'react'
import {View, StyleSheet, Linking} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Text, Button, ButtonText, Spacer, TextInput, Row, Icon, Screen, MLBanner} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Consts, Func} from '../utils'
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
        data:null,
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

        let latitude = '', longitude = ''

        if(processing) return false

        try {
            this.setState({processing:true})

            /*let locationRes = await Func.getLocation()
            if(locationRes.error) {
                this.setState({processing:false})
                return false
            }
            else {
                latitude = locationRes.data.latitude
                longitude = locationRes.data.longitude
            }*/

            username = username.trim()
            password = password.trim()

            let payload = {
                username,
                password,
                latitude,
                longitude
            }

            if(!username || !password) Say.some(_('8'))
            else {
                let res = await API.login(payload)
                
                if(res.error) {
                    if([Consts.error.atl1, Consts.error.atl2, 'reach_maximum_attempts', Consts.error.blk1d].indexOf(res.message) >= 0) {
                        Say.attemptLeft(res.message)
                    }
                    else if(res.message === Consts.error.blk) Say.warn(res.message)
                    else if(res.message === 'invalid_grant' || res.message === 'username_notexists' || res.message === 'wrong_password') {
                        Say.warn('Oops! You entered the wrong information')
                    }
                    else if(res.message === 'version_outofdate') {
                        Say.warn(
                            'Please install the latest version of the app',
                            'Version Out of date',
                            {
                                OkBtnLabel:'Update Now',
                                onConfirm:() => Linking.openURL(Consts.storeListingUrl)
                            }
                        )
                    }
                    else if(res.message === 'registered_anotherdevice') {

                        this.setState({data:res.data})

                        Say.ask(
                            'Oh no! You can only access your ML Wallet account in one device. To transfer your ML Wallet account to this device, click YES',
                            'New Device',
                            {
                                noBtnLabel:'CANCEL',
                                okBtnLabel:'YES',
                                onConfirm:this.handleRegisterNewDevice
                            }
                        )
                    }
                    else if(res.message === 'server_error') throw {message:res.message}
                }
                else {
                    
                    res.data.latitude = latitude
                    res.data.longitude = longitude

                    if(res.data.isresetpass === 1) {
                        this.props.navigation.navigate('CreatePassword',{
                            walletno:res.data.walletno,
                            old_password:res.data.password
                        })
                    }
                    else if(res.data.isresetpin === 1) {
                        this.props.navigation.navigate('ValidatePIN',{
                            data:res.data
                        })
                    }
                    else {
                        this.props.setIsUsingTouchID(res.data.fingerprintstat === 1)
                        this.props.setUser(res.data)
                        this.props.login()
                    }
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    handleGoToForgotPassword = () => this.props.navigation.navigate('ForgotPassword')

    handleGoToSignUp = async () => {
        const locationRes = await Func.getLocation()
        if(!locationRes.error) this.props.navigation.navigate('SignUpUsername')
    }

    handleChangeUsername = username => this.setState({username})

    handleChangePassword = password => this.setState({password})

    handleFocusPassword = () => this.refs.password.focus()

    handleTogglePassword = () => this.setState(prevState => ({show_password:!prevState.show_password}))

    handleRegisterNewDevice = () => {
        const {username, data} = this.state

        this.props.navigation.navigate('SecurityQuestion',{
            walletno:data.walletno,
            username,
            questions:[
                data.secquestion1,
                data.secquestion2,
                data.secquestion3
            ],
            steps:[
                'registered',
                'personal',
                'transactional'
            ],
            func:async () => {
                let res = await API.updateDevice({username})
                
                if(res.error) Say.warn('Error registering new device')
                else {
                    Say.ok('Success! You can now access your ML Wallet account in this device')
                    this.props.navigation.navigate('Login')
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

                    <Spacer md />
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