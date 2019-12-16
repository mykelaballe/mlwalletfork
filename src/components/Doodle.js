import React from 'react'
import {Image, Dimensions, StyleSheet, View} from 'react-native'
import {Res} from '../themes'

const {width} = Dimensions.get('window')

export default () => (
    <View style={style.container}>
        <Image source={Res.doodle} style={style.img} />
    </View>
)

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'flex-end'
    },
    img: {
        width,
        height:300,
        opacity:.2
    }
})