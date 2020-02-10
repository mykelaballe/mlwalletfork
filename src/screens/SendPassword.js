import React from 'react'
import {Screen, Footer, Headline, Button, Spacer, Prompt, Radio} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'
import {RadioButton} from 'react-native-paper'

export default class Scrn extends React.Component {

    state = {
        option:'email',
        processing:false,
        showSuccessModal:false
    }

    handleSelectOption = option => this.setState({option})

    handleProceed = async () => {
        try {
            let {option, processing} = this.state

            if(processing) return

            this.setState({processing:true})

            let payload = {
                option
            }

            this.setState({showSuccessModal:true})

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
        }
    }

    handleCloseModal = () => {
        this.setState({
            showSuccessModal:false
        },() => this.props.navigation.navigate('Login'))
    }

    render() {

        const {option, processing, showSuccessModal} = this.state

        return (
            <>
                <Screen>

                    <Prompt
                        visible={showSuccessModal}
                        title='Success'
                        message='A temporary password has been sent to your e-mail. Change your password within 24 hours so it will not expire.'
                        onDismiss={this.handleCloseModal}
                        OkBtnLabel='Back to Login'
                    />

                    <Headline
                        title='Send Password'
                        subtext='Choose where you would want to send your temporary password.'
                    />

                    <RadioButton.Group onValueChange={this.handleSelectOption} value={option}>
                        <Radio value='email' label='Email' />
                        <Spacer />
                        <Radio value='sms' label='SMS' />
                    </RadioButton.Group>
                </Screen>

                <Footer>
                    <Button t='OK' onPress={this.handleProceed} loading={processing} />
                </Footer>
            </>
        )
    }
}