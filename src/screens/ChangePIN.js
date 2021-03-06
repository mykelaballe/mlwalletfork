import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Button, ButtonText, TextInput} from '../components'
import {Colors} from '../themes'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Change PIN'
    }

    state = {
        old_pin:'',
        new_pin:'',
        confirm_pin:'',
        show_old_pin:false,
        show_new_pin:false,
        show_confirm_pin:false,
        error_old:false,
        error_new:false,
        processing:false
    }

    handleChangeOldPIN = old_pin => this.setState({old_pin,error_old:false})
    handleChangeNewPIN = new_pin => this.setState({new_pin,error_new:false})
    handleChangeConfirmPIN = confirm_pin => this.setState({confirm_pin})

    handleToggleOldPIN = () => this.setState(prevState => ({show_old_pin:!prevState.show_old_pin}))
    handleToggleNewPIN= () => this.setState(prevState => ({show_new_pin:!prevState.show_new_pin}))
    handleToggleConfirmPIN = () => this.setState(prevState => ({show_confirm_pin:!prevState.show_confirm_pin}))

    handleFocusNewPIN = () => this.refs.new_pin.focus()
    handleFocusConfirmPIN = () => this.refs.confirm_pin.focus()

    handleSubmit = async () => {
        const {walletno} = this.props.user
        let {old_pin, new_pin, confirm_pin, processing} = this.state

        if(processing) return false

        try {
            this.setState({processing:true})

            old_pin = old_pin.trim()
            new_pin = new_pin.trim()
            confirm_pin = confirm_pin.trim()

            if(!old_pin || !new_pin || !confirm_pin) Say.some(_('8'))
            else if(!Func.isNumbersOnly(new_pin)) {
                this.setState({error_new:true})
                Say.warn(Consts.error.onlyNumbers)
            }
            else if(new_pin.length < Consts.max_pin_length) Say.warn('PIN too short')
            else if(new_pin.length > Consts.max_pin_length) Say.warn('PIN too long')
            else if(new_pin != confirm_pin) Say.warn('PIN do not match')
            else {

                let payload = {
                    walletno,
                    current_pin:old_pin,
                    new_pin
                }

                let res = await API.changePIN(payload)

                if(res.error) {
                    this.setState({error_old:true})

                    Say.attemptLeft(res.message,{
                        frontMsg:Consts.error.wrongInfo
                    })
                    
                    if(res.message == Consts.error.blk1d) this.props.logout()
                }
                else {
                    this.setState({
                        old_pin:'',
                        new_pin:'',
                        confirm_pin:''
                    })

                    Say.ok("Your PIN has been successfully changed")
                    this.props.navigation.pop()
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {old_pin, new_pin, confirm_pin, show_old_pin, show_new_pin, show_confirm_pin, error_old, error_new, processing} = this.state
        let ready = false

        if(old_pin && new_pin && confirm_pin && new_pin.length == Consts.max_pin_length) ready = true

        return (
            <>
                <Screen>
                    <TextInput
                        ref='old_pin'
                        label={'Current PIN'}
                        value={old_pin}
                        error={error_old}
                        onChangeText={this.handleChangeOldPIN}
                        onSubmitEditing={this.handleFocusNewPIN}
                        autoCapitalize='none'
                        maxLength={6}
                        secureTextEntry={show_old_pin ? false : true}
                        contextMenuHidden
                        keyboardType='numeric'
                        returnKeyType='next'
                        rightContent={
                            <ButtonText color={Colors.gray} t={show_old_pin ? 'Hide' : 'Show'} onPress={this.handleToggleOldPIN} />
                        }
                    />
                    <TextInput
                        ref='new_pin'
                        label={'New PIN'}
                        value={new_pin}
                        error={error_new}
                        onChangeText={this.handleChangeNewPIN}
                        onSubmitEditing={this.handleFocusConfirmPIN}
                        autoCapitalize='none'
                        maxLength={6}
                        secureTextEntry={show_new_pin ? false : true}
                        contextMenuHidden
                        keyboardType='numeric'
                        returnKeyType='next'
                        rightContent={
                            <ButtonText color={Colors.gray} t={show_new_pin ? 'Hide' : 'Show'} onPress={this.handleToggleNewPIN} />
                        }
                    />

                    <TextInput
                        ref='confirm_pin'
                        label={'Re-Type New PIN'}
                        value={confirm_pin}
                        onChangeText={this.handleChangeConfirmPIN}
                        autoCapitalize='none'
                        maxLength={6}
                        secureTextEntry={show_confirm_pin ? false : true}
                        contextMenuHidden
                        keyboardType='numeric'
                        rightContent={
                            <ButtonText color={Colors.gray} t={show_confirm_pin ? 'Hide' : 'Show'} onPress={this.handleToggleConfirmPIN} />
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

const mapStateToProps = state => ({
    user:state.user.data
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(Creators.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)