import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, Text, Button, Icon, Prompt} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    state = {
        showSuccessModal:false
    }

    handleActivate = async () => {
        this.props.setIsUsingTouchID(true)
        this.setState({showSuccessModal:true})
    }

    handleDeactivate = async () => this.props.setIsUsingTouchID(false)
    
    handleGoToLogin = () => {
        this.handleCloseModal()
        this.props.navigation.pop()
    }

    handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {isUsingTouchID} = this.props
        const {showSuccessModal} = this.state
        let title = 'Touch ID Activated'
        let subtext = 'Use your Touch ID to log in to ML Wallet without typing your username and password.'

        if(!isUsingTouchID) {
            title = 'Activate Touch ID'
            subtext = 'Scan your fingerprint for faster log-ins.'
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
                    {!isUsingTouchID && <Button t='Activate' onPress={this.handleActivate} />}
                    {isUsingTouchID && <Button t='Deactivate' mode='outlined' style={{borderColor:Colors.brand}} onPress={this.handleDeactivate} />}
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    isUsingTouchID: state.app.isUsingTouchID
})

const mapDispatchToProps = dispatch => ({
    setIsUsingTouchID:isUsingTouchID => dispatch(Creators.setIsUsingTouchID(isUsingTouchID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)