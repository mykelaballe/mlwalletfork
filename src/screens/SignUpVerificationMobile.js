import React from 'react'
import {Screen, Footer, Headline, Button, TextInput, SignUpStepsTracker} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Verification'
    }

    state = {
        mobile_no:Consts.mobilePrefixPH,
        processing:false
    }

    handleChangeMobile = mobile_no => this.setState({mobile_no})

    handleSubmit = async () => {
        let {mobile_no, processing} = this.state

        if(processing) return false

        this.setState({processing:true})

        try {
            mobile_no = mobile_no.trim()

            mobile_no = Func.formatToPHMobileNumber(mobile_no)

            if(!mobile_no) Say.some(_('8'))
            else if(!Func.isPHMobileNumber(mobile_no)) Say.warn(Consts.error.mobile)
            else {

                let res = await API.requestOTP({
                    _mobile_no:mobile_no
                })
    
                if(res.error) Say.warn(res.message)
                else {
                    Say.ok(_('86'))
                    this.props.navigation.navigate('SignUpVerificationOTP',{
                        ...this.props.navigation.state.params,
                        mobile_no
                    })
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {mobile_no, processing} = this.state
        let ready = false

        if(mobile_no) ready = true

        return (
            <>
                <Screen>
                    <SignUpStepsTracker step={5} />

                    <Headline subtext='Please enter your mobile number for the verification code.' />

                    <TextInput
                        editable={!processing}
                        autoFocus
                        label={'Mobile No.'}
                        value={mobile_no}
                        onChangeText={this.handleChangeMobile}
                        keyboardType='numeric'
                        mask={Consts.mobileMaskPH}
                    />
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t={_('62')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}