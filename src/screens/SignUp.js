import React from 'react'
import {Screen, Headline, Button, ButtonText, TextInput, Footer, Errors} from '../components'
import {Colors} from '../themes'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    state = {
        username:'',
        password:'',
        confirm_password:'',
        username_errors:[],
        password_errors:[],
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
        let username_errors = [], password_errors = []

        if(processing) return false

        try {
            this.setState({processing:true})

            username = username.trim()
            password = password.trim()
            confirm_password = confirm_password.trim()

            if(!username || !password) Say.some(_('8'))
            else if(password != confirm_password) Say.some('Password does not match')
            else {

                let usernameValidation = Func.validate(username, {
                    minLength:8,
                    alphaNum:true
                })

                let passwordValidation = Func.validate(password, {
                    minLength:8,
                    hasNum:true,
                    hasSpecialChar:true
                })

                username_errors = usernameValidation.errors
                password_errors = passwordValidation.errors
                
                if(usernameValidation.ok && passwordValidation.ok) {
                    let res = await API.validateUsername(username)

                    if(res.error) Say.some('Username already taken')
                    else {
                        this.props.navigation.navigate('SignUpStep1',{
                            username,
                            password
                        })
                    }
                }
            }

            this.setState({
                username_errors,
                password_errors
            })
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {username, password, confirm_password, show_password, show_confirm_password, username_errors, password_errors, processing} = this.state
        let ready = false

        if(username && password && confirm_password) ready = true

        return (
            <>
                <Screen>
                    
                    <Headline
                        title='Register'
                        subtext={`Register and avail of ${Consts.appName} App services today`}
                    />

                    <TextInput
                        ref='username'
                        label={_('1')}
                        value={username}
                        onChangeText={this.handleChangeUsername}
                        onSubmitEditing={this.handleFocusPassword}
                        autoCapitalize='none'
                        returnKeyType='next'
                    />

                    <Errors errors={username_errors} />

                    <TextInput
                        ref='password'
                        label={_('2')}
                        value={password}
                        onChangeText={this.handleChangePassword}
                        onSubmitEditing={this.handleFocusConfirmPassword}
                        secureTextEntry={show_password ? false : true}
                        autoCapitalize='none'
                        returnKeyType='next'
                        rightContent={
                            <ButtonText color={Colors.gray} t={show_password ? _('47') : _('48')} onPress={this.handleTogglePassword} />
                        }
                    />

                    <Errors errors={password_errors} />

                    <TextInput
                        ref='confirm_password'
                        label={'Re-type Password'}
                        value={confirm_password}
                        onChangeText={this.handleChangeConfirmPassword}
                        secureTextEntry={show_confirm_password ? false : true}
                        autoCapitalize='none'
                        rightContent={
                            <ButtonText color={Colors.gray} t={show_confirm_password ? _('47') : _('48')} onPress={this.handleToggleConfirmPassword} />
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

export default Scrn