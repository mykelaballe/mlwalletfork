import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Screen, Footer, Text, Spacer, Button, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn[navigation.state.params.type].short_desc
    })

    state = {
        transaction_no:'121324234',
        currency:'PHP',
        amount:'100',
        partner:'Bank of Commerce',
        sender:'John Smith'
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
            transaction: {
                ...this.state
            },
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

                    <TouchableOpacity onPress={this.handleChooseCurrency}>
                        <TextInput
                            disabled
                            label='Currency'
                            value={currency}
                            rightContent={<Icon name='ios-arrow-forward' color={Colors.gray} size={Metrics.icon.sm} />}
                        />
                    </TouchableOpacity>

                    <Spacer sm />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />

                    <Spacer sm />

                    <TouchableOpacity onPress={this.handleChoosePartner}>
                        <TextInput
                            disabled
                            label="Partner's Name"
                            value={partner}
                            rightContent={<Icon name='ios-list' color={Colors.gray} size={Metrics.icon.rg} />}
                        />
                    </TouchableOpacity>

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