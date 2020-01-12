import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class WithdrawCash extends React.Component {

    static navigationOptions = {
        title:'Withdraw Cash'
    }

    state = {
        amount:'0.00'
    }

    handleChangeAmount = amount => this.setState({amount})

    handleWithdraw = async () => {
        this.props.navigation.navigate('OTPConfirmation',{type:'withdraw_cash'})
    }

    render() {

        const {amount} = this.state

        return (
            <View style={style.container}>

                <Text center>Enter amount to be withdrawn and show transaction number to the nearest ML branch to cash out.</Text>

                <Spacer md />

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
                        <Text b>Charges</Text>
                        <Text>PHP 0.00</Text>
                    </Row>

                    <Spacer sm />

                    <Row bw>
                        <Text b>Total</Text>
                        <Text>PHP 0.00</Text>
                    </Row>

                    <Spacer />
                    
                    <Button t='Withdraw Cash' onPress={this.handleWithdraw} />
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

export default WithdrawCash