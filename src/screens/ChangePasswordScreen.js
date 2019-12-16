import React from 'react'
import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const image_res = require('../res/password.png')

class ChangePasswordScreen extends React.Component {

    static navigationOptions = {
        title:_('53')
    }

    state = {
        old_password:'',
        new_password:'',
        confirm_password:''
    }

    handleSubmit = async () => {
        let {old_password, new_password, confirm_password} = this.state

        try {
            old_password = old_password.trim()
            new_password = new_password.trim()
            confirm_password = confirm_password.trim()

            if(old_password == '' || new_password == '' || confirm_password == '') Say.some(_('8'))
            else if(new_password != confirm_password) Say.warn(_('50'))
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

    render() {

        const {old_password, new_password, confirm_password} = this.state

        return (
            <KeyboardAvoidingView style={style.container}>

                <TopBuffer />

                <View style={style.imageWrapper}>
                    <Image source={image_res} style={style.image} resizeMode='contain' />
                    <Spacer sm />
                    <Text mute center>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                </View>

                <TextInput
                    label={_('47')}
                    value={old_password}
                    onChangeText={this.handleChangeOldPassword}
                    autoCapitalize='none'
                    secureTextEntry
                />

                <TextInput
                    label={_('48')}
                    value={new_password}
                    onChangeText={this.handleChangeNewPassword}
                    autoCapitalize='none'
                    secureTextEntry
                />

                <TextInput
                    label={_('49')}
                    value={confirm_password}
                    onChangeText={this.handleChangeConfirmPassword}
                    autoCapitalize='none'
                    secureTextEntry
                />

                <Spacer />

                <Button t={_('9')} onPress={this.handleSubmit} />
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
    }
})

export default ChangePasswordScreen