import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput, Icon} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Consts} from '../utils'

class PayBill extends React.Component {

    static navigationOptions = {
        title:'Pay Bill'
    }

    state = {
        amount:'100',
        email:'',
        add_to_favorites:false,
        processing:false
    }

    handleChangeAmount = amount => this.setState({amount})

    handleChangeEmail = email => this.setState({email})

    handleToggleAddToFavorites = () => this.setState(prevState => ({add_to_favorites:!prevState.add_to_favorites}))

    handlePay = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            ...params,
            ...this.state,
            type:Consts.tcn.bpm.code,
            status:'success'
        })
    }

    render() {

        const {type, biller} = this.props.navigation.state.params
        const {amount, email} = this.state
        let ready = false

        if(amount) ready = true

        return (
            <View style={style.container}>

                <View>
                    <Text center b lg>{biller.name}</Text>

                    <Spacer />

                    <TextInput
                        disabled
                        label='Account Number'
                        value={'123456789'}
                    />

                    <Spacer sm />

                    <TextInput
                        disabled
                        label='Account Name'
                        value={'John Smith'}
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
                        label='Email address (Optional)'
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        keyboardType='email-address'
                    />
                </View>
                
                <View style={style.footer}>
                    <Text mute>Note: Fees and charges may apply.</Text>
                    <Spacer />
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handlePay} />
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

export default PayBill