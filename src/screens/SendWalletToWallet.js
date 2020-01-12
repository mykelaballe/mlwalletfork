import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class SendWalletToWallet extends React.Component {

    static navigationOptions = {
        title:'Wallet to Wallet'
    }

    state = {
        receiver_wallet_id:'',
        amount:'',
        notes:''
    }

    handleChangeReceiverWalletID = receiver_wallet_id => this.setState({receiver_wallet_id})

    handleChangeAmount = amount => this.setState({amount})

    handleChangeNotes = notes => this.setState({notes})

    handleAddNewReceiver = () => this.props.navigation.navigate('SavedWalletReceivers')

    handleSendMoney = async () => {
        this.props.navigation.navigate('TransactionReview',{type:'wallet'})
    }

    render() {

        const {receiver_wallet_id, amount, notes} = this.state

        return (
            <View style={style.container}>

                <Text center>Send money to ML Wallet account</Text>

                <Row>
                    <TextInput
                        style={style.input}
                        label='Receiver'
                        value={receiver_wallet_id}
                        onChangeText={this.handleChangeReceiverWalletID}
                    />
                    <ButtonIcon
                        icon={<Icon name='ios-person-add' size={Metrics.icon.sm} color={Colors.dark} />}
                        onPress={this.handleAddNewReceiver}
                    />
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

                <Row>
                    <TextInput
                        style={style.input}
                        label='Notes'
                        value={notes}
                        onChangeText={this.handleChangeNotes}
                    />
                </Row>
                
                <View style={style.footer}>
                    <Row bw>
                        <Text b>Charges</Text>
                        <Text>PHP 25.00</Text>
                    </Row>

                    <Spacer sm />

                    <Row bw>
                        <Text b>Total</Text>
                        <Text>PHP 25.00</Text>
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

export default SendWalletToWallet