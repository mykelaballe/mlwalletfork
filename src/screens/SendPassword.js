import React from 'react'
import {Screen, Footer, Headline, Button, Spacer, Prompt, Checkbox} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

export default class Scrn extends React.Component {

    state = {
        email:false,
        sms:false,
        processing:false,
        showSuccessModal:false
    }

    handleToggleEmail = () => this.setState(prevState => ({email:!prevState.email}))

    handleToggleSMS = () => this.setState(prevState => ({sms:!prevState.sms}))

    handleProceed = async () => {
        try {
            const {walletno} = this.props.navigation.state.params
            let {email, sms, processing} = this.state

            if(processing) return

            this.setState({processing:true})

            let payload = {
                walletno,
                email,
                sms
            }

            let res = await API.forgotPassword(payload)

            if(res.error) Say.some('An error has occurred')
            else {
                this.setState({showSuccessModal:true})
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    handleCloseModal = () => {
        this.setState({
            showSuccessModal:false
        },() => this.props.navigation.navigate('Login'))
    }

    render() {

        const {email, sms, processing, showSuccessModal} = this.state
        let ready = false

        if(email || sms) ready = true

        return (
            <>
                <Screen>

                    <Prompt
                        visible={showSuccessModal}
                        title='Success'
                        message='A temporary password has been sent. Change your password within 24 hours so it will not expire.'
                        onDismiss={this.handleCloseModal}
                        OkBtnLabel='Back to Login'
                    />

                    <Headline
                        title='Send Password'
                        subtext='We are about to send a temporary password. Please choose among the options below:'
                    />
                    
                    <Checkbox status={email} onPress={this.handleToggleEmail} label='Email' />
                    <Spacer />
                    <Checkbox status={sms} onPress={this.handleToggleSMS} label='SMS' />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t='OK' onPress={this.handleProceed} loading={processing} />
                </Footer>
            </>
        )
    }
}