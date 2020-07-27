import React from 'react'
import {Screen, Headline, Button, ButtonText, TextInput, Footer, Errors} from '../components'
import {Colors} from '../themes'
import {_, Say, Func, Consts} from '../utils'

export default class Scrn extends React.Component {

    state = {
        password:'',
        confirm_password:'',
        error:false,
        password_errors:[],
        processing:false
    }

    handleChangePassword = password => this.setState({password,error:false})
    handleChangeConfirmPassword = confirm_password => this.setState({confirm_password})

    handleFocusConfirmPassword = () => this.refs.confirm_password.focus()
    handleTogglePassword = () => this.setState(prevState => ({show_password:!prevState.show_password}))
    handleToggleConfirmPassword = () => this.setState(prevState => ({show_confirm_password:!prevState.show_confirm_password}))

    handleSubmit = async () => {
        const {params = {}} = this.props.navigation.state
        let {password, confirm_password, processing} = this.state
        let password_errors = []

        if(processing) return false

        try {
            this.setState({processing:true})

            password = password.trim()
            confirm_password = confirm_password.trim()

            if(!password) Say.some(_('8'))
            else if(!Func.hasCommonSpecialCharsOnly(password)) {
                this.setState({error:true})
                Say.warn(Consts.error.notAllowedChar)
            }
            else if(password != confirm_password) Say.some(Consts.error.pwdNotMatch)
            else {

                let passwordValidation = Func.validate(password, Consts.password_criteria)

                password_errors = passwordValidation.errors
                
                if(passwordValidation.ok) {
                    let payload = params.payload || {}

                    this.props.navigation[params.isForceUpdate ? 'navigate' : 'replace']('SignUpPIN',{
                        ...payload,
                        ...params,
                        password
                    })
                }
                else this.setState({error:true})
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {params = {}} = this.props.navigation.state
        const {password, confirm_password, error, show_password, show_confirm_password, password_errors, processing} = this.state
        let ready = false

        if(password && confirm_password) ready = true

        return (
            <>
                <Screen>
                    
                    <Headline
                        title={params.isForceUpdate ? '' : 'Registration'}
                        subtext='Create a strong password'
                    />

                    <TextInput
                        ref='password'
                        autoFocus
                        label={_('2')}
                        value={password}
                        error={error}
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
                        criteria={Consts.password_criteria}
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
                    <Button disabled={!ready} t={params.isForceUpdate ? 'Next' : 'Register'} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}