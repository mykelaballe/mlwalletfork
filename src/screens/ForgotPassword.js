import React from 'react'
import {View, StyleSheet, ImageBackground, Image} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {ScrollView, Text, Button, ButtonText, Spacer, TextInput, Row, Card} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'
import {Portal, Modal} from 'react-native-paper'

class ForgotPassword extends React.Component {

    state = {
        mobile_number:'',
        request_sent:false,
        digit1:'',
        digit2:'',
        digit3:'',
        digit4:'',
        digit5:'',
        digit6:'',
        processing:false,
        success:false
    }

    handleChangeMobile = mobile_number => this.setState({mobile_number})

    handleChangeCode1 = digit1 => this.setState({digit1})

    handleChangeCode2 = digit2 => this.setState({digit2})

    handleChangeCode3 = digit3 => this.setState({digit3})

    handleChangeCode4 = digit4 => this.setState({digit4})

    handleChangeCode5 = digit5 => this.setState({digit5})

    handleChangeCode6 = digit6 => this.setState({digit6})

    handleResend = () => this.handleProceed()

    handleProceed = () => {
        let {request_sent} = this.state

        if(request_sent) this.submitCode()
        else this.submitNumber()
    }

    handleGoToLogin = () => {
        this.setState({
            success:false
        },() => this.props.navigation.pop())
    }

    submitNumber = async () => {
        let {mobile_number} = this.state
        
        mobile_number = mobile_number.trim()

        if(mobile_number == '') Say.some('Please enter your mobile number')
        else {
            let code = '320851'
            this.setState({
                request_sent:true,
                digit1:code[0],
                digit2:code[1],
                digit3:code[2],
                digit4:code[3],
                digit5:code[4],
                digit6:code[5],
            })
        }
    }

    submitCode = async () => {
        this.setState({
            request_sent:false,
            digit1:'',
            digit2:'',
            digit3:'',
            digit4:'',
            digit5:'',
            digit6:'',
            success:true
        })
    }

    render() {

        const {mobile_number, request_sent, digit1, digit2, digit3, digit4, digit5, digit6, processing, success} = this.state

        return (
            <ScrollView style={{padding:Metrics.xl}} contentContainerStyle={{flex:1}}>
                <Portal>
                    <Modal visible={success} onDismiss={this.handleGoToLogin}>
                        <View style={{paddingHorizontal:Metrics.lg}}>
                            <Card style={{padding:Metrics.lg}}>
                                <Text b xl center>Success</Text>
                                <Spacer sm />
                                <Text mute center>You've successfully reset your password. Go back to login to continue using ML Wallet.</Text>
                                <Spacer />
                                <Spacer md />
                                <Button t='Back to Login' onPress={this.handleGoToLogin} />
                            </Card>
                        </View>
                    </Modal>
                </Portal>

                <View>

                    <Text b xl center>{request_sent ? 'Verification Code' : 'Forgot Password'}</Text>
                    <Spacer sm />
                    <Text center mute>{request_sent ? 'Enter the 6-digit verification code sent to your mobile number.' : 'Input your mobile number to receive a verification code for resetting your password.'}</Text>

                    <Spacer />

                    {!request_sent &&
                    <TextInput
                        label={'Mobile no.'}
                        value={mobile_number}
                        onChangeText={this.handleChangeMobile}
                        keyboardType='numeric'
                    />
                    }

                    {request_sent &&
                    <>
                        <Row ar>
                            <TextInput
                                value={digit1}
                                onChangeText={this.handleChangeCode1}
                                keyboardType='numeric'
                            />
                            <TextInput
                                value={digit2}
                                onChangeText={this.handleChangeCode2}
                                keyboardType='numeric'
                            />
                            <TextInput
                                style={{fontWeight:'bold'}}
                                value={digit3}
                                onChangeText={this.handleChangeCode3}
                                keyboardType='numeric'
                            />
                            <TextInput
                                value={digit4}
                                onChangeText={this.handleChangeCode4}
                                keyboardType='numeric'
                            />
                            <TextInput
                                value={digit5}
                                onChangeText={this.handleChangeCode5}
                                keyboardType='numeric'
                            />
                            <TextInput
                                value={digit6}
                                onChangeText={this.handleChangeCode6}
                                keyboardType='numeric'
                            />
                        </Row>
                        <Spacer />
                        <ButtonText t='Resend Verification Code' onPress={this.handleResend} />
                    </>
                    }
                </View>

                <View style={{flex:1,justifyContent:'flex-end'}}>
                    <Button t='Proceed' onPress={this.handleProceed} />
                </View>
            </ScrollView>
        )
    }
}

export default ForgotPassword