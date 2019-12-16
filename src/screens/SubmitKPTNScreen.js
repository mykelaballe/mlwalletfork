import React from 'react'
import {StyleSheet, View, Image} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class SubmitKPTNScreen extends React.Component {

    static navigationOptions = {
        title:'KPTN'
    }

    state = {
        kptn:''
    }

    handleSubmit = async () => {
        let {kptn} = this.state

        try {
            kptn = kptn.trim()

            if(kptn == '') Say.some(_('8'))
            else {
                Say.ok(_('14'))
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    render() {

        const {kptn} = this.state

        return (
            <View style={{flex:1,padding:Metrics.xl}}>

                <TopBuffer />

                <TextInput
                    label='KPTN'
                    value={kptn}
                    onChangeText={kptn => this.setState({kptn})}
                    autoFocus
                />

                <Spacer />

                <Text center>Enter the correct KPTN. Five (5) attempts may block your account for 1 day.</Text>

                <Spacer />

                <Button t={_('10')} onPress={this.handleSubmit} />
            </View>
        )
    }
}

export default SubmitKPTNScreen