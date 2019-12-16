import React from 'react'
import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '../themes'
import {TextInput as TxtInput} from 'react-native-paper'

export default props => (
    <TxtInput
        {...props}
        style={[{backgroundColor:'transparent',...props.style}]}
        label={props.label}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCorrect={false}
        underlineColor={Colors.brand}
        theme={{
            colors:{
                primary:Colors.mute
            }
        }}
    />
)

/*export default props => (
    <TxtInput
        value={props.value}
        onChangeText={props.onChangeText}
        underlineColorAndroid='transparent'
        autoCorrect={false}
        style={[style.base,props.style]}
        {...props}
    />
)*/

/*const style = StyleSheet.create({
    base: {
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.brand,
        marginBottom:Metrics.xs
    }
})*/