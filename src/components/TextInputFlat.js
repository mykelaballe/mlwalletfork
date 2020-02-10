import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Row} from './'
import {Colors, Metrics} from '../themes'
import {TextInput as TxtInput} from 'react-native-paper'

export default React.forwardRef((props, ref) => (
    <TxtInput
        {...props}
        ref={ref}
        style={[{
            flex:1,
            backgroundColor:'transparent',
            ...props.style
        }]}
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
))