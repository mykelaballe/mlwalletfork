import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Button} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Email Address'
    }

    state = {
        emailaddress:this.props.user.emailaddress,
        processing:false
    }

    handleChangeEmail = emailaddress => this.setState({emailaddress})

    handleSubmit = async () => {
        try {
            const {walletno, secquestion1, secquestion2, secquestion3} = this.props.user
            const {reasons} = this.props.navigation.state.params
            let {emailaddress, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            emailaddress = emailaddress.trim()

            if(!emailaddress) Say.some(_('8'))
            else if(!Func.hasEmailSpecialCharsOnly(emailaddress)) Say.warn(Consts.error.notAllowedChar)
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
                            email:emailaddress,
                            reasons
                        })
        
                        if(res.error) Say.warn(res.message)
                        else {
                            this.props.updateInfo({emailaddress})
                            this.props.navigation.pop()
                            Say.ok('Your email has been successfully updated')
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

        const {emailaddress, processing} = this.state
        let ready = false

        if(emailaddress) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please make sure to register an updated email address' />

                    <TextInput
                        label='Email'
                        value={emailaddress}
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

const mapDispatchToProps = dispatch => ({
    updateInfo: newInfo => dispatch(Creators.updateUserInfo(newInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)