import React from 'react'
import {Screen, Headline, Button, ButtonText, TextInput, Footer, Errors} from '../components'
import {Colors} from '../themes'
import {_, Say, Func} from '../utils'

const CRITERIA = {
    minLength:8,
    hasNum:true,
    hasSpecialChar:true
}

export default class Scrn extends React.Component {

    state = {
        password:'',
        confirm_password:'',
        password_errors:[],
        processing:false
    }

    handleChangePassword = password => this.setState({password})

    handleChangeConfirmPassword = confirm_password => this.setState({confirm_password})

    handleFocusConfirmPassword = () => this.refs.confirm_password.focus()

    handleTogglePassword = () => this.setState(prevState => ({show_password:!prevState.show_password}))

    handleToggleConfirmPassword = () => this.setState(prevState => ({show_confirm_password:!prevState.show_confirm_password}))

    handleSubmit = async () => {
        let {password, confirm_password, processing} = this.state
        let password_errors = []

        if(processing) return false

        try {
            this.setState({processing:true})

            password = password.trim()
            confirm_password = confirm_password.trim()

            if(!password) Say.some(_('8'))
            else if(password != confirm_password) Say.some('Password does not match')
            else {

                let passwordValidation = Func.validate(password, CRITERIA)

                password_errors = passwordValidation.errors
                
                if(passwordValidation.ok) {
                    this.props.navigation.navigate('SignUpStep1',{
                        ...this.props.navigation.state.params,
                        password
                    })
                }
                else {
                    Say.warn('Invalid format')
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {password, confirm_password, show_password, show_confirm_password, password_errors, processing} = this.state
        let ready = false

        if(password && confirm_password) ready = true

        return (
            <>
                <Screen>
                    
                    <Headline
                        title='Registration'
                        subtext='Create a strong password'
                    />

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

                    <Errors
                        value={password}
                        criteria={CRITERIA}
                    />

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