import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Spacer} from '../components'
import {_, Say} from '../utils'
import {Colors} from '../themes'
import MapView, {Marker} from 'react-native-hms-map'

//const MARKER_IMG = require('../res/app_icon.png')

export default ({initialCoords, markers}) => {

    return (
        <View style={style.container}>
            <MapView
                style={style.map}
                visibleRegion={{
                    latLngBounds:{
                        latitude:initialCoords.latitude,
                        longitude:initialCoords.longitude
                    }
                }}
                compassEnabled={false}
                camera={{
                    target:{
                        latitude:initialCoords.latitude,
                        longitude:initialCoords.longitude
                    },
                    zoom:15
                }}
                myLocationEnabled
                markerClustering
            >
                {markers.map((b, i) => (
                    <Marker
                        key={i}
                        coordinate={{
                            latitude:b.mLat,
                            longitude:b.mLong
                        }}
                        pinColor={Colors.brand}
                        anchor={{x: 1, y: 1}}
                        opacity={1}
                        clusterable={true}
                        onClick={() => {
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
                    />
                ))}
            </MapView>  
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        //flex:1,
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