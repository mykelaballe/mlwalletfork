import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text, Button, Prompt, Radio, Spacer, Row} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'
import {RadioButton} from 'react-native-paper'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Gender'
    }

    state = {
        gender:this.props.user.gender,
        processing:false,
        showSuccessModal:false
    }

    handleSelectGender = gender => this.setState({gender})

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {gender, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            let res = await API.requestUpdateProfile({
                walletno,
                gender
            })

            if(res.error) Say.some(res.message)
            else {
                this.setState({showSuccessModal:true})
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {gender, processing, showSuccessModal} = this.state

        return (
            <>
                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message='Your request to change your gender has been sent for approval. We will get back to you soon!'
                    onDismiss={this.handleCloseModal}
                />
                
                <Screen>
                    <Headline subtext='Please make sure to enter all the correct details' />

                    <Text md mute>Gender</Text>
                    <RadioButton.Group onValueChange={this.handleSelectGender} value={gender}>
                        <Row>
                            <Radio value='Male' label={_('43')} />
                            <Spacer h lg />
                            <Radio value='Female' label={_('44')} />
                        </Row>
                    </RadioButton.Group>
                </Screen>

                <Footer>
                    <Button t={'Save Changes'} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)