import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Spacer, ButtonText, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class SendMoneyIndex extends React.Component {

    static navigationOptions = {
        title:'Send Money'
    }

    handleSendToWallet = () => this.props.navigation.navigate('SendWalletToWallet')

    handleSendToKP = () => this.props.navigation.navigate('SendKP')

    handleSendToBank = () => this.props.navigation.navigate('SavedBankPartners')

    render() {

        return (
            <View>
                <TopBuffer sm />
                <Ripple onPress={this.handleSendToWallet} style={style.item}>
                    <Row bw>
                        <Text md>Wallet to Wallet</Text>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </Ripple>
                <Ripple onPress={this.handleSendToKP} style={style.item}>
                    <Row bw>
                        <Text md>Kwarta Padala</Text>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </Ripple>
                <Ripple onPress={this.handleSendToBank} style={style.item}>
                    <Row bw>
                        <Text md>Bank Transfer</Text>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.dark} />
                    </Row>
                </Ripple>
            </View>
        )
    }
}

const style = StyleSheet.create({
    item: {
        paddingVertical:Metrics.rg,
        paddingHorizontal:Metrics.xl
    }
})

export default SendMoneyIndex