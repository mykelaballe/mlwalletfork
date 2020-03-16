import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text, Button, Radio, Spacer, Row} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'
import {RadioButton} from 'react-native-paper'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Gender'
    }

    state = {
        gender:this.props.user.gender == 'M' ? 'Male' : 'Female',
        processing:false
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
                Say.ok('Your request to change your gender has been sent for approval. We will get back to you soon!')
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {gender, processing} = this.state

        return (
            <>
                <Screen>
                    <Headline subtext='Please select your gender' />

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