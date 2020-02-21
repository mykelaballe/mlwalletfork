import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Text, Button, ButtonText, Spacer, TextInput, Row, Icon, Screen, Footer} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    state = {
        username:'',
        password:'',
        show_password:false,
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
                latitude:'1',
                longitude:'1',
                deviceid:1.1,
                location:'adasd',
                devicetype:'dasd',
                version:8
            }

            if(username == '' || password == '') Say.some(_('8'))
            else {
                let res = await API.login(payload)
                const {error} = res
                
                if(error) {

                    if(error === 'invalid_grant') Say.some(_('72'))
                    else if(error === 'version_outofdate') return
                    //else if(error === '') return
                }
                else {
                    this.props.setUser(res)
                    this.props.login()
                }
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err(_('500'))
        }
    }

    handleGoToTouchID = () => this.props.navigation.navigate('TouchID')

    handleGoToForgotPassword = () => this.props.navigation.navigate('ForgotPassword')

    handleGoToSignUp = () => this.props.navigation.navigate('SignUp')

    handleChangeUsername = username => this.setState({username})

    handleChangePassword = password => this.setState({password})

    handleFocusPassword = () => this.refs.password.focus()

    handleTogglePassword = () => this.setState(prevState => ({show_password:!prevState.show_password}))

    render() {

        const {username, password, show_password, processing} = this.state
        let ready = false

        if(username && password) ready = true

        return (
            <>  
                <Image source={require('../res/login_header.png')} resizeMode='cover' style={style.banner} />
                
                <Screen>
                    <Spacer />

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

                        <Spacer />

                        <Row c>
                            <Text>{_('7')}</Text>
                            <ButtonText t={_('3')} onPress={this.handleGoToSignUp} />
                        </Row>
                    </View>
                </Screen>
                
                <Footer>
                    <Row c>
                        <Icon name='fingerprint' size={Metrics.icon.rg} />
                        <ButtonText t={_('45')} onPress={this.handleGoToTouchID} />
                    </Row>
                </Footer>
            </>
        )
    }
}

const style = StyleSheet.create({
    banner: {
        width:undefined,
        height:200
    },
    midContainer: {
        flex:1,
        justifyContent:'space-around'
    }
})

mapDispatchToProps = dispatch => {
    return {
        login:() => dispatch(Actions.login()),
        setUser:user => dispatch(Actions.setUser(user))
    }
}

export default connect(null, mapDispatchToProps)(Scrn)