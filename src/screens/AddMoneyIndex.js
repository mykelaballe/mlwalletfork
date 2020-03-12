import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Screen, Text, Row, Ripple} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Money'
    }

    handleViewMLBranch = () => this.props.navigation.navigate('AddMoneyBranch')

    handleViewBankToWallet = () => this.props.navigation.navigate('ComingSoon',{title:'Add Money'})

    render() {

        return (
            <>
                <Screen>
                    <Ripple onPress={this.handleViewMLBranch} style={style.item}>
                        <Row bw>
                            <Text md mute>M Lhuillier Branch</Text>
                            <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                        </Row>
                    </Ripple>
                    
                    <Ripple onPress={this.handleViewBankToWallet} style={style.item}>
                        <Row bw>
                            <Text md mute>Bank to Wallet</Text>
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