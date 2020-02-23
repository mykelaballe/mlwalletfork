import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {Headline, Text, Spacer, Button, ButtonText, TextInput, Icon, HeaderRight} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'

class SendKP extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn[navigation.state.params.type].short_desc,
        headerRight:(
            <HeaderRight>
                <ButtonText color={Colors.light} t='Rates' onPress={() => navigation.navigate('Rates')} />
            </HeaderRight>
        )
    })

    state = {
        receiver:'John Smith',
        amount:'',
        charges:'',
        total:''
    }

    handleChangeAmount = amount => this.setState({amount})

    handleAddNewReceiver = () => this.props.navigation.navigate('SavedKPReceivers')

    handleSendMoney = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            ...params,
            ...this.state,
            statusMessage:'Your money is waiting to be claimed.',
            cancellable:true
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {receiver, amount, charges, total} = this.state
        let ready = false

        if(receiver && amount) ready = true

        return (
            <View style={style.container}>

                <View>

                    <Headline subtext={Consts.tcn[type].short_desc} />

                    <TouchableOpacity onPress={this.handleAddNewReceiver}>
                        <TextInput
                            disabled
                            label='Receiver'
                            value={receiver}
                            rightContent={<Icon name='user_plus' size={20} />}
                        />
                    </TouchableOpacity>

                    <Spacer sm />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
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

export default SendKP