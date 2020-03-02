import React from 'react'
import {Screen, Footer, Text, Spacer, Button, TextInput} from '../components'
import {_, Consts} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn[navigation.state.params.type].short_desc
    })

    state = {
        transaction_no:'',
        amount:'',
        sender:''
    }

    handleChangeTransactionNo = transaction_no => this.setState({transaction_no})

    handleChangeAmount = amount => this.setState({amount})

    handleChangeSender = sender => this.setState({sender})

    handleFocusAmount = () => this.refs.amount.focus()

    handleFocusSender = () => this.refs.sender.focus()

    handleSubmit = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReceipt',{
            ...params,
            transaction: {
                ...this.state
            },
            status:'success'
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {transaction_no, amount, sender} = this.state
        let ready = false

        if(transaction_no && amount && sender) ready = true

        return (
            <>
                <Screen>
                    <TextInput
                        ref='transaction_no'
                        label='Transaction No.'
                        value={transaction_no}
                        onChangeText={this.handleChangeTransactionNo}
                        onSubmitEditing={this.handleFocusAmount}
                        autoCapitalize='characters'
                        returnKeyType='next'
                    />

                    <Spacer sm />

                    <TextInput
                        ref='amount'
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleFocusSender}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <Spacer sm />

                    <TextInput
                        ref='sender'
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