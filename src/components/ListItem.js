import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Ripple, Row, Initial, Text, HR, Spacer} from './'
import {Metrics} from '../themes'

export default ({initial, primaryText, subText, onPress}) => {

    let baseUI = (
        <Row>
            <Initial text={initial || primaryText[0]} />
            <Spacer h sm />
            <View>
                <Text b>{primaryText}</Text>
                <Text>{subText}</Text>
            </View>
        </Row>
    )

    if(onPress) {
        baseUI = (
            <Ripple onPress={onPress} style={style.item}>
                {baseUI}
            </Ripple>
        )
    }

    return (
        <>
            {baseUI}
            <HR m={Metrics.sm} />
        </>
    )
}

const style = StyleSheet.create({
    container: {
        padding:Metrics.rg
    }
})