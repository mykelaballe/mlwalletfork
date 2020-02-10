import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput, Icon, HeaderRight} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Consts} from '../utils'

class ReceiveMoneyDomestic extends React.Component {

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
        const {transaction_no, amount, sender} = this.state
        let ready = false

        if(transaction_no && amount && sender) ready = true

        return (
            <View style={style.container}>

                <View>

                    <TextInput
                        label='Transaction No.'
                        value={transaction_no}
                        onChangeText={this.handleChangeTransactionNo}
                        autoCapitalize='characters'
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
                        label="Sender's Name"
                        value={sender}
                        onChangeText={this.handleChangeSender}
                        autoCapitalize='words'
                    />
                </View>
                
                <View style={style.footer}>
                    <Text center>Make sure to enter the correct Transaction No. Five attempts will block your account for 24 hrs.</Text>
                    <Spacer sm />
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSubmit} />
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

export default ReceiveMoneyDomestic