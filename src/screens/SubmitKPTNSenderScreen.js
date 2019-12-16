import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class SubmitKPTNSenderScreen extends React.Component {

    static navigationOptions = {
        title:'KPTN'
    }

    state = {
        kptn:'',
        sender_name:'',
        amount:''
    }

    handleSubmit = async () => {
        let {kptn, sender_name, amount} = this.state

        try {
            kptn = kptn.trim()
            sender_name = sender_name.trim()
            amount = amount.trim()

            if(kptn == '' || sender_name == '' || amount == '') Say.some(_('8'))
            else {
                Say.ok(_('14'))
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    render() {

        const {kptn, sender_name, amount} = this.state

        return (
            <View style={{flex:1,padding:Metrics.xl}}>

                <TextInput
                    label={`KPTN / ${_('81')} #`}
                    value={kptn}
                    onChangeText={kptn => this.setState({kptn})}
                />

                <Spacer />

                <TextInput
                    label='Sender Name'
                    value={sender_name}
                    onChangeText={sender_name => this.setState({sender_name})}
                />

                <Spacer />

                <TextInput
                    label='Amount'
                    value={amount}
                    onChangeText={amount => this.setState({amount})}
                    keyboardType='numeric'
                />

                <Spacer />

                <Text center>Enter the correct KPTN. Five (5) attempts may block your account for 1 day.</Text>

                <Spacer />

                <Button t={_('10')} onPress={this.handleSubmit} />
            </View>
        )
    }
}

export default SubmitKPTNSenderScreen