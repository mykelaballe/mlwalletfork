import React from 'react'
import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native'
import {Text, Button, ButtonText, TextInput, Spacer, TopBuffer, Row} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const image_res = require('../res/password.png')

class ChangePassword extends React.Component {

    static navigationOptions = {
        title:_('53')
    }

    state = {
        old_password:'',
        new_password:'',
        confirm_password:'',
        show_old_password:false,
        show_new_password:false,
        show_confirm_password:false
    }

    handleSubmit = async () => {
        let {old_password, new_password, confirm_password} = this.state

        try {
            old_password = old_password.trim()
            new_password = new_password.trim()
            confirm_password = confirm_password.trim()

            if(old_password == '' || new_password == '' || confirm_password == '') Say.some(_('8'))
            else if(new_password != confirm_password) Say.warn('Passwords do not match')
            else {
                Say.ok(_('14'))
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleChangeOldPassword = old_password => this.setState({old_password})

    handleChangeNewPassword = new_password => this.setState({new_password})

    handleChangeConfirmPassword = confirm_password => this.setState({confirm_password})

    handleToggleOldPassword = () => this.setState(prevState => ({show_old_password:!prevState.show_old_password}))

    handleToggleNewPassword = () => this.setState(prevState => ({show_new_password:!prevState.show_new_password}))

    handleToggleConfirmPassword = () => this.setState(prevState => ({show_confirm_password:!prevState.show_confirm_password}))

    render() {

        const {old_password, new_password, confirm_password, show_old_password, show_new_password, show_confirm_password} = this.state

        return (
            <KeyboardAvoidingView style={style.container}>

                <TopBuffer sm />

                {/*<View style={style.imageWrapper}>
                    <Image source={image_res} style={style.image} resizeMode='contain' />
                    <Spacer sm />
                    <Text mute center>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                </View>*/}

                <Row bw>
                    <TextInput
                        style={style.input}
                        label={'Current Password'}
                        value={old_password}
                        onChangeText={this.handleChangeOldPassword}
                        autoCapitalize='none'
                        secureTextEntry={show_old_password ? false : true}
                    />
                    <ButtonText t={show_old_password ? 'Hide' : 'Show'} onPress={this.handleToggleOldPassword} />
                </Row>
                
                <Row bw>
                    <TextInput
                        style={style.input}
                        label={'New Password'}
                        value={new_password}
                        onChangeText={this.handleChangeNewPassword}
                        autoCapitalize='none'
                        secureTextEntry={show_new_password ? false : true}
                    />
                    <ButtonText t={show_new_password ? 'Hide' : 'Show'} onPress={this.handleToggleNewPassword} />
                </Row>
                
                <Row bw>
                    <TextInput
                        style={style.input}
                        label={'Re-Type New Password'}
                        value={confirm_password}
                        onChangeText={this.handleChangeConfirmPassword}
                        autoCapitalize='none'
                        secureTextEntry={show_confirm_password ? false : true}
                    />
                    <ButtonText t={show_confirm_password ? 'Hide' : 'Show'} onPress={this.handleToggleConfirmPassword} />
                </Row>
                
                <View style={style.footer}>
                    <Button t={_('9')} onPress={this.handleSubmit} />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.xl
    },
    imageWrapper: {
        alignItems:'center'
    },
    image: {
        width:250,
        height:110
    },
    input: {
        flex:1
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default ChangePassword