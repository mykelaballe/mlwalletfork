import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, TextInput, Button} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Email Address'
    }

    state = {
        email:this.props.user.emailaddress,
        processing:false
    }

    handleChangeEmail = email => this.setState({email})

    handleSubmit = async () => {
        try {
            const {walletno, secquestion1, secquestion2, secquestion3} = this.props.user
            const {reasons} = this.props.navigation.state.params
            let {email, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            email = email.trim()

            if(!email) Say.some(_('8'))
            else {
                this.props.navigation.navigate('SecurityQuestion',{
                    walletno,
                    questions:[
                        secquestion1,
                        secquestion2,
                        secquestion3
                    ],
                    func:async () => {
                        let res = await API.requestUpdateProfile({
                            walletno,
                            email,
                            reasons
                        })
        
                        if(res.error) Say.warn(res.message)
                        else {
                            this.props.navigation.pop()
                            Say.ok('Your request to change your email address has been sent for approval. We will get back to you soon!')
                        }
                    }
                })
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {email, processing} = this.state
        let ready = false

        if(email) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please make sure to register an updated email address' />

                    <TextInput
                        label='Email'
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t={'Save Changes'} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)