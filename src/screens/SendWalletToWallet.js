import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput, Icon} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Consts} from '../utils'

class SendWalletToWallet extends React.Component {

    static navigationOptions = {
        title:'Wallet to Wallet'
    }

    state = {
        wallet_account_number:'1911-0000-3257-91',
        receiver:'John Smith',
        amount:'',
        notes:'',
        charges:'',
        total:''
    }

    handleChangeReceiverWalletID = receiver_wallet_id => this.setState({receiver_wallet_id})

    handleChangeAmount = amount => this.setState({amount})

    handleChangeNotes = notes => this.setState({notes})

    handleAddNewReceiver = () => this.props.navigation.navigate('SavedWalletReceivers')

    handleSendMoney = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            ...params,
            ...this.state,
            status:'success'
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {wallet_account_number, receiver, amount, notes, charges, total} = this.state
        let ready = false

        if(wallet_account_number && amount) ready = true

        return (
            <View style={style.container}>

                <View>
                    <Text center>Send Money to an ML Wallet Account</Text>

                    <Spacer />

                    <TextInput
                        disabled
                        label='Receiver'
                        value={wallet_account_number}
                        rightContent={
                            <TouchableOpacity onPress={this.handleAddNewReceiver}>
                                <Icon name='user_plus' size={20} />
                            </TouchableOpacity>
                        }
                    />

                    <Spacer sm />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />

                    <Spacer />

                    <TextInput
                        style={style.textarea}
                        label='Notes'
                        placeholder='Type an optional message to your receiver here'
                        value={notes}
                        onChangeText={this.handleChangeNotes}
                        multiline
                    />
                </View>
                
                <View style={style.footer}>
                    <Text mute>Charges</Text>
                    <Text md>PHP 25.00</Text>

                    <Spacer />

                    <Text mute>Total</Text>
                    <Text md>PHP 25.00</Text>

                    <Spacer />
                    
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSendMoney} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
        padding:Metrics.lg
    },
    textarea: {
        height:130
    },
    footer: {
        //flex:1,
        //justifyContent:'flex-end'
    }
})

export default SendWalletToWallet