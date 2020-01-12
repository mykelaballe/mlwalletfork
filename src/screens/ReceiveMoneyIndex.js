import React from 'react'
import {View, StyleSheet, InteractionManager, Dimensions} from 'react-native'
import {ScrollView, Text, Row, Spacer, Ripple} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 2) - (Metrics.lg)

class ReceiveMoneyIndex extends React.Component {

    static navigationOptions = {
        title:'Receive Money'
    }

    handlePressDomestic = () => this.props.navigation.navigate('ReceiveMoney',{type:'domestic'})

    handlePressInternational = () => this.props.navigation.navigate('ReceiveMoney',{type:'international'})

    render() {

        return (
            <View style={style.container}>
                <Row ar>
                    <Ripple style={style.item} onPress={this.handlePressDomestic}>
                        <Icon name='ios-globe' size={Metrics.icon.lg} />
                        <Text center>Domestic</Text>
                    </Ripple>

                    <Ripple style={style.item} onPress={this.handlePressInternational}>
                        <Icon name='ios-globe' size={Metrics.icon.lg} />
                        <Text center>International</Text>
                    </Ripple>
                </Row>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:Metrics.lg
    },
    item: {
        width:ITEM_WIDTH,
        height:100,
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ReceiveMoneyIndex