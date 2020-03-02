import React from 'react'
import {StyleSheet} from 'react-native'
import {Screen, Headline, Text, Row, Ripple} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Receive Money'
    }

    handlePressDomestic = () => this.props.navigation.navigate('ReceiveMoneyDomestic',{type:Consts.tcn.rmd.code})

    handlePressInternational = () => this.props.navigation.navigate('ReceiveMoneyInternational',{type:Consts.tcn.rmi.code})

    render() {

        return (
            <>
                <Screen>
                    <Headline subtext='Select Remittance' />
                    
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

export default Scrn