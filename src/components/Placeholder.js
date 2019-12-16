import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text} from './'

export default props => (
    <View style={style.container}>
        <Text lg mute center>No Data</Text>
    </View>
)

const style = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})