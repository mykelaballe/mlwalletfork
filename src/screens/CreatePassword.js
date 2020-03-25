import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Button, ButtonText, TextInput, Errors} from '../components'
import {Colors} from '../themes'
import {_, Say, Func, Consts} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Create Password'
    }

    state = {
        old_password:this.props.navigation.state.params.old_password,
        new_password:'',
        confirm_password:'',
        show_old_password:false,
        show_new_password:false,
        show_confirm_password:false,
        errors:[],
        processing:false
    }

    handleChangeNewPassword = new_password => this.setState({new_password})

    handleChangeConfirmPassword = confirm_password => this.setState({confirm_password})

    handleToggleNewPassword = () => this.setState(prevState => ({show_new_password:!prevState.show_new_password}))

    handleToggleConfirmPassword = () => this.setState(prevState => ({show_confirm_password:!prevState.show_confirm_password}))

    handleFocusNewPassword = () => this.refs.new_password.focus()

    handleFocusConfirmPassword = () => this.refs.confirm_password.focus()

    handleSubmit = async () => {
        const {walletno} = this.props.navigation.state.params
        let {old_password, new_password, confirm_password, errors, processing} = this.state

        if(processing) return false

        try {
            this.setState({processing:true})

            old_password = old_password.trim()
            new_password = new_password.trim()
            confirm_password = confirm_password.trim()

            if(!old_password || !new_password || !confirm_password) Say.some(_('8'))
            else if(new_password != confirm_password) Say.warn('Passwords do not match')
            else {
                let validation = Func.validate(new_password, Consts.password_criteria)

                errors = validation.errors

                if(validation.ok) {
                    let payload = {
                        wallet_no:walletno,
                        current_password:old_password,
                        new_password
                    }

                    let res = await API.changePassword(payload)

                    if(res.error) Say.attemptLeft(res.message)
                    else {
                        errors = []
                        this.setState({
                            old_password:'',
                            new_password:'',
                            confirm_password:''
                        })

                        Say.ok("You password has been successfully changed",null,{
                            onDismiss:() => this.props.navigation.navigate('Login')
                        })
                    }
                }
                else {
                    Say.warn('Invalid format')
                }

                this.setState({errors})
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {old_password, new_password, confirm_password, show_old_password, show_new_password, show_confirm_password, errors, processing} = this.state
        let ready = false

        if(old_password && new_password && confirm_password) ready = true

        return (
            <>
                <Screen>
                    <Headline
                        title='Create your own password'
                        subtext='You are using a temporary password. You are required to change your password.'
                    />

                    <TextInput
                        ref='new_password'
                        label={'Password'}
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

                    <Errors
                        value={new_password}
                        criteria={Consts.password_criteria}
                    />

                    <TextInput
                        ref='confirm_password'
                        label={'Re-Type Password'}
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
                    <Button disabled={!ready} t={_('10')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user:state.user.data
})

export default connect(mapStateToProps)(Scrn)