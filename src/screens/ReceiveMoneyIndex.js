import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Spacer, ButtonText, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class ReceiveMoneyIndex extends React.Component {

    static navigationOptions = {
        title:'Receive Money'
    }

    handlePressDomestic = () => this.props.navigation.navigate('ReceiveMoneyDomestic',{type:Consts.tcn.rmd.code})

    handlePressInternational = () => this.props.navigation.navigate('ReceiveMoneyInternational',{type:Consts.tcn.rmi.code})

    render() {

        return (
            <View style={style.container}>
                <Text mute center>Select Remittance</Text>
                
                <Spacer sm />
                
                <Ripple onPress={this.handlePressDomestic} style={style.item}>
                    <Row bw>
                        <Text md mute>Domestic</Text>
                        <Icon name='ios-arrow-forward' size={Metrics.icon.sm} color={Colors.mute} />
                    </Row>
                </Ripple>
                <Ripple onPress={this.handlePressInternational} style={style.item}>
                    <Row bw>
                        <Text md mute>International</Text>
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

export default ReceiveMoneyIndex