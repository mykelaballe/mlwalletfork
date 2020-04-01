import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Button} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit My Mobile Number'
    }

    state = {
        mobileno:this.props.user.mobileno,
        processing:false
    }

    handleChangeMobileNo = mobileno => this.setState({mobileno})

    handleSubmit = async () => {
        try {
            const {walletno, secquestion1, secquestion2, secquestion3} = this.props.user
            const {reasons} = this.props.navigation.state.params
            let {mobileno, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            mobileno = mobileno.trim()

            if(!mobileno) Say.some(_('8'))
            else if(!Func.isNumbersOnly(mobileno)) Say.warn(Consts.error.onlyNumbers)
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
                            mobile_no:mobileno,
                            reasons
                        })
        
                        if(res.error) Say.warn(res.message)
                        else {
                            this.props.updateInfo({mobileno})
                            this.props.navigation.pop()
                            Say.ok('Your mobile number has been successfully updated')
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

        const {mobileno, processing} = this.state
        let ready = false

        if(mobileno) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please make sure to register an active mobile number' />

                    <TextInput
                        label='Mobile No'
                        value={mobileno}
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

const mapDispatchToProps = dispatch => ({
    updateInfo: newInfo => dispatch(Creators.updateUserInfo(newInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)