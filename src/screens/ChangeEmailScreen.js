import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class ChangeEmailScreen extends React.Component {

    static navigationOptions = {
        title:_('45')
    }

    state = {
        email:''
    }

    handleSubmit = async () => {
        let {email} = this.state

        try {
            email = email.trim()

            if(email == '') Say.some(_('8'))
            else {
                Say.ok(_('14'))
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    render() {

        const {email} = this.state

        return (
            <View style={{flex:1,padding:Metrics.xl}}>

                <TopBuffer />

                <View style={{alignItems:'center'}}>
                    <Image source={require('../res/email.png')} style={{width:220,height:220}} resizeMode='contain' />
                    <Text mute center>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                </View>

                <Spacer />

                <TextInput
                    label={_('33')}
                    value={email}
                    onChangeText={email => this.setState({email})}
                    autoFocus
                />

                <Spacer />

                <Button t={_('9')} onPress={this.handleSubmit} />
            </View>
        )
    }
}

export default ChangeEmailScreen