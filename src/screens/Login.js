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
                password
            }

            if(username == '' || password == '') Say.some('Complete all fields')
            else {
                let res = await API.login(payload)
                if(res.error) Say.some(res.error_description)
                else {
                    this.props.login()
                }
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err('Something went wrong')
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

        return (
            <>  
                <Image source={require('../res/login_header.png')} resizeMode='cover' style={style.banner} />
                
                <Screen>
                    <Spacer />

                    <View>
                        <Text center b xl>Welcome back!</Text>
                        <Text center mute md>Please login to your account.</Text>
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
                                <ButtonText color={Colors.gray} t={show_password ? 'Hide' : 'Show'} onPress={this.handleTogglePassword} />
                            }
                        />

                        <View style={{alignItems:'flex-end'}}>
                            <ButtonText t='Forgot Password?' onPress={this.handleGoToForgotPassword} />
                        </View>

                        <Spacer />

                        <Button t='Login' onPress={this.handleLogin} loading={processing} />

                        <Spacer />

                        <Row c>
                            <Text>Don't have an account?</Text>
                            <ButtonText t='Register here' onPress={this.handleGoToSignUp} />
                        </Row>
                    </View>
                </Screen>
                
                <Footer>
                    <Row c>
                        <Icon name='fingerprint' size={Metrics.icon.rg} />
                        <ButtonText t='Activate Touch ID' onPress={this.handleGoToTouchID} />
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
        login:() => dispatch(Actions.login())
    }
}

export default connect(null, mapDispatchToProps)(Scrn)