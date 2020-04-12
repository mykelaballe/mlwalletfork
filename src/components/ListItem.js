import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Ripple, Row, Initial, Text, HR, Spacer} from './'
import {Metrics} from '../themes'

export default ({initial, primaryText, subText, big, onPress}) => {

    let baseUI = (
        <Row>
            {initial !== false &&
            <>
                <Initial text={initial || primaryText} />
                <Spacer h sm />
            </>
            }
            <View>
                {big && <Text mute md>{primaryText}</Text>}
                {!big && <Text b>{primaryText}</Text>}

                {subText && <Text>{subText}</Text>}
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