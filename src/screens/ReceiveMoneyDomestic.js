import React from 'react'
import {Screen, Footer, Text, Spacer, Button, TextInput} from '../components'
import {_, Consts, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn[navigation.state.params.type].short_desc
    })

    state = {
        transaction_no:'',
        amount:'',
        sender:'',
        processing:false
    }

    handleChangeTransactionNo = transaction_no => this.setState({transaction_no})

    handleChangeAmount = amount => this.setState({amount})

    handleChangeSender = sender => this.setState({sender})

    handleFocusAmount = () => this.refs.amount.focus()

    handleFocusSender = () => this.refs.sender.focus()

    handleSubmit = async () => {
        const {params} = this.props.navigation.state
        let {transaction_no, amount, sender, processing} = this.state

        if(processing) return false
        
        try {
            transaction_no = transaction_no.trim()
            amount = amount.trim()
            sender = sender.trim()

            if(!transaction_no || !amount || !sender) Say.some(_('8'))
            else {
                let payload = {
                    transaction_no,
                    amount,
                    sender
                }

                let res = await API.receiveMoneyDomestic(payload)

                if(res.error) Say.some('error')
                else {
                    this.props.navigation.navigate('TransactionReceipt',{
                        ...params,
                        transaction: {
                            ...this.state
                        },
                        status:'success'
                    })
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {transaction_no, amount, sender, processing} = this.state
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

                    <TextInput
                        ref='amount'
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleFocusSender}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

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
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

export default Scrn