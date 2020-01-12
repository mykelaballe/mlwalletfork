import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {Switch} from 'react-native-paper'

class PayBill extends React.Component {

    static navigationOptions = {
        title:'Pay Bills'
    }

    state = {
        account_number:'',
        account_name:'',
        amount:'100',
        email:'',
        add_to_favorites:false
    }

    handleChangeAccountNumber = account_number => this.setState({account_number})

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAmount = amount => this.setState({amount})

    handleChangeEmail = email => this.setState({email})

    handleToggleAddToFavorites = () => this.setState(prevState => ({add_to_favorites:!prevState.add_to_favorites}))

    handlePay = async () => {
        this.props.navigation.navigate('TransactionReview',{type:'bill'})
    }

    render() {

        const {biller} = this.props.navigation.state.params
        const {account_number, account_name, amount, email, add_to_favorites} = this.state

        return (
            <View style={style.container}>

                <Text center b md>{biller.name}</Text>

                <Spacer md />

                <Row>
                    <TextInput
                        style={style.input}
                        label='Account Number'
                        value={account_number}
                        onChangeText={this.handleChangeAccountNumber}
                        keyboardType='numeric'
                    />
                </Row>

                <Row>
                    <TextInput
                        style={style.input}
                        label='Account Name'
                        value={account_name}
                        onChangeText={this.handleChangeAccountName}
                    />
                </Row>

                <Row>
                    <TextInput
                        style={style.input}
                        label='Amount'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />
                </Row>

                <Row>
                    <TextInput
                        style={style.input}
                        label='Email Address (Optional)'
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        keyboardType='email-address'
                    />
                </Row>
                
                <View style={style.footer}>
                    <Row bw>
                        <Text b>Add to Favorites</Text>
                        <Switch value={add_to_favorites} onValueChange={this.handleToggleAddToFavorites} />
                    </Row>

                    <Spacer />

                    <Text center mute>Note: Service charge and Biller's Convenenience fee may apply</Text>

                    <Spacer />
                    
                    <Button t='Pay' onPress={this.handlePay} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    },
    input: {
        flex:1
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default PayBill