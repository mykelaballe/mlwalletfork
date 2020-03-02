import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Screen, Footer, Text, Button, ButtonText, TextInput, Spacer, Row, Prompt, Errors} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Func} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Change Password'
    }

    state = {
        old_password:'',
        new_password:'',
        confirm_password:'',
        show_old_password:false,
        show_new_password:false,
        show_confirm_password:false,
        showSuccessModal:false,
        errors:[],
        processing:false
    }

    handleChangeOldPassword = old_password => this.setState({old_password})

    handleChangeNewPassword = new_password => this.setState({new_password})

    handleChangeConfirmPassword = confirm_password => this.setState({confirm_password})

    handleToggleOldPassword = () => this.setState(prevState => ({show_old_password:!prevState.show_old_password}))

    handleToggleNewPassword = () => this.setState(prevState => ({show_new_password:!prevState.show_new_password}))

    handleToggleConfirmPassword = () => this.setState(prevState => ({show_confirm_password:!prevState.show_confirm_password}))

    handleFocusNewPassword = () => this.refs.new_password.focus()

    handleFocusConfirmPassword = () => this.refs.confirm_password.focus()

    handleSubmit = async () => {
        let {old_password, new_password, confirm_password, errors, processing} = this.state

        if(processing) return false

        try {
            this.setState({processing:true})

            old_password = old_password.trim()
            new_password = new_password.trim()
            confirm_password = confirm_password.trim()

            if(old_password == '' || new_password == '' || confirm_password == '') Say.some(_('8'))
            else if(new_password != confirm_password) Say.warn('Passwords do not match')
            else {
                let validation = Func.validate(new_password, {
                    minLength:8,
                    hasNum:true,
                    hasSpecialChar:true
                })

                errors = validation.errors

                if(validation.ok) {
                    let payload = {
                        old_password,
                        new_password
                    }

                    //let res = await API.changePassword(payload)
                    let res = {
                        error:false
                    }

                    if(res.error) Say.some('Invalid password')
                    else {
                        this.setState({showSuccessModal:true})
                    }
                }

                this.setState({errors})
            }
        }
        catch(err) {
            Say.err(_('18'))
        }

        this.setState({processing:false})
    }

    handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {old_password, new_password, confirm_password, show_old_password, show_new_password, show_confirm_password, showSuccessModal, errors, processing} = this.state
        let ready = false

        if(old_password && new_password && confirm_password) ready = true

        return (
            <>
                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message={"You've successfully saved your new Password"}
                    onDismiss={this.handleCloseModal}
                />

                <Screen>
                    <TextInput
                        ref='old_password'
                        label={'Current Password'}
                        value={old_password}
                        onChangeText={this.handleChangeOldPassword}
                        onSubmitEditing={this.handleFocusNewPassword}
                        autoCapitalize='none'
                        secureTextEntry={show_old_password ? false : true}
                        returnKeyType='next'
                        rightContent={
                            <ButtonText color={Colors.gray} t={show_old_password ? 'Hide' : 'Show'} onPress={this.handleToggleOldPassword} />
                        }
                    />
                    <TextInput
                        ref='new_password'
                        label={'New Password'}
                        value={new_password}
                        onChangeText={this.handleChangeNewPassword}
                        onSubmitEditing={this.handleFocusConfirmPassword}
                        autoCapitalize='none'
                        secureTextEntry={show_new_password ? false : true}
                        returnKeyType='next'
                        rightContent={
                            <ButtonText color={Colors.gray} t={show_new_password ? 'Hide' : 'Show'} onPress={this.handleToggleNewPassword} />
                        }
                    />

                    <Errors errors={errors} />

                    <TextInput
                        ref='confirm_password'
                        label={'Re-Type New Password'}
                        value={confirm_password}
                        onChangeText={this.handleChangeConfirmPassword}
                        autoCapitalize='none'
                        secureTextEntry={show_confirm_password ? false : true}
                        rightContent={
                            <ButtonText color={Colors.gray} t={show_confirm_password ? 'Hide' : 'Show'} onPress={this.handleToggleConfirmPassword} />
                        }
                    />
                </Screen>
                
                <Footer>
                    <Button disabled={!ready} t={_('9')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

export default Scrn