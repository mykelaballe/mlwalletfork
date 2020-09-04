import React from 'react'
import {View, StyleSheet, Linking} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Text, Button, ButtonText, Spacer, TextInput, Row, Icon, Screen, MLBanner, ButtonTextIcon} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    state = {
        data:null,
        username:this.props.username,
        rememberedUsername:Func.maskUsername(this.props.username),
        password:'',
        show_password:false,
        processing:false
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.clearPassword && prevState.password) {
            this.setState({password:''})
            this.props.navigation.setParams({clearPassword:null})
        }
    }

    handleLogin = async () => {
        let {username, password, processing} = this.state

        if(!processing) {
            try {
                this.setState({processing:true})

                username = username.trim()
                password = password.trim()

                if(!username || !password) Say.some(_('8'))
                else {
                    let res = await API.checkExistingSession({username})

                    this.setState({processing:false})

                    if(res.error) {
                        Say.some(
                            null,
                            'Existing Login',
                            {
                                noBtn:true,
                                customMessage: (
                                    <>
                                        <Text mute md>You're currently logged in on another device. To force logout, click OK</Text>
                                        
                                        <Spacer />

                                        <Button mode='outlined' t='Maybe Later' onPress={() => Say.hide()} />

                                        <Spacer xs />

                                        <Button t='OK' onPress={() => {
                                            Say.hide()
                                            
                                            API.logout({
                                                username,
                                                token:res.data.token
                                            })
        
                                            this.props.navigation.navigate('ValidatePIN',{
                                                data:{
                                                    walletno:res.data.walletno,
                                                    username,
                                                    token:res.data.token
                                                },
                                                isVerificationOnly:true,
                                                func:() => this.login({username, password})
                                            })
                                        }}/>
                                    </>
                                )
                            }
                        )
                    }
                    else await this.login({username, password})
                }
            }
            catch(err) {
                Say.warn(err)
            }

            this.setState({processing:false})
        }
    }

    handleTouchID = async () => {
        let res1 = await Func.validateTouchID()

        if(res1) {
            try {
                let res2 = await API.loginByTouchID()

                if(!res2.error) {
                    this.login({
                        username:res2.data.username,
                        password:res2.data.password
                    })
                }
                else {
                    if(!res2.message) throw new Error()
                    else Say.warn(res2.message)
                }
            }
            catch(err) {
                Say.err(err)
            }
        }
    }

    login = async params => {
        const {processing} = this.state

        if(processing) return false

        let {username, password} = params

        let latitude = Consts.defaultLatitude, longitude = Consts.defaultLongitude

        try {
            this.setState({processing:true})

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
                    if(res.message == 'inactive') {
                        Say.warn(
                            `Your account has been deactivated. Please contact Customer Care for more information.\n\nGlobe: ${Consts.hotline2}\nSmart: ${Consts.hotline1}`,
                            null,
                            null,
                            true
                        )
                    } 
                    else if([Consts.error.atl1, Consts.error.atl2, 'reach_maximum_attempts', Consts.error.blk1d].indexOf(res.message) >= 0) {
                        Say.attemptLeft(res.message)
                    }
                    else if(res.message === Consts.error.blk) Say.warn(res.message)
                    else if(res.message === 'invalid_grant' || res.message === 'username_notexists' || res.message === 'wrong_password') {
                        Say.warn('You entered the wrong information')
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
                    else if(res.message === 'old_user') this.force1stReupdateInfo(res.data)
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
                    else throw {message:res.message}
                }
                else {
                    
                    res.data.latitude = latitude
                    res.data.longitude = longitude
                    
                    if(!res.data.barangay || !res.data.street || !res.data.houseno) {
                        this.forceReupdateAddress({
                            ...res.data,
                            isnewapp:1
                        })
                    }
                    else if(res.data.isresetpass === 1) {
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
                        res.data.remotePhoto = `${Consts.baseURL}wallet/image?walletno=${res.data.walletno}`
                        res.data.localPhoto = this.props.localPhotos[res.data.walletno] || null

                        this.props.setUser(res.data)
                        //this.props.setIsUsingTouchID(res.data.fingerprintstat === 1)
                        this.props.rememberLoginCredentials({username:res.data.username})
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

    force1stReupdateInfo = userData => {
        Say.ok(
            'For an even better experience with the new and improved ML Wallet App, please update your ML Wallet profile now!',
            `Hi, ${userData.fname}!`,
            {
                onConfirm:() => {
                    this.props.setUser(userData)
                    this.props.navigation.navigate('SignUpPassword',{isForceUpdate:true})
                }
            }
        )
    }

    forceReupdateAddress = userData => {
        Say.ok(
            'For an even better experience with the new and improved ML Wallet App, please update your address!',
            `Hi, ${userData.fname}!`,
            {
                onConfirm:() => {
                    this.props.setUser(userData)
                    this.props.navigation.navigate('SignUpStep2',{isForceUpdate:true})
                }
            }
        )
    }

    handleGoToForgotPassword = () => this.props.navigation.navigate('ForgotPassword')

    handleGoToSignUp = async () => {
        const locationRes = await Func.getLocation()
        if(Func.isCheckLocation('signup')) {
            if(!locationRes.error) this.props.navigation.navigate('SignUpUsername')
        }
    }

    handleChangeUsername = username => this.setState({username, rememberedUsername:username})
    handleChangePassword = password => this.setState({password})

    handleFocusUsername = () => {
        if(this.props.username === this.state.username) this.setState({username:'', rememberedUsername:''})
    }
    handleFocusPassword = () => this.refs.password.focus()

    handleTogglePassword = () => this.setState(prevState => ({show_password:!prevState.show_password}))

    render() {

        const {isUsingTouchID} = this.props
        let {username, rememberedUsername, password, show_password, processing} = this.state
        let ready = false

        username = rememberedUsername || username

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
                            editable={!processing}
                            ref='username'
                            label={_('1')}
                            value={username}
                            onChangeText={this.handleChangeUsername}
                            onSubmitEditing={this.handleFocusPassword}
                            onFocus={this.handleFocusUsername}
                            autoCapitalize='none'
                            returnKeyType='next'
                            maxLength={30}
                        />

                        <Spacer sm />

                        <TextInput
                            editable={!processing}
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
                            <ButtonText disabled={processing} t='Forgot password?' onPress={this.handleGoToForgotPassword} />
                        </View>

                        <Spacer />

                        <Button disabled={!ready} t={_('5')} onPress={this.handleLogin} loading={processing} />

                        <Spacer sm />

                        <Row c>
                            <Text>{_('7')}</Text>
                            <ButtonText disabled={processing} t={`${_('3')}.`} onPress={this.handleGoToSignUp} />
                        </Row>
                    </View>

                    {isUsingTouchID &&
                    <>
                        <Spacer sm />

                        <ButtonTextIcon
                            disabled={processing}
                            i='fingerprint'
                            t={_('46')}
                            onPress={this.handleTouchID}
                        />
                    </>
                    }

                    <Text sm mute center>v {Consts.appVersion}</Text>

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
    isUsingTouchID: state.app.isUsingTouchID,
    username: state.app.rememberedUsername,
    localPhotos: state.app.localPhotos
})

const mapDispatchToProps = dispatch => ({
    login:() => dispatch(Creators.login()),
    setUser:user => dispatch(Creators.setUser(user)),
    setIsUsingTouchID:isUsing => dispatch(Creators.setIsUsingTouchID(isUsing)),
    rememberLoginCredentials:credentials => dispatch(Creators.rememberLoginCredentials(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)