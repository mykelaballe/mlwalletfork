import React from 'react'
import {StyleSheet} from 'react-native'
import {Screen, Footer, Headline, Button, ButtonText, Spacer, TextInputFlat, Row, SignUpStepsTracker} from '../components'
import {Metrics} from '../themes'
import {_, Consts, Say, Func} from '../utils'
import {API} from '../services'

export default class Scrn extends React.Component {

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
        latitude:'',
        longitude:'',
        location:'',
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

    handleSubmit = async () => {
        const {processing, reprocessing} = this.state

        if(processing || reprocessing) return false

        let latitude = Consts.defaultLatitude, longitude = Consts.defaultLongitude, location = ''

        if(Func.isCheckLocation('signup')) {
            const locationRes = await Func.getLocation()
            if(!locationRes.error) {
                latitude = locationRes.data.latitude
                longitude = locationRes.data.longitude
            }
        }

        this.setState({
            latitude,
            longitude,
            location,
            processing:true
        },this.submit)
    }

    handleResend = async () => {
        const {mobile_no} = this.props.navigation.state.params
        const {processing, reprocessing} = this.state

        if(processing || reprocessing) return false

        const locationRes = await Func.getLocation()
        if(locationRes.error) return false

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
            Say.err(err)
        }

        this.setState({reprocessing:false})
    }

    submit = async () => {
        const {username, password, pincode, firstname, middlename, lastname, suffix, gender, birthday, email, nationality, source_of_income, natureofwork, house, street, country, province, provincecode, city, barangay, zip_code, ids, question1, answer1, question2, answer2, question3, answer3, mobile_no, idType, validID, profilepic} = this.props.navigation.state.params
        const {digit1, digit2, digit3, digit4, digit5, digit6, latitude, longitude, location} = this.state

        try {

            let otp = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`

            if(!otp) Say.warn(_('8'))
            else {
                let otpRes = await API.validateOTP({
                    _mobile_no:mobile_no,
                    _pin:otp
                })

                if(!otpRes.error) {

                    //let custIDRes = await API.requestCustID()

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
                        natureofwork,
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
                        idType,
                        validID,
                        profilepic,
                        latitude,
                        longitude,
                        location,
                        //custid:custIDRes.custid || null
                    }

                    let res = await API.register(payload)

                    if(!res.error) {
                        this.props.navigation.replace('SignUpSuccess',{
                            idType,
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
            Say.err(err)
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

        if(reprocessing) ready = false

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