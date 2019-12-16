import React from 'react'
import {StyleSheet, View, Image, ScrollView, KeyboardAvoidingView} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer, Row, Ripple} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const image_res = require('../res/mobile.png')

class ChangeMobileNumberScreen extends React.Component {

    static navigationOptions = {
        title:_('55')
    }

    state = {
        old_number:'',
        new_number:'',
        code:'',
        isCodeRequested:false
    }

    handleRequestCode = async () => {
        let {new_number} = this.state

        try {
            new_number = new_number.trim()

            if(new_number == '') Say.some(_('8'))
            else {
                this.setState({isCodeRequested:true})
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleSubmit = async () => {
        let {new_number, code} = this.state

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

    handleChangeNumber = new_number => this.setState({new_number})

    handleChangeCode = code => this.setState({code})

    handleRetypeNumber = () => this.setState({isCodeRequested:false})

    render() {

        const {old_number, new_number, code, isCodeRequested} = this.state

        return (
            <KeyboardAvoidingView style={style.container}>

                <TopBuffer />

                <View style={{alignItems:'center'}}>
                    <Image source={image_res} style={style.image} resizeMode='contain' />
                </View>

                <Spacer />

                {!isCodeRequested &&
                <>
                    <Text center>{_('76')}</Text>
                    <TextInput
                        label={_('74')}
                        value={new_number}
                        onChangeText={this.handleChangeNumber}
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
                        <Ripple onPress={this.handleRetypeNumber}>
                            <Text>{_('79')}</Text>
                        </Ripple>
                    </Row>

                    <Spacer />

                    <Button t={_('9')} onPress={this.handleSubmit} />
                </>
                }
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.xl
    },
    image: {
        width:200,
        height:200
    }
})

export default ChangeMobileNumberScreen