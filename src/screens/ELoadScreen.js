import React from 'react'
import {StyleSheet, View, Image, Picker} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer, HR, Balance} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class ELoadScreen extends React.Component {

    static navigationOptions = {
        title:'E-LOAD'
    }

    state = {
        provider:0,
        mobile_number:'',
        promo_code:0
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

    handleChangeProvider = (itemValue, itemIndex) => {
        this.setState({
            provider:itemIndex
        })
    }

    handleChangePromoCode = (itemValue, itemIndex) => {
        this.setState({
            promo_code:itemIndex
        })
    }

    render() {

        const {provider, mobile_number, promo_code} = this.state

        return (
            <View style={{flex:1}}>

                <Balance />

                <View style={{flex:1,padding:Metrics.xl}}>

                    <Text b center lg>LOAD AN ACCOUNT</Text>

                    <Spacer />
                    
                    <Text>Provider</Text>
                    <Picker
                        selectedValue={provider}
                        style={{}}
                        onValueChange={this.handleChangeProvider}
                        prompt='Provider'
                    >
                        <Picker.Item key={0} label={'GLOBE'} value={0} />
                        <Picker.Item key={1} label={'SMART'} value={1} />
                        <Picker.Item key={2} label={'SMART DEALER'} value={2} />
                        <Picker.Item key={3} label={'SUN CELLULAR'} value={3} />
                    </Picker>

                    <Spacer />

                    <TextInput
                        label={'Mobile Number'}
                        value={mobile_number}
                        onChangeText={mobile_number => this.setState({mobile_number})}
                        keyboardType='numeric'
                    />

                    <Spacer />

                    <Text>Promo Code</Text>
                    <Picker
                        selectedValue={promo_code}
                        style={{}}
                        onValueChange={this.handleChangePromoCode}
                        prompt='Promo Code'
                    >
                        <Picker.Item key={0} label={'GOOGLE5'} value={0} />
                        <Picker.Item key={1} label={'GOSURF10'} value={1} />
                        <Picker.Item key={2} label={'GOSURF15'} value={2} />
                        <Picker.Item key={3} label={'GOSURF299'} value={3} />
                        <Picker.Item key={4} label={'GOSURF30'} value={4} />
                        <Picker.Item key={5} label={'GOSURF499'} value={5} />
                        <Picker.Item key={6} label={'GOSURF50'} value={6} />
                    </Picker>

                    <View style={{flex:1,justifyContent:'flex-end'}}>
                        <Button t={'Load'} onPress={this.handleSubmit} />
                    </View>
                </View>
            </View>
        )
    }
}

export default ELoadScreen