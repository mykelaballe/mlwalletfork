import React from 'react'
import {StyleSheet} from 'react-native'
import {Screen, Footer, Headline, Button, ButtonText, Spacer, TextInputFlat, Row, SignUpStepsTracker} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
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
        has_requested:false,
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

    handleRequest = () => this.setState({processing:true},this.submit)

    handleRequestAgain = () => this.setState({reprocessing:true},this.submit)

    submit = async () => {
        const {username, password, firstname, middlename, lastname, suffix, birthday, email, nationality, source_of_income, house, street, country, province, city, barangay, zip_code, ids, question1, answer1, question2, answer2, question3, answer3, mobile_no} = this.props.navigation.state.params
        const {digit1, digit2, digit3, digit4, digit5, digit6, processing, reprocessing} = this.state

        try {
            let otp = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`

            if(!otp) Say.some(_('8'))
            else {
                let otpRes = await API.requestOTP({otp})

                if(!otpRes.error) {

                    let payload = {
                        username,
                        password,
                        firstname,
                        middlename,
                        lastname,
                        suffix,
                        birthday,
                        email,
                        nationality,
                        source_of_income,
                        house,
                        street,
                        country,
                        province,
                        city,
                        barangay,
                        zip_code,
                        ids,
                        question1,
                        answer1,
                        question2,
                        answer2,
                        question3,
                        answer3,
                        mobile_no
                    }

                    let res = await API.register(payload)

                    if(!res.error) {
                        this.props.navigation.navigate('SignUpSuccess',{
                            ...payload,
                            ...res
                        })
                    }
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            processing:false,
            has_requested:true,
            reprocessing:false
        })
    }

    render() {

        const {digit1, digit2, digit3, digit4, digit5, digit6, processing, has_requested, reprocessing} = this.state
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

                    {has_requested &&
                    <ButtonText disabled={!ready} t='Resend Verification Code' onPress={this.handleRequestAgain} loading={reprocessing} />
                    }
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t={_('62')} onPress={this.handleRequest} loading={processing} />
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