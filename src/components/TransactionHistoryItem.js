import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import HR from './HR'
import {Colors, Metrics} from '../themes'
import {Consts} from '../utils'

const ITEM_HEIGHT = 110

export default class TransactionHistoryItem extends React.Component {

    shouldComponentUpdate = () => false

    render() {

        const {data, onPress} = this.props

        return (
        <>
            <View bw style={style.item}>
                <View style={{flex:1,marginRight:Metrics.sm}}>
                    {((data.transtype === Consts.tcn.skp.code || data.transtype === Consts.tcn.wdc.code) && (data.isclaimed == 0 && data.iscancelled == 0)) &&
                    <Text style={{color:Colors.mute}}>PENDING</Text>
                    }
                    {data.iscancelled > 0 && <Text style={{color:Colors.mute}}>CANCELLED</Text>}
                    <Text style={{fontWeight:'bold',fontSize:Metrics.font.md}}>{Consts.tcn[data.transtype] ? Consts.tcn[data.transtype].short_desc : data.transtype}</Text>
                    <Text style={{color:Colors.mute}}>{data.transdate}</Text>
                    <Text style={{color:Colors.mute}}>Running Balance: {data.runningbalance}</Text>
                </View>

                <View>
                    <Text style={{fontWeight:'bold',fontSize:Metrics.font.md}}>
                        {Consts.currency.PH} {data.transtype === Consts.tcn.rmd.code ? data.amount : data.totalamount}
                    </Text>
                    <TouchableOpacity onPress={() => onPress(data)}>
                        <Text style={{color:Colors.brand}}>View details</Text>
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