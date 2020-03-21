import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, Button, Spacer, Checkbox} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    state = {
        email:false,
        sms:false,
        processing:false,
    }

    handleToggleEmail = () => this.setState(prevState => ({email:!prevState.email}))

    handleToggleSMS = () => this.setState(prevState => ({sms:!prevState.sms}))

    handleProceed = async () => {
        try {
            const {walletno} = this.props.user
            let {email, sms, processing} = this.state

            if(processing) return

            this.setState({processing:true})

            let flag_num = 0

            if(email) flag_num += 1
            if(sms) flag_num += 2

            let payload = {
                walletno,
                flag_num
            }

            let res = await API.forgotPIN(payload)

            if(res.error) Say.warn(res.message)
            else {
                Say.ok(
                    res.message,
                    null,
                    {
                        OkBtnLabel:'Back to Login',
                        onDismiss:() => this.props.logout()
                    }
                )
            }
        }
        catch(err) {
            Say.err(_('500'))
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
                        title='Send PIN'
                        subtext='We are about to send a temporary pin. Please choose among the options below:'
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

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(Creators.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)