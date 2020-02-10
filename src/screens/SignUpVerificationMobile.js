import React from 'react'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Footer, Headline, Text, Button, Spacer, TextInput, SignUpStepsTracker} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Verification'
    }

    state = {
        mobile_no:'',
        processing:false
    }

    handleChangeMobile = mobile_no => this.setState({mobile_no})

    handleSubmit = async () => {
        let {mobile_no, processing} = this.state

        if(processing) return false

        try {
            mobile_no = mobile_no.trim()

            if(mobile_no == '') Say.some(_('8'))
            else {
                this.props.navigation.navigate('SignUpVerificationOTP')
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    render() {

        const {mobile_no, processing} = this.state
        let ready = false

        if(mobile_no) ready = true

        return (
            <>
                <Screen>
                    <SignUpStepsTracker step={5} />

                    <Headline subtext='Enter your mobile number so we can send you the verification code' />

                    <TextInput
                        label={'Mobile No.'}
                        value={mobile_no}
                        onChangeText={this.handleChangeMobile}
                        keyboardType='numeric'
                    />
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t='Next' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

export default Scrn