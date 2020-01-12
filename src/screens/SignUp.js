import React from 'react'
import {View, StyleSheet, ImageBackground, Image} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {ScrollView, Text, Button, ButtonText, Spacer, TextInput, Row} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class SignUp extends React.Component {

    state = {
        username:'',
        password:'',
        confirm_password:'',
        processing:false
    }

    handleChangeUsername = username => this.setState({username})

    handleChangePassword = password => this.setState({password})

    handleChangeConfirmPassword = confirm_password => this.setState({confirm_password})

    handleTogglePassword = () => this.setState(prevState => ({show_password:!prevState.show_password}))

    handleToggleConfirmPassword = () => this.setState(prevState => ({show_confirm_password:!prevState.show_confirm_password}))

    handleSubmit = async () => {
        let {username, password, confirm_password, processing} = this.state

        if(processing) return false

        try {
            username = username.trim()
            password = password.trim()
            confirm_password = confirm_password.trim()

            if(username == '' || password == '') Say.some(_('8'))
            else if(password != confirm_password) Say.some(`${_('2')} ${_('50')}`)
            else {
                this.props.navigation.navigate('test')
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    render() {

        const {username, password, confirm_password, show_password, show_confirm_password, processing} = this.state

        return (
            <ScrollView style={{padding:Metrics.xl}} contentContainerStyle={{flex:1}}>
                <View>

                    <Text b xl center>Register</Text>
                    <Spacer sm />
                    <Text center mute>Create an account to avail of the services ML Wallet app has to offer.</Text>

                    <Spacer />

                    <TextInput
                        label={'Username'}
                        value={username}
                        onChangeText={this.handleChangeUsername}
                    />

                    <Row>
                        <TextInput
                            style={{flex:1}}
                            label={'Password'}
                            value={password}
                            onChangeText={this.handleChangePassword}
                            secureTextEntry={show_password ? false : true}
                        />
                        <ButtonText t={show_password ? 'Hide' : 'Show'} onPress={this.handleTogglePassword} />
                    </Row>

                    <Row>
                        <TextInput
                            style={{flex:1}}
                            label={'Re-type Password'}
                            value={confirm_password}
                            onChangeText={this.handleChangeConfirmPassword}
                            secureTextEntry={show_confirm_password ? false : true}
                        />
                        <ButtonText t={show_confirm_password ? 'Hide' : 'Show'} onPress={this.handleToggleConfirmPassword} />
                    </Row>
                </View>

                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <Button t='Register' onPress={this.handleSubmit} />
                </View>
            </ScrollView>
        )
    }
}

export default SignUp