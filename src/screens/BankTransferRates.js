import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Screen, Text, Row, FlatList, Spacer} from '../components'
import {Metrics} from '../themes'
import {_, Consts, Func} from '../utils'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:`${Consts.tcn.stb.short_desc} Rates`
    }

    state = {
        list:[
            {
                minAmount:'0.01',
                maxAmount:'50000',
                chargeValue:'100',
                convenienceValue:'15'
            }
        ]
    }

    renderItems = ({item}) => (
        <Row style={style.item}>
            <Text center style={{flex:1}}>{Func.formatToRealCurrency(item.minAmount)} - {Func.formatToRealCurrency(item.maxAmount)}</Text>
            <Row style={{flex:2}}>
                <Text center style={{flex:1}}>{Func.formatToRealCurrency(item.chargeValue)}</Text>
                <Text center style={{flex:1}}>{Func.formatToRealCurrency(item.convenienceValue)}</Text>
            </Row>
        </Row>
    )

    render() {

        const {list} = this.state

        return (
           <Screen ns>
                <Row ar style={{alignItems:'flex-start'}}>
                    <Text center b style={{flex:1}}>Amount</Text>
                    <View style={{flex:2,alignItems:'center'}}>
                        <Text center b>Rates</Text>
                        <Row>
                            <Text center mute style={{flex:1}}>{`Service\nCharge`}</Text>
                            <Text center mute style={{flex:1}}>{`Convenience\nFee`}</Text>
                        </Row>
                    </View>
                </Row>

                <Spacer sm />

                <FlatList
                    data={list}
                    renderItem={this.renderItems}
                />
            </Screen>
        )
    }
}

const style = StyleSheet.create({
    item: {
        paddingVertical:Metrics.sm
    }
})