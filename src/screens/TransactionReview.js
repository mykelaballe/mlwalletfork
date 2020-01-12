import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class TransactionReview extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {type} = navigation.state.params
        let title = 'Wallet To Wallet'

        if(type === 'kp') title = 'Kwarta Padala'
        else if(type === 'bill') title = 'Pay Bills'

        return {
            title
        }
    }

    handleConfirm = () => {
        const {navigate, state} = this.props.navigation
        navigate('OTPConfirmation',{...state.params})
    }

    render() {

        const {type, load} = this.props.navigation.state.params

        return (
            <View style={style.container}>
                <Text center>Review Transaction</Text>
                <Text sm mute center>You are about to {type === 'buy_load' ? 'pay' : 'send'}</Text>
                <Spacer sm />
                <Text center lg>Php 100.00</Text>

                <Spacer />

                {type === 'wallet' &&
                <>
                    <Text mute sm>Wallet No.</Text>
                    <Text>1911-0000-3257-91</Text>

                    <Spacer />

                    <Text mute sm>Nickname</Text>
                    <Text>Juan</Text>

                    <Spacer />

                    <Text mute sm>Amount</Text>
                    <Text>PHP 100.00</Text>

                    <Spacer />

                    <Text mute sm>Optional Message</Text>
                    <Text>Payment</Text>
                </>
                }

                {type === 'kp' &&
                <>
                    <Text mute sm>Full Name</Text>
                    <Text>John Doe</Text>

                    <Spacer />

                    <Text mute sm>Contact No.</Text>
                    <Text>09123456789</Text>
                </>
                }

                {type === 'buy_load' &&
                <>
                    {load.label &&
                    <>
                        <Text mute sm>Promo Code</Text>
                        <Text>{load.label}</Text>
                        
                        <Spacer />
                    </>
                    }

                    <Text mute sm>Mobile No.</Text>
                    <Text>09123456789</Text>
                </>
                }

                {type === 'bill' &&
                <>
                    <Text mute sm>Account Number</Text>
                    <Text>12346789</Text>
                    
                    <Spacer />

                    <Text mute sm>Account Name</Text>
                    <Text>Juan Dela Cruz</Text>

                    <Spacer />

                    <Text mute sm>Service Charge</Text>
                    <Text>Php 7.00</Text>

                    <Spacer />

                    <Text mute sm>Convenence Fee</Text>
                    <Text>Php 15.00</Text>
                </>
                }

                <View style={style.footer}>
                    <Text center>Please review the details before you proceed.</Text>
                    <Spacer sm />
                    <Button t='Confirm' onPress={this.handleConfirm} />
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
    item: {
        padding:Metrics.rg
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default TransactionReview