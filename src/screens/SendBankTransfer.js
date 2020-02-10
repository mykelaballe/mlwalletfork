import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput, HeaderRight} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Consts} from '../utils'
import Icon from 'react-native-vector-icons/FontAwesome'

class SendBankTransfer extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn[navigation.state.params.type].short_desc,
        headerRight:(
            <HeaderRight>
                <ButtonIcon
                    icon={<Icon name='university' color={Colors.light} size={Metrics.icon.sm} />}
                    onPress={() => navigation.navigate('SavedBankPartners')}
                />
            </HeaderRight>
        )
    })

    state = {
        receiver:'BDO',
        account_name:'John Smith',
        account_number:'123456789',
        amount:'',
        fixed_charge:'',
        convenience_fee:'',
        total:''
    }

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAccountNumber = account_number => this.setState({account_number})

    handleChangeAmount = amount => this.setState({amount})

    handleSendMoney = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            ...params,
            ...this.state
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {receiver, account_name, account_number, amount, fixed_charge, convenience_fee, total} = this.state
        let ready = false

        if(receiver && account_name && account_number && amount) ready = true

        return (
            <View style={style.container}>

                <View>

                    <Text center>{Consts.tcn[type].short_desc}</Text>

                    <Spacer />

                    <TextInput
                        disabled
                        label='Bank Name'
                        value={receiver}
                    />

                    <Spacer sm />

                    <TextInput
                        disabled
                        label='Account Name'
                        value={account_name}
                        onChangeText={this.handleChangeAccountName}
                    />

                    <Spacer sm />

                    <TextInput
                        disabled
                        label='Account Number'
                        value={account_number}
                        onChangeText={this.handleChangeAccountNumber}
                        keyboardType='numeric'
                    />

                    <Spacer sm />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />
                </View>
                
                <View style={style.footer}>
                    <Text mute>Fixed Charge</Text>
                    <Text md>PHP 100.00</Text>

                    <Spacer />

                    <Text mute>Convenience Fee</Text>
                    <Text md>PHP 15.00</Text>

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

export default SendBankTransfer