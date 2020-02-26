import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Row, Text} from './'
import {Colors, Metrics} from '../themes'
import {TextInput as TxtInput} from 'react-native-paper'

export default React.forwardRef((props, ref) => (
    <>
        <Row style={{
            borderWidth:StyleSheet.hairlineWidth,
            borderColor:Colors.lightgray,
            borderRadius:Metrics.sm,
            marginVertical:Metrics.sm,
            //height:props.multiline ? undefined : 63,
            overflow:'hidden'
        }}>
            {props.leftContent &&
            <View style={{paddingLeft:Metrics.md}}>
                {props.leftContent}
            </View>
            }
            
            <TxtInput
                {...props}
                ref={ref}
                mode='flat'
                style={[{
                    flex:1,
                    backgroundColor:'transparent',
                    height:props.multiline ? 130 : undefined,
                    ...props.style
                }]}
                label={props.label}
                value={props.value}
                onChangeText={props.onChangeText}
                autoCorrect={false}
                underlineColor='transparent'
                selectionColor={Colors.brand}
                theme={{
                    colors:{
                        primary:Colors.mute
                    }
                }}
            />

            {props.rightContent &&
            <View style={{paddingRight:Metrics.md}}>
                {props.rightContent}
            </View>
            }
        </Row>

        {(props.helpText !== '' && props.helpText) && <Text brand sm>{props.helpText}</Text>}
    </>
))