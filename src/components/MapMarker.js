import React from 'react'
import {StyleSheet, Image} from 'react-native'
import Text from './Text'
import Spacer from './Spacer'
import {Say} from '../utils'
import {Marker as GoogleMapMarker} from 'react-native-maps'

const MARKER_IMG = require('../res/app_icon.png')

export default ({data}) => {

    const handlePress = () => {
        Say.some(
            '',
            data.bName,
            {
                customMessage: (
                    <>
                        {data.is24hours == 1 ?
                        <Text>24 hours</Text>
                        :
                        <>
                            <Spacer sm />

                            <Text mute>Store hours</Text>
                            <Text b>{data.timefrom} - {data.timeto}</Text>
                        </>
                        }

                        <Spacer sm />

                        <Text mute>Contact number</Text>
                        <Text b>{data.celno}</Text>
                    </>
                )
            }
        )
    }

    return (
        <GoogleMapMarker
            coordinate={{
                latitude:data.mLat,
                longitude:data.mLong
            }}
        >
            <Image source={MARKER_IMG} style={style.marker} />
        </GoogleMapMarker>
    )
}

const style = StyleSheet.create({
    marker: {
        width:20,
        height:20,
        borderRadius:20
    }
})