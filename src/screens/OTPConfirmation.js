import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class OTPConfirmation extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {type} = navigation.state.params
        let title = 'Wallet To Wallet'

        if(type === 'kp') title = 'Kwarta Padala'
        else if(type === 'bank') title = 'Bank Transfer'
        else if(type === 'withdraw_cash') title = 'Withdraw Cash'
        else if(type === 'buy_load') title = 'Buy Load'
        else if(type === 'bill') title = 'Pay Bills'

        return {
            title
        }
    }

    state = {
        digit1:'',
        digit2:'',
        digit3:'',
        digit4:'',
        digit5:'',
        digit6:'',
        processing:false
    }

    handleChangeDigit1 = digit1 => this.setState({digit1})
    
    handleChangeDigit2 = digit2 => this.setState({digit2})

    handleChangeDigit3 = digit3 => this.setState({digit3})

    handleChangeDigit4 = digit4 => this.setState({digit4})

    handleChangeDigit5 = digit5 => this.setState({digit5})

    handleChangeDigit6 = digit6 => this.setState({digit6})

    handleSubmit = () => {
        try {
            const {navigate, state} = this.props.navigation
            this.setState({processing:true})
            navigate('TransactionReceipt',{...state.params})
            this.setState({processing:false})
        }
        catch(err) {

        }
    }

    render() {

        const {digit1, digit2, digit3, digit4, digit5, digit6, processing} = this.state

        return (
            <View style={style.container}>
                <TopBuffer sm />

                <Text center b>Enter 6-digit OTP</Text>

                <View style={{paddingHorizontal:Metrics.xl}}>
                    <Text sm center>A 6-digit one-time pin (OTP) was sent to your mobile number for verification. Input it here.</Text>
                </View>

                <Spacer />

                <Row ar>
                    <TextInput
                        style={style.input}
                        value={digit1}
                        onChangeText={this.handleChangeDigit1}
                        keyboardType='numeric'
                        maxLength={1}
                    />
                    <TextInput
                        style={style.input}
                        value={digit2}
                        onChangeText={this.handleChangeDigit2}
                        keyboardType='numeric'
                        maxLength={1}
                    />
                    <TextInput
                        style={style.input}
                        value={digit3}
                        onChangeText={this.handleChangeDigit3}
                        keyboardType='numeric'
                        maxLength={1}
                    />
                    <TextInput
                        style={style.input}
                        value={digit4}
                        onChangeText={this.handleChangeDigit4}
                        keyboardType='numeric'
                        maxLength={1}
                    />
                    <TextInput
                        style={style.input}
                        value={digit5}
                        onChangeText={this.handleChangeDigit5}
                        keyboardType='numeric'
                        maxLength={1}
                    />
                    <TextInput
                        style={style.input}
                        value={digit6}
                        onChangeText={this.handleChangeDigit6}
                        keyboardType='numeric'
                        maxLength={1}
                    />
                </Row>

                <View style={style.footer}>
                    <Button t='Submit' onPress={this.handleSubmit} loading={processing} />
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
        marginHorizontal:Metrics.xs,
        textAlign:'center',
        alignItems:'center'
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default OTPConfirmation