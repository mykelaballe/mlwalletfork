import React from 'react'
import {Screen, Footer, Headline, Button, Spacer, Checkbox} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

export default class Scrn extends React.Component {

    state = {
        email:false,
        sms:false,
        processing:false,
    }

    handleToggleEmail = () => this.setState(prevState => ({email:!prevState.email}))
    handleToggleSMS = () => this.setState(prevState => ({sms:!prevState.sms}))

    handleProceed = async () => {
        try {
            const {walletno} = this.props.navigation.state.params
            let {email, sms, processing} = this.state

            if(processing) return

            this.setState({processing:true})

            let flag_num = 0

            if(email) flag_num += 1
            if(sms) flag_num += 2

            let payload = {
                wallet_num:walletno,
                flag_num
            }

            let res = await API.forgotPassword(payload)

            if(res.error) Say.warn(res.message)
            else {
                let msg = 'A temporary password has been sent to your '
                let methods = []

                if(sms) methods.push('mobile number')
                if(email) methods.push('email')
                
                msg += methods.join(' & ')

                Say.ok(
                    msg,
                    null,
                    {
                        OkBtnLabel:'Back to Login',
                        onDismiss:() => this.props.navigation.navigate('Login')
                    }
                )
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {email, sms, processing} = this.state
        let ready = false

        if(email || sms) ready = true

        return (
            <>
                <Screen>

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