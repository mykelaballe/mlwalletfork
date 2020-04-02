import React from 'react'
import {StyleSheet} from 'react-native'
import {Screen, Footer, Headline, Button, ButtonText, Spacer, TextInputFlat, Row, SignUpStepsTracker} from '../components'
import {Metrics} from '../themes'
import {_, Say, Consts} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Verification'
    }

    state = {
        digit1:'',
        digit2:'',
        digit3:'',
        digit4:'',
        digit5:'',
        digit6:'',
        processing:false,
        reprocessing:false
    }

    handleChangeDigit1 = digit1 => {
        this.setState({digit1})
        if(digit1) this.refs.digit2.focus()
    }
    
    handleChangeDigit2 = digit2 => {
        this.setState({digit2})
        if(digit2) this.refs.digit3.focus()
    }

    handleChangeDigit3 = digit3 => {
        this.setState({digit3})
        if(digit3) this.refs.digit4.focus()
    }

    handleChangeDigit4 = digit4 => {
        this.setState({digit4})
        if(digit4) this.refs.digit5.focus()
    }

    handleChangeDigit5 = digit5 => {
        this.setState({digit5})
        if(digit5) this.refs.digit6.focus()
    }

    handleChangeDigit6 = digit6 => this.setState({digit6})

    handleResendOTP = async () => this.setState({reprocessing:true})

    handleFocusDigit2 = () => this.refs.digit2.focus()

    handleFocusDigit3 = () => this.refs.digit3.focus()

    handleFocusDigit4 = () => this.refs.digit4.focus()

    handleFocusDigit5 = () => this.refs.digit5.focus()

    handleFocusDigit6 = () => this.refs.digit6.focus()

    handleSubmit = () => {
        const {processing, reprocessing} = this.state
        if(processing || reprocessing) return false
        this.setState({processing:true},this.submit)
    }

    handleResend = async () => {
        const {mobile_no} = this.props.navigation.state.params
        const {processing, reprocessing} = this.state

        if(processing || reprocessing) return false

        try {
            this.setState({reprocessing:true})

            let res = await API.requestOTP({
                _mobile_no:mobile_no
            })

            if(res.error) Say.warn(res.message)
            else {
                Say.ok(_('86'))
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({reprocessing:false})
    }

    submit = async () => {
        const {username, password, pincode, firstname, middlename, lastname, suffix, gender, birthday, email, nationality, source_of_income, house, street, country, province, provincecode, city, barangay, zip_code, ids, question1, answer1, question2, answer2, question3, answer3, mobile_no, validID, profilepic} = this.props.navigation.state.params
        const {digit1, digit2, digit3, digit4, digit5, digit6} = this.state

        try {

            let otp = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`

            if(!otp) Say.warn(_('8'))
            else {
                let otpRes = await API.validateOTP({
                    _mobile_no:mobile_no,
                    _pin:otp
                })

                if(!otpRes.error) {

                    let payload = {
                        uname:username,
                        password,
                        pincode,
                        fname:firstname,
                        mname:middlename,
                        lname:lastname,
                        suffix,
                        gender:gender == 'Male' ? 'M' : 'F',
                        bdate:birthday,
                        emailadd:email,
                        nationality,
                        sourceOfIncome:source_of_income,
                        houseno:house,
                        street,
                        country,
                        province,
                        provincecode,
                        city,
                        barangay,
                        zipcode:zip_code,
                        secquestion1:question1,
                        secanswer1:answer1,
                        secquestion2:question2,
                        secanswer2:answer2,
                        secquestion3:question3,
                        secanswer3:answer3,
                        mobileno:mobile_no,
                        validID,
                        profilepic
                        //profilepic:'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',
                        //validID:'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'
                    }

                    let res = await API.register(payload)

                    if(!res.error) {
                        this.props.navigation.replace('SignUpSuccess',{
                            ...payload,
                            ...res.data
                        })
                    }
                    else {
                        Say.warn(res.message)
                    }
                }
                else {
                    Say.warn(otpRes.message)
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            processing:false,
            reprocessing:false
        })
    }

    render() {

        const {digit1, digit2, digit3, digit4, digit5, digit6, processing, reprocessing} = this.state
        let ready = false

        if(`${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`.length >= 6) {
            ready = true
        }

        return (
            <>
                <Screen>
                    <SignUpStepsTracker step={5} />

                    <Headline
                        title='One Time Pin'
                        subtext='Enter the 6-digit code sent to your mobile number.'
                    />

                    <Row ar style={{paddingHorizontal:Metrics.lg}}>
                        <TextInputFlat
                            ref='digit1'
                            style={style.input}
                            value={digit1}
                            onChangeText={this.handleChangeDigit1}
                            onSubmitEditing={this.handleFocusDigit2}
                            keyboardType='numeric'
                            maxLength={1}
                            returnKeyType='next'
                            selectTextOnFocus
                        />

                        <TextInputFlat
                            ref='digit2'
                            style={style.input}
                            value={digit2}
                            onChangeText={this.handleChangeDigit2}
                            onSubmitEditing={this.handleFocusDigit3}
                            keyboardType='numeric'
                            maxLength={1}
                            returnKeyType='next'
                            selectTextOnFocus
                        />

                        <TextInputFlat
                            ref='digit3'
                            style={style.input}
                            value={digit3}
                            onChangeText={this.handleChangeDigit3}
                            onSubmitEditing={this.handleFocusDigit4}
                            keyboardType='numeric'
                            maxLength={1}
                            returnKeyType='next'
                            selectTextOnFocus
                        />

                        <TextInputFlat
                            ref='digit4'
                            style={style.input}
                            value={digit4}
                            onChangeText={this.handleChangeDigit4}
                            onSubmitEditing={this.handleFocusDigit5}
                            keyboardType='numeric'
                            maxLength={1}
                            returnKeyType='next'
                            selectTextOnFocus
                        />

                        <TextInputFlat
                            ref='digit5'
                            style={style.input}
                            value={digit5}
                            onChangeText={this.handleChangeDigit5}
                            onSubmitEditing={this.handleFocusDigit6}
                            keyboardType='numeric'
                            maxLength={1}
                            returnKeyType='next'
                            selectTextOnFocus
                        />

                        <TextInputFlat
                            ref='digit6'
                            style={style.input}
                            value={digit6}
                            onChangeText={this.handleChangeDigit6}
                            keyboardType='numeric'
                            maxLength={1}
                            selectTextOnFocus
                        />
                    </Row>

                    <Spacer lg />

                    <ButtonText t='Resend Verification Code' onPress={this.handleResend} loading={reprocessing} />
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t={_('62')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const style = StyleSheet.create({
    input: {
        marginHorizontal:Metrics.xs,
        textAlign:'center',
        fontWeight:'bold'
    }
})

export default Scrn