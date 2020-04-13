import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, Button, Icon} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    state = {
        processing:false
    }

    handleActivate = async () => {
        const {processing} = this.state

        if(processing) return false

        try {
            this.setState({processing:true})

            let res = await API.checkDeviceId()

            if(!res.error) {
                this.props.setIsUsingTouchID(true)
                Say.ok('You successfully activated your Touch ID. You can now use your Touch ID to Log in.')
            }
            else {
                Say.warn(res.message)
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})     
    }

    handleDeactivate = async () => this.props.setIsUsingTouchID(false)
    
    handleGoToLogin = () => {
        this.handleCloseModal()
        this.props.navigation.pop()
    }

    render() {

        const {isUsingTouchID} = this.props
        const {processing} = this.state
        let title = 'Touch ID Activated'
        let subtext = 'Use your Touch ID to log in to ML Wallet without typing your username and password.'

        if(!isUsingTouchID) {
            title = 'Activate Touch ID'
            subtext = 'Scan your fingerprint for faster log-ins.'
        }

        return (
            <>
                <Screen>
                    <Headline
                        title={title}
                        subtext={subtext}
                    />
                    
                    <View style={{alignItems:'center'}}>
                        <Icon name='fingerprint' size={Metrics.icon.jumbo} />
                    </View>
                </Screen>

                <Footer>
                    {!isUsingTouchID && <Button t='Activate' onPress={this.handleActivate} loading={processing} />}
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
    setIsUsingTouchID:isUsing => dispatch(Creators.setIsUsingTouchID(isUsing))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)