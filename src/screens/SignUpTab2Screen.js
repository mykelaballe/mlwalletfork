import React from 'react'
import {StyleSheet, View, ScrollView, Picker} from 'react-native'
import {Text, Button, TextInput, Row, Spacer, HR, Ripple} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'

class SignUpTab2Screen extends React.Component {

    state = {
        mobile_number:'',
        code:'',
        isCodeRequested:false
    }

    handleNext = () => {
        let {mobile_number, code} = this.state
        
        try {

            code = code.trim()

            if(code == '') Say.some('Please enter code')
            else this.props.navigation.navigate('SignUpTab3')
        }
        catch(err) {
            Say.err('Something went wrong')
        }
    }

    handlePrev = () => this.props.navigation.navigate('SignUpTab1')

    handleRequestCode = async () => {
        let {mobile_number} = this.state

        try {
            mobile_number = mobile_number.trim()

            if(mobile_number == '') Say.some(_('8'))
            else {
                this.setState({isCodeRequested:true})
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleSubmit = async () => {
        let {mobile_number, code} = this.state

        try {
            code = code.trim()

            if(code == '') Say.some(_('8'))
            else {
                Say.ok('Request code successfully sent. Please check your inbox.')
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleResendCode = () => this.handleSubmit()

    handleChangeMobileNumber = mobile_number => this.setState({mobile_number})

    handleChangeCode = code => this.setState({code})

    handleRequestAgain = () => this.setState({isCodeRequested:false})

    render() {

        const {mobile_number, code, isCodeRequested} = this.state

        return (
            <ScrollView contentContainerStyle={{flex:1}}>
                <View style={{backgroundColor:Colors.dark,padding:Metrics.rg}}>
                    <Text center b light>One Time PIN</Text>
                </View>

                <Spacer />

                <View style={{flex:1,padding:Metrics.md}}>
                    {!isCodeRequested &&
                    <>
                        <Text center>{_('76')}</Text>
                        <TextInput
                            label={_('74')}
                            value={mobile_number}
                            onChangeText={this.handleChangeMobileNumber}
                            keyboardType='numeric'
                        />

                        <Spacer />

                        <Button t={_('73')} onPress={this.handleRequestCode} />
                    </>
                    }

                    {isCodeRequested &&
                    <>
                        <Text center>{_('77')}</Text>
                        <TextInput
                            label={_('75')}
                            value={code}
                            onChangeText={this.handleChangeCode}
                            keyboardType='numeric'
                        />

                        <Spacer />

                        <Row bw>
                            <Ripple onPress={this.handleResendCode}>
                                <Text>{_('78')}</Text>
                            </Ripple>
                            <Ripple onPress={this.handleRequestAgain}>
                                <Text>{_('79')}</Text>
                            </Ripple>
                        </Row>
                    </>
                    }

                    <Row bw style={{flex:1,alignItems:'flex-end'}}>
                        <Button dark  t='Previous' onPress={this.handlePrev} />
                        <Button dark t='Next' onPress={this.handleNext} />
                    </Row>
                </View>
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({

})

export default SignUpTab2Screen