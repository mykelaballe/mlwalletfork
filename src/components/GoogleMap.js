import React from 'react'
import {StyleSheet, Image, Dimensions} from 'react-native'
import {Text, Spacer} from '../components'
import {_, Say} from '../utils'
import {Colors} from '../themes'
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import MapView from 'react-native-map-clustering'

const {width} = Dimensions.get('window')
const MARKER_IMG = require('../res/app_icon.png')

export default ({initialCoords, markers}) => {

    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={initialCoords}
            style={style.map}
            showsUserLocation
            clusterColor={Colors.brand}
            clusterTextColor={Colors.brand}
            animationEnabled={false}
            radius={width * .15}
            extent={300}
            rotateEnabled={false}
        >
            {markers.map((b, i) => (
                <Marker
                    key={i}
                    coordinate={{
                        latitude:b.mLat,
                        longitude:b.mLong
                    }}
                    onPress={() => {
                        Say.some(
                            '',
                            b.bName,
                            {
                                customMessage: (
                                    <>
                                        {b.is24hours == 1 ?
                                        <Text>24 hours</Text>
                                        :
                                        <>
                                            <Spacer sm />

                                            <Text mute>Store hours</Text>
                                            <Text b>{b.timefrom} - {b.timeto}</Text>
                                        </>
                                        }

                                        <Spacer sm />

                                        <Text mute>Contact number</Text>
                                        <Text b>{b.celno}</Text>
                                    </>
                                )
                            }
                        )
                    }}
                >
                    <Image source={MARKER_IMG} style={style.marker} />
                </Marker>
            ))}
        </MapView>
    )
}

const style = StyleSheet.create({
    map: {
        flex:1,
        left:0,
        right:0,
        top:0,
        bottom:0,
        position:'absolute'
    },
    marker: {
        width:20,
        height:20,
        borderRadius:20
    }
})