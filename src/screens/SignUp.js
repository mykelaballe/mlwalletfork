import React from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Headline, Text, Button, ButtonText, Spacer, TextInput, Row, Footer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    state = {
        username:'',
        password:'',
        confirm_password:'',
        processing:false
    }

    handleChangeUsername = username => this.setState({username})

    handleChangePassword = password => this.setState({password})

    handleChangeConfirmPassword = confirm_password => this.setState({confirm_password})

    handleFocusPassword = () => this.refs.password.focus()

    handleFocusConfirmPassword = () => this.refs.confirm_password.focus()

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
                this.props.navigation.replace('SignUpStep1')
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    render() {

        const {username, password, confirm_password, show_password, show_confirm_password, processing} = this.state
        let ready = false

        if(username && password && confirm_password) ready = true

        return (
            <>
                <Screen>
                    
                    <Headline
                        title='Register'
                        subtext='Create an account to avail of the services ML Wallet app has to offer'
                    />

                    <TextInput
                        ref='username'
                        label={'Username'}
                        value={username}
                        onChangeText={this.handleChangeUsername}
                        onSubmitEditing={this.handleFocusPassword}
                        autoCapitalize='none'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='password'
                        label={'Password'}
                        value={password}
                        onChangeText={this.handleChangePassword}
                        onSubmitEditing={this.handleFocusConfirmPassword}
                        secureTextEntry={show_password ? false : true}
                        autoCapitalize='none'
                        returnKeyType='next'
                        rightContent={
                            <ButtonText color={Colors.gray} t={show_password ? 'Hide' : 'Show'} onPress={this.handleTogglePassword} />
                        }
                    />

                    {/*<View style={style.error}>
                        <Row>
                            <Icon name='ios-checkmark-circle' color={Colors.success} size={Metrics.icon.sm} />
                            <Spacer h sm />
                            <Text mute>Minimum of 8 characters in length</Text>
                        </Row>
                        <Spacer xs />
                        <Row>
                            <Icon name='ios-close-circle' color={Colors.brand} size={Metrics.icon.sm} />
                            <Spacer h sm />
                            <Text mute>At least one number</Text>
                        </Row>
                        <Spacer xs />
                        <Row>
                            <Icon name='ios-close-circle' color={Colors.brand} size={Metrics.icon.sm} />
                            <Spacer h sm />
                            <Text mute>At least one special character (!@#$%)</Text>
                        </Row>
                    </View>*/}

                    <TextInput
                        ref='confirm_password'
                        label={'Re-type Password'}
                        value={confirm_password}
                        onChangeText={this.handleChangeConfirmPassword}
                        secureTextEntry={show_confirm_password ? false : true}
                        autoCapitalize='none'
                        rightContent={
                            <ButtonText color={Colors.gray} t={show_confirm_password ? 'Hide' : 'Show'} onPress={this.handleToggleConfirmPassword} />
                        }
                    />
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t='Register' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const style = StyleSheet.create({
    error: {
        marginVertical:Metrics.md
    }
})

export default Scrn