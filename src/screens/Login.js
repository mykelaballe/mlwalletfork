import React from 'react'
import {View, StyleSheet, ImageBackground, Image, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {ScrollView, Text, Button, ButtonText, Spacer, TextInput, Row} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'

const {width} = Dimensions.get('window')

class Login extends React.Component {

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

    handleTogglePassword = () => this.setState(prevState => ({show_password:!prevState.show_password}))

    render() {

        const {username, password, show_password, processing} = this.state

        return (
            <>  
                <View style={{height:300,alignItems:'center'}}>
                    <Image source={require('../res/logo_mini.png')} resizeMode='contain' style={{width:300}} />
                </View>

                <View style={{flex:1,justifyContent:'space-around',paddingHorizontal:Metrics.xl}}>
                    <View>
                        <Text center b md>Welcome back!</Text>
                        <Text center mute sm>Please Log in to your account.</Text>
                    </View>
                    
                    <View>
                        <TextInput
                            label={_('1')}
                            value={username}
                            onChangeText={this.handleChangeUsername}
                            autoCapitalize='none'
                        />

                        <Spacer sm />

                        <Row>
                            <TextInput
                                style={{flex:1}}
                                label={_('2')}
                                value={password}
                                onChangeText={this.handleChangePassword}
                                autoCapitalize='none'
                                secureTextEntry={show_password ? false : true}
                            />
                            <ButtonText t={show_password ? 'Hide' : 'Show'} onPress={this.handleTogglePassword} />
                        </Row>

                        <View style={{alignItems:'flex-end'}}>
                            <ButtonText t='Forgot Password?' onPress={this.handleGoToForgotPassword} />
                        </View>

                        <Spacer />

                        <Button t='Log in' onPress={this.handleLogin} loading={processing} />

                        <Spacer />

                        <Row style={{justifyContent:'center'}}>
                            <Text>Don't have an account?</Text>
                            <ButtonText t='Register here' onPress={this.handleGoToSignUp} />
                        </Row>
                    </View>

                    <Row style={{justifyContent:'center'}}>
                        <Icon name='ios-finger-print' size={Metrics.icon.rg} color={Colors.mute} />
                        <ButtonText t='Log in with Touch ID' onPress={this.handleGoToTouchID} />
                    </Row>
                    
                </View>
            </>
        )
    }
}

const style = StyleSheet.create({

})

mapDispatchToProps = dispatch => {
    return {
        login:() => dispatch(Actions.login())
    }
}

export default connect(null, mapDispatchToProps)(Login)