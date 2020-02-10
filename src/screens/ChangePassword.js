import React from 'react'
import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native'
import {Text, Button, ButtonText, TextInput, Spacer, TopBuffer, Row, Prompt} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class ChangePassword extends React.Component {

    static navigationOptions = {
        title:'Change Password'
    }

    state = {
        old_password:'',
        new_password:'',
        confirm_password:'',
        show_old_password:false,
        show_new_password:false,
        show_confirm_password:false,
        showSuccessModal:false,
        processing:false
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

    handleCloseModal = () => this.setState({showSuccessModal:false})

    render() {

        const {old_password, new_password, confirm_password, show_old_password, show_new_password, show_confirm_password, showSuccessModal, processing} = this.state
        let ready = false

        if(old_password && new_password && confirm_password) ready = true

        return (
            <KeyboardAvoidingView style={style.container}>

                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message={"You've successfully saved your new Password"}
                    onDismiss={this.handleCloseModal}
                />

                <TextInput
                    label={'Current Password'}
                    value={old_password}
                    onChangeText={this.handleChangeOldPassword}
                    autoCapitalize='none'
                    secureTextEntry={show_old_password ? false : true}
                    rightContent={
                        <ButtonText color={Colors.gray} t={show_old_password ? 'Hide' : 'Show'} onPress={this.handleToggleOldPassword} />
                    }
                />
                <TextInput
                    label={'New Password'}
                    value={new_password}
                    onChangeText={this.handleChangeNewPassword}
                    autoCapitalize='none'
                    secureTextEntry={show_new_password ? false : true}
                    rightContent={
                        <ButtonText color={Colors.gray} t={show_new_password ? 'Hide' : 'Show'} onPress={this.handleToggleNewPassword} />
                    }
                />

                <View style={style.error}>
                    <Row>
                        <Icon name='ios-checkmark-circle' color={Colors.success} size={Metrics.icon.sm} />
                        <Spacer h sm />
                        <Text mute>Minimum of 8 characters in length</Text>
                    </Row>
                    <Spacer xs />
                    <Row>
                        <Icon name='ios-close-circle' color={Colors.brand} size={Metrics.icon.sm} />
                        <Spacer h sm />
                        <Text mute>At least one number</Text>
                    </Row>
                    <Spacer xs />
                    <Row>
                        <Icon name='ios-close-circle' color={Colors.brand} size={Metrics.icon.sm} />
                        <Spacer h sm />
                        <Text mute>At least one special character (!@#$%)</Text>
                    </Row>
                </View>

                <TextInput
                    label={'Re-Type New Password'}
                    value={confirm_password}
                    onChangeText={this.handleChangeConfirmPassword}
                    autoCapitalize='none'
                    secureTextEntry={show_confirm_password ? false : true}
                    rightContent={
                        <ButtonText color={Colors.gray} t={show_confirm_password ? 'Hide' : 'Show'} onPress={this.handleToggleConfirmPassword} />
                    }
                />
                
                <View style={style.footer}>
                    <Button disabled={!ready} t={_('9')} onPress={this.handleSubmit} loading={processing} />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.md
    },
    error: {
        marginVertical:Metrics.md
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default ChangePassword