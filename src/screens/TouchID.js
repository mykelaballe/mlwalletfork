import React from 'react'
import {View} from 'react-native'
import {Screen, Footer, Headline, Text, Button, Icon, Prompt} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

export default class Scrn extends React.Component {

    state = {
        activated:false,
        showSuccessModal:false
    }

    handleActivate = async () => {
        this.setState({
            activated:true,
            showSuccessModal:true
        })
    }

    handleDeactivate = async () => this.setState({activated:false})
    
    handleGoToLogin = () => {
        this.handleCloseModal()
        this.props.navigation.pop()
    }

    handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {activated, showSuccessModal} = this.state
        let title = 'Touch ID Activated'
        let subtext = 'Use your Touch ID to log in to ML Wallet without typing your username and password.'

        if(!activated) {
            title = 'Activate Touch ID'
            subtext = 'Use your Touch ID to enable ML Wallet instead of typing your username and password.'
        }

        return (
            <>
                <Screen>
                    <Prompt
                        visible={showSuccessModal}
                        title='Success'
                        message='You successfully activated your Touch ID. You can now use your Touch ID to Log in.'
                        onDismiss={this.handleCloseModal}
                        onConfirm={this.handleGoToLogin}
                        OkBtnLabel='Go to Login'
                    />

                    <Headline
                        title={title}
                        subtext={subtext}
                    />
                    
                    <View style={{alignItems:'center'}}>
                        <Icon name='fingerprint' size={Metrics.icon.jumbo} />
                    </View>
                </Screen>

                <Footer>
                    {!activated && <Button t='Activate' onPress={this.handleActivate} />}
                    {activated && <Button t='Deactivate' mode='outlined' style={{borderColor:Colors.brand}} onPress={this.handleDeactivate} />}
                </Footer>
            </>
        )
    }
}