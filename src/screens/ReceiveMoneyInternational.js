import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Screen, Footer, Text, Spacer, Button, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn[navigation.state.params.type].short_desc
    })

    state = {
        transaction_no:'',
        currency:'PHP',
        amount:'',
        partner:'Bank of Commerce',
        sender:''
    }

    handleChangeTransactionNo = transaction_no => this.setState({transaction_no})

    handleChooseCurrency = () => this.props.navigation.navigate('Currencies')

    handleChangeAmount = amount => this.setState({amount})

    handleChoosePartner = () => this.props.navigation.navigate('Partners')

    handleChangeSender = sender => this.setState({sender})

    handleSubmit = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReceipt',{
            ...params,
            ...this.state,
            status:'success'
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {transaction_no, currency, amount, partner, sender} = this.state
        let ready = false

        if(transaction_no && currency && amount && partner && sender) ready = true

        return (
            <>
                <Screen>
                    <TextInput
                        label='Transaction No.'
                        value={transaction_no}
                        onChangeText={this.handleChangeTransactionNo}
                        autoCapitalize='characters'
                    />

                    <Spacer sm />

                    <TextInput
                        disabled
                        label='Currency'
                        value={currency}
                        rightContent={
                            <TouchableOpacity onPress={this.handleChooseCurrency}>
                                <Icon name='ios-arrow-forward' color={Colors.gray} size={Metrics.icon.sm} />
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

                    <Spacer sm />

                    <TextInput
                        disabled
                        label="Partner's Name"
                        value={partner}
                        rightContent={
                            <TouchableOpacity onPress={this.handleChoosePartner}>
                                <Icon name='ios-list' color={Colors.gray} size={Metrics.icon.rg} />
                            </TouchableOpacity>
                        }
                    />

                    <Spacer sm />

                    <TextInput
                        label="Sender's Name"
                        value={sender}
                        onChangeText={this.handleChangeSender}
                        autoCapitalize='words'
                    />
                </Screen>
                
                <Footer>
                    <Text center>Make sure to enter the correct Transaction No. Five attempts will block your account for 24 hrs.</Text>
                    <Spacer sm />
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSubmit} />
                </Footer>
            </>
        )
    }
}

export default Scrn