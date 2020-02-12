import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Screen, Headline, Text, Row, Ripple} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Send Money'
    }

    handleSendToWallet = () => this.props.navigation.navigate('SendWalletToWallet',{type:Consts.tcn.stw.code})

    handleSendToKP = () => this.props.navigation.navigate('SendKP',{type:Consts.tcn.skp.code})

    handleSendToBank = () => this.props.navigation.navigate('SendBankTransfer',{type:Consts.tcn.stb.code})

    render() {

        return (
            <>
                <Screen>
                    <Headline subtext='Select Send Money Service' />
                    
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
                </Screen>
            </>
        )
    }
}

const style = StyleSheet.create({
    item: {
        paddingVertical:Metrics.lg,
        paddingHorizontal:Metrics.md,
        marginVertical:Metrics.rg,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.mute,
        borderRadius:Metrics.sm
    }
})