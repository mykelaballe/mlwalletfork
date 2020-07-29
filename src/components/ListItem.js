import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Ripple, Row, Initial, Text, HR, Spacer} from './'
import {Metrics} from '../themes'

export default ({initial, primaryText, subText, big, onPress}) => {

    let baseUI = (
        <Row f>
            {initial !== false &&
            <>
                <Initial text={initial || primaryText} />
                <Spacer h sm />
            </>
            }
            <View style={{flex:1}}>
                {big && <Text mute md>{primaryText}</Text>}
                {!big && <Text b>{primaryText}</Text>}

                {(subText != '' && subText) && <Text>{subText}</Text>}
            </View>
        </Row>
    )

    if(onPress) {
        baseUI = (
            <Ripple onPress={onPress} style={style.container}>
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