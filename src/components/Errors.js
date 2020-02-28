import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Row, Spacer} from './'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Ionicons'

export default props => (
    <>
        {props.errors.length > 0 &&
            <View style={style.container}>
                {
                props.errors.map((err, index) => (
                    <Row key={index} style={style.item}>
                        <Icon
                            name={`ios-${err.ok ? 'checkmark' : 'close'}-circle`}
                            color={err.ok ? Colors.success : Colors.brand}
                            size={Metrics.icon.sm}
                        />

                        <Spacer h sm />

                        <Text mute>{err.message}</Text>
                    </Row>
                ))
                }
        </View>
        }
    </>
)

const style = StyleSheet.create({
    container: {
        marginVertical:Metrics.md
    },
    item: {
        marginVertical:1
    }
})