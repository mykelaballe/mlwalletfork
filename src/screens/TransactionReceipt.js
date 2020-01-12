import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Button, Spacer, ButtonIcon, ButtonText, HR, Ripple, TopBuffer, HeaderRight} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class TransactionReceipt extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:'Transaction Receipt',
        headerRight: (
            <HeaderRight>
                <ButtonIcon icon={<Icon name='ios-download' size={Metrics.icon.rg} color={Colors.light} />} onPress={() => {}} />
            </HeaderRight>
        )
    })

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        return (
            <View style={style.container}>
                <View style={style.smallBanner}>
                    <Text center light>Pending</Text>
                </View>

                <View style={style.bigBanner}>
                    <Text center light>Transaction No.</Text>
                    <Text b lg center light>MLW-0011-718-2031-822-1211</Text>
                </View>

                <View style={style.innerContainer}>
                    <Text sm mute>Sender</Text>
                    <Text>John Smith</Text>

                    <Spacer />

                    <Text sm mute>Receiver</Text>
                    <Text>Jane Doe</Text>

                    <Spacer />

                    <Text sm mute>Wallet No.</Text>
                    <Text>1911-0000-3257-91</Text>

                    <Spacer />

                    <Text sm mute>Date</Text>
                    <Text>December 18, 2019</Text>

                    <Spacer />

                    <Text sm mute>Amount</Text>
                    <Text>PHP 1,000.00</Text>

                    <Spacer />

                    <Text sm mute>Type</Text>
                    <Text>Send Money - Wallet to Wallet</Text>

                    <View style={style.footer}>
                        <Button t='Back to Home' onPress={this.handleBackToHome} />
                    </View>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1
    },
    smallBanner: {
        backgroundColor:Colors.black,
        padding:Metrics.sm
    },
    bigBanner: {
        backgroundColor:Colors.dark,
        padding:Metrics.xl
    },
    innerContainer: {
        flex:1,
        padding:Metrics.lg
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default TransactionReceipt