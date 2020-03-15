import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, TextInput, Button, Prompt} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Mobile Number'
    }

    state = {
        mobile_no:this.props.user.mobile_no,
        processing:false,
        //showSuccessModal:false
    }

    handleChangeMobileNo = mobile_no => this.setState({mobile_no})

    handleSubmit = async () => {
        try {
            const {walletno, secquestion1, secquestion2, secquestion3} = this.props.user
            const {reasons} = this.props.navigation.state.params
            let {mobile_no, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            mobile_no = mobile_no.trim()

            if(!mobile_no) Say.some(_('8'))
            else {
                this.props.navigation.navigate('SecurityQuestion',{
                    questions:[
                        secquestion1,
                        secquestion2,
                        secquestion3
                    ],
                    func:async () => {
                        let res = await API.requestUpdateProfile({
                            walletno,
                            mobile_no,
                            reasons
                        })
        
                        if(res.error) Say.some(res.message)
                        else {
                            this.props.navigation.pop()
                            Say.ok('Your request to change your mobile number has been sent for approval. We will get back to you soon!')
                            //this.setState({showSuccessModal:true})
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

    //handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {mobile_no, processing, showSuccessModal} = this.state
        let ready = false

        if(mobile_no) ready = true

        return (
            <>
                {/*<Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message='Your request to change your mobile number has been sent for approval. We will get back to you soon!'
                    onDismiss={this.handleCloseModal}
                />*/}
                
                <Screen>
                    <Headline subtext='Please make sure to register an active mobile number' />

                    <TextInput
                        label='Mobile No'
                        value={mobile_no}
                        onChangeText={this.handleChangeMobileNo}
                        keyboardType='numeric'
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