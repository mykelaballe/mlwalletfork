import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer, ScrollView} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'

class ForgotPasswordScreen extends React.Component {

    static navigationOptions = {
        title:_('4')
    }

    state = {
        username:''
    }

    handleSubmit = async () => {
        let {username} = this.state

        try {
            username = username.trim()

            if(username == '') Say.some(_('8'))
            else {
                Say.ok(_('14'))
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleChangeUsername = username => this.setState({username})

    render() {

        const {username} = this.state

        return (
            <ScrollView contentContainerStyle={style.container}>

                <TopBuffer />

                <View style={style.logoWrapper}>
                    <Image source={Res.logo_mini} style={style.logo} />
                </View>

                <Spacer />

                <Text center>{_('21')}</Text>

                <Spacer />

                <TextInput
                    label={_('1')}
                    value={username}
                    onChangeText={this.handleChangeUsername}
                    autoCapitalize='none'
                    autoFocus
                />

                <Spacer />

                <Button t={_('22')} onPress={this.handleSubmit} />
            </ScrollView>
        )
    }
}

const style = StyleSheet.create({
    container: {
        padding:Metrics.xl
    },
    logoWrapper: {
        alignItems:'center'
    },
    logo: {
        width:250,
        height:100
    }
})

export default ForgotPasswordScreen