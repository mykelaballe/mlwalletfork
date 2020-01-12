import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class SendBankTransfer extends React.Component {

    static navigationOptions = {
        title:'Bank Transfer'
    }

    state = {
        amount:'100',
        fixed_charge:100,
        convenience_fee:15
    }

    handleChangeAmount = amount => this.setState({amount})

    handleSendMoney = async () => {
        this.props.navigation.navigate('OTPConfirmation',{type:'bank'})
    }

    render() {

        const {bank} = this.props.navigation.state.params
        const {amount, fixed_charge, convenience_fee} = this.state

        return (
            <View style={style.container}>

                <Text center b md>{bank.name}</Text>

                <Spacer md />

                <Row bw>
                    <Text b>Account Name</Text>
                    <Text>John Doe</Text>
                </Row>

                <Spacer sm />

                <Row bw>
                    <Text b>Account No.</Text>
                    <Text>1234567890</Text>
                </Row>

                <Row>
                    <TextInput
                        style={style.input}
                        label='Amount'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />
                </Row>
                
                <View style={style.footer}>
                    <Row bw>
                        <Text b>Fixed Charge</Text>
                        <Text>PHP {fixed_charge.toFixed(2)}</Text>
                    </Row>

                    <Spacer sm />

                    <Row bw>
                        <Text b>Convenience Fee</Text>
                        <Text>PHP {convenience_fee.toFixed(2)}</Text>
                    </Row>

                    <Spacer sm />

                    <Row bw>
                        <Text b>Total</Text>
                        <Text>PHP {(parseInt(amount) + fixed_charge + convenience_fee).toFixed(2)}</Text>
                    </Row>

                    <Spacer />
                    
                    <Button t='Send Money' onPress={this.handleSendMoney} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    },
    input: {
        flex:1
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default SendBankTransfer