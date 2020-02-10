import React from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Footer, Headline, Text, Button, ButtonText, Spacer, TextInputFlat, Row, SignUpStepsTracker} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Verification'
    }

    state = {
        digit1:'1',
        digit2:'2',
        digit3:'3',
        digit4:'4',
        digit5:'5',
        digit6:'6',
        processing:false,
        reprocessing:false
    }

    handleChangeDigit1 = digit1 => this.setState({digit1})
    
    handleChangeDigit2 = digit2 => this.setState({digit2})

    handleChangeDigit3 = digit3 => this.setState({digit3})

    handleChangeDigit4 = digit4 => this.setState({digit4})

    handleChangeDigit5 = digit5 => this.setState({digit5})

    handleChangeDigit6 = digit6 => this.setState({digit6})

    handleResendOTP = async () => this.setState({reprocessing:true})

    handleFocusDigit2 = () => this.refs.digit2.focus()

    handleFocusDigit3 = () => this.refs.digit3.focus()

    handleFocusDigit4 = () => this.refs.digit4.focus()

    handleFocusDigit5 = () => this.refs.digit5.focus()

    handleFocusDigit6 = () => this.refs.digit6.focus()

    handleSubmit = () => {
        try {
            this.props.navigation.navigate('SignUpSuccess')
        }
        catch(err) {

        }
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
                        />

                        <TextInputFlat
                            ref='digit6'
                            style={style.input}
                            value={digit6}
                            onChangeText={this.handleChangeDigit6}
                            keyboardType='numeric'
                            maxLength={1}
                        />
                    </Row>

                    <Spacer lg />

                    <ButtonText t='Resend Verification Code' onPress={this.handleResendOTP} loading={reprocessing} />
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t='Next' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const style = StyleSheet.create({
    input: {
        marginHorizontal:Metrics.xs,
        textAlign:'center',
        alignItems:'center',
        fontWeight:'bold'
    }
})

export default Scrn