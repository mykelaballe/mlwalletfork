import React from 'react'
import {StyleSheet, View, Image, KeyboardAvoidingView} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const image_res = require('../res/pin.png')

class ChangePINScreen extends React.Component {

    static navigationOptions = {
        title:_('54')
    }

    state = {
        old_pin:'',
        new_pin:'',
        confirm_pin:''
    }

    handleSubmit = async () => {
        let {old_pin, new_pin, confirm_pin} = this.state

        try {
            old_pin = old_pin.trim()
            new_pin = new_pin.trim()
            confirm_pin = confirm_pin.trim()

            if(old_pin == '' || new_pin == '' || confirm_pin == '') Say.some(_('8'))
            else if(new_pin != confirm_pin) Say.warn(_('50'))
            else {
                Say.ok(_('14'))
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleChangeOldPIN = old_pin => this.setState({old_pin})

    handleChangeNewPIN = new_pin => this.setState({new_pin})

    handleChangeConfirmPIN = confirm_pin => this.setState({confirm_pin})

    render() {

        const {old_pin, new_pin, confirm_pin} = this.state

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
                    value={old_pin}
                    onChangeText={this.handleChangeOldPIN}
                    keyboardType='numeric'
                />

                <TextInput
                    label={_('48')}
                    value={new_pin}
                    onChangeText={handleChangeNewPIN}
                    keyboardType='numeric'
                />

                <TextInput
                    label={_('49')}
                    value={confirm_pin}
                    onChangeText={handleChangeConfirmPIN}
                    keyboardType='numeric'
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
        width:200,
        height:200
    }
})

export default ChangePINScreen