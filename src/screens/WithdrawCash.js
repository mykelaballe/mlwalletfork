import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput, Icon} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Consts} from '../utils'

class WithdrawCash extends React.Component {

    static navigationOptions = {
        title:'Withdraw Cash'
    }

    state = {
        type:Consts.tcn.wdc.code,
        amount:'',
        charges:'',
        total:''
    }

    handleChangeAmount = amount => this.setState({amount})

    handleWithdraw = async () => { 
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            ...params,
            ...this.state,
            cancellable:true
        })
    }

    render() {

        const {type, amount, charges, total} = this.state
        let ready = false

        if(amount) ready = true

        return (
            <View style={style.container}>

                <View>
                    <Spacer />
                    
                    <View style={{alignItems:'center'}}>
                        <Icon name='withdraw_cash' />
                    </View>

                    <Spacer md />

                    <Text center mute>Enter amount to be withdrawn and show transaction number to the nearest ML branch to cash out.</Text>

                    <Spacer />

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
                    
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleWithdraw} />
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

export default WithdrawCash