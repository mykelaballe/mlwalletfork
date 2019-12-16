import React from 'react'
import {StyleSheet, View, ScrollView, Image, Picker} from 'react-native'
import {Text, Button, TextInput, Spacer, TopBuffer, HR, Row, Ripple} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class SubmitKPTNPartnerScreen extends React.Component {

    static navigationOptions = {
        title:'E-LOAD'
    }

    state = {
        currency:0,
        partner_name:'',
        kptn:'',
        sender_name:'',
        amount:''
    }

    handleSubmit = async () => {
        let {currency, partner_name, kptn, sender_name, amount} = this.state

        try {
            partner_name = partner_name.trim()
            kptn = kptn.trim()
            sender_name = sender_name.trim()
            amount = amount.trim()

            if(kptn == '') Say.some(_('8'))
            else {
                Say.ok(_('14'))
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    handleChangeCurrency = (itemValue, itemIndex) => {
        this.setState({
            currency:itemIndex
        })
    }

    render() {

        const {currency, partner_name, kptn, sender_name, amount} = this.state
        const {navigate} = this.props.navigation

        return (
            <ScrollView style={{paddingHorizontal:Metrics.lg}} showsVerticalScrollIndicator={false}>

                <TopBuffer />
                    
                <Text>Currency</Text>
                <Picker
                    selectedValue={currency}
                    style={{}}
                    onValueChange={this.handleChangeCurrency}
                    prompt='currency'
                >
                    <Picker.Item key={0} label={'PHP'} value={0} />
                    <Picker.Item key={1} label={'USD'} value={1} />
                </Picker>

                <Spacer sm />

                <Ripple onPress={() => navigate('SecurityQuestions')} style={{padding:Metrics.sm}}>
                    <Row bw>
                        <Text b>{"Partner's Name"}</Text>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </Ripple>
                <TextInput
                    editable={false}
                    value={partner_name}
                />

                <TextInput
                    label={'KPTN'}
                    value={kptn}
                    onChangeText={kptn => this.setState({kptn})}
                />

                <Spacer />

                <TextInput
                    label={"Sender's Name"}
                    value={sender_name}
                    onChangeText={sender_name => this.setState({sender_name})}
                />

                <Spacer />

                <TextInput
                    label={'Amount'}
                    value={amount}
                    onChangeText={amount => this.setState({amount})}
                    keyboardType='numeric'
                />

                <Spacer />

                <Button t={'Submit'} onPress={this.handleSubmit} />
                <Spacer sm />
                <Text center sm>Enter the correct KPTN. Five (5) attempts may block your account for 1 day.</Text>
            </ScrollView>
        )
    }
}

export default SubmitKPTNPartnerScreen