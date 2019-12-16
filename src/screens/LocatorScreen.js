import React from 'react'
import {StyleSheet, View, Image, InteractionManager} from 'react-native'
import {Text, Card, Row, ActivityIndicator} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps'

class LocatorScreen extends React.Component {

    static navigationOptions = {
        title:_('28')
    }

    state = {
        initialCoords: {
            latitude: 10.2488493,
            longitude: 123.85214660000001,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        markers:[],
        loading:true,
        refreshing:false,
        error:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let markers = []

        try {
            markers = [
                {
                    latlng: {
                        latitude:10.2488493,
                        longitude:123.85214660000001
                    },
                    image:{uri:'https://m.media-amazon.com/images/M/MV5BMjM3MjM3NTAxM15BMl5BanBnXkFtZTgwMTY0Nzg2OTE@._V1_.jpg'}//require('../res/avatar.jpg')
                },
                {
                    latlng: {
                        latitude:10.2399493,
                        longitude:123.85214660000001
                    },
                    title:'First Marker',
                    description:'the quick brown fox',
                    image:require('../res/app_icon.png')
                },
                {
                    latlng: {
                        latitude:10.2289493,
                        longitude:123.84314660000001
                    },
                    title:'First Marker',
                    description:'the quick brown fox',
                    image:require('../res/app_icon.png')
                }
            ]
        }
        catch(err) {
            
        }

        this.setState({
            markers,
            loading:false
        })
    }

    render() {

        const {initialCoords, markers, loading, refreshing, error} = this.state
        const {navigate} = this.props.navigation

        if(loading) return <ActivityIndicator />

        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={initialCoords}
                style={style.map}
                showsUserLocation={true}
            >
                {markers.map((m, i) => (
                    <Marker
                        key={i}
                        coordinate={m.latlng}
                        title={m.title}
                        description={m.description}
                    >
                        <Image source={m.image} style={style.marker} />
                    </Marker>
                ))}
            </MapView>
        )
    }
}

const style = StyleSheet.create({
    map: {
        flex:1
    },
    marker: {
        width:20,
        height:20,
        borderRadius:20
    }
})

export default LocatorScreen