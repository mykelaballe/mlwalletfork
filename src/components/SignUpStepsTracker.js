import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Row, Spacer} from './'
import {Colors, Metrics} from '../themes'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Line = props => <View style={[style.line,{borderColor:props.active ? Colors.brand : Colors.gray}]} />

export default props => (
    <>
        <Row style={{marginVertical:Metrics.rg}}>
            <View style={[style.circle,{backgroundColor:Colors.brand}]}>
                <AntDesign name='user' color={Colors.light} size={Metrics.icon.sm} />
            </View>

            <Line active={props.step >= 2} />

            <View style={[style.circle,{backgroundColor:props.step >= 2 ? Colors.brand : Colors.gray}]}>
                <AntDesign name='home' color={Colors.light} size={Metrics.icon.sm} />
            </View>

            <Line active={props.step >= 3} />

            <View style={[style.circle,{backgroundColor:props.step >= 3 ? Colors.brand : Colors.gray}]}>
                <Entypo name='fingerprint' color={Colors.light} size={Metrics.icon.sm} />
            </View>

            <Line active={props.step >= 4} />

            <View style={[style.circle,{backgroundColor:props.step >= 4 ? Colors.brand : Colors.gray}]}>
                <AntDesign name='lock' color={Colors.light} size={Metrics.icon.sm} />
            </View>

            <Line active={props.step >= 5} />

            <View style={[style.circle,{backgroundColor:props.step >= 5 ? Colors.brand : Colors.gray}]}>
                <MaterialCommunityIcons name='message-text-outline' color={Colors.light} size={Metrics.icon.sm} />
            </View>
        </Row>
    
        <Spacer />
    </>
)

const style = StyleSheet.create({
    circle: {
        width:50,
        height:50,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    },
    line: {
        flex:1,
        borderColor:Colors.gray,
        borderWidth:2
    }
})