import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import HR from './HR'
import {Colors, Metrics} from '../themes'
import {Consts, Func} from '../utils'

const ITEM_HEIGHT = 110
const moment = require('moment')

export default class TransactionHistoryItem extends React.Component {

    shouldComponentUpdate = () => false

    render() {

        const {data, onPress} = this.props

        let amount = Func.checkTransAmount(data)

        return (
        <>
            <View bw style={style.item}>
                <View style={{flex:1,marginRight:Metrics.sm}}>
                    {((data.transtype === Consts.tcn.skp.code || data.transtype === Consts.tcn.wdc.code) && (data.isclaimed == 0 && data.iscancelled == 0)) &&
                    <Text style={{color:Colors.mute}}>PENDING</Text>
                    }
                    {data.iscancelled > 0 && <Text style={{color:Colors.mute}}>CANCELLED</Text>}
                    <Text style={{fontWeight:'bold',fontSize:Metrics.font.md}}>{Consts.tcn[data.transtype] ? Consts.tcn[data.transtype].short_desc : data.transtype}</Text>
                    <Text style={{color:Colors.mute}}>{data.transdateformat}</Text>
                    <Text style={{color:Colors.mute}}>Running Balance: {Func.formatToRealCurrency(data.runningbalance)}</Text>
                </View>

                <View>
                    <Text style={{fontWeight:'bold',fontSize:Metrics.font.md,textAlign:'right'}}>
                        {Consts.currency.PH} {Func.formatToRealCurrency(amount)}
                    </Text>
                    <TouchableOpacity onPress={() => onPress(data)}>
                        <Text style={{color:Colors.brand,textAlign:'right'}}>View details</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <HR />
        </>
        )
    }
}

const style = StyleSheet.create({
    item: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:ITEM_HEIGHT,
        paddingHorizontal:Metrics.md,
        paddingVertical:Metrics.md
    }
})