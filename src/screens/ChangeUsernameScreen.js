import React from 'react'
import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const image_res = require('../res/profile.png')

class ChangeUsernameScreen extends React.Component {

    static navigationOptions = {
        title:_('46')
    }

    state = {
        old_username:'',
        new_username:'',
        confirm_username:''
    }

    handleSubmit = async () => {
        let {old_username, new_username, confirm_username} = this.state

        try {
            old_username = old_username.trim()
            new_username = new_username.trim()
            confirm_username = confirm_username.trim()

            if(old_username == '' || new_username == '' || confirm_username == '') Say.some(_('8'))
            else if(old_username == new_username) alert('must not be the same with the old')
            else if(new_username != confirm_username) Say.warn(_('50'))
            else {
                Say.ok(_('14'))
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleChangeOldUsername = old_username => this.setState({old_username})

    handleChangeNewUsername = new_username => this.setState({new_username})

    handleChangeConfirmUsername = confirm_username => this.setState({confirm_username})

    render() {

        const {old_username, new_username, confirm_username} = this.state

        return (
            <KeyboardAvoidingView style={style.container}>

                <TopBuffer />

                <View style={style.imageWrapper}>
                    <Image source={image_res} style={style.image} resizeMode='contain' />
                    <Spacer sm />
                    <Text mute center>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                </View>

                <Spacer />

                <TextInput
                    label={_('47')}
                    value={old_username}
                    onChangeText={this.handleChangeOldUsername}
                    autoCapitalize='none'
                />

                <TextInput
                    label={_('48')}
                    value={new_username}
                    onChangeText={this.handleChangeNewUsername}
                    autoCapitalize='none'
                />

                <TextInput
                    label={_('49')}
                    value={confirm_username}
                    onChangeText={this.handleChangeConfirmUsername}
                    autoCapitalize='none'
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
        height:250
    }
})

export default ChangeUsernameScreen