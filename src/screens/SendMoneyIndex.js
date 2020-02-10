import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Spacer, ButtonText, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class SendMoneyIndex extends React.Component {

    static navigationOptions = {
        title:'Send Money'
    }

    handleSendToWallet = () => this.props.navigation.navigate('SendWalletToWallet',{type:Consts.tcn.stw.code})

    handleSendToKP = () => this.props.navigation.navigate('SendKP',{type:Consts.tcn.skp.code})

    handleSendToBank = () => this.props.navigation.navigate('SendBankTransfer',{type:Consts.tcn.stb.code})

    render() {

        return (
            <View style={style.container}>
                <Text mute center>Select Send Money Service</Text>
                
                <Spacer sm />
                
                <Ripple onPress={this.handleSendToWallet} style={style.item}>
                    <Row bw>
                        <Text md mute>Wallet to Wallet</Text>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                    </Row>
                </Ripple>
                <Ripple onPress={this.handleSendToKP} style={style.item}>
                    <Row bw>
                        <Text md mute>Kwarta Padala</Text>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                    </Row>
                </Ripple>
                <Ripple onPress={this.handleSendToBank} style={style.item}>
                    <Row bw>
                        <Text md mute>Bank Transfer</Text>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                    </Row>
                </Ripple>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        padding:Metrics.md
    },
    item: {
        paddingVertical:Metrics.lg,
        paddingHorizontal:Metrics.md,
        marginVertical:Metrics.rg,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.mute,
        borderRadius:Metrics.sm
    }
})

export default SendMoneyIndex