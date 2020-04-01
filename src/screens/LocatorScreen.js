import React from 'react'
import {StyleSheet, Image, InteractionManager} from 'react-native'
import {ActivityIndicator} from '../components'
import {_, Say, Consts} from '../utils'
import {API} from '../services'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'

//ios api key = AIzaSyCxoT1ORnihAKC1FZe5FHYCXA_56CUjfkM

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:`${Consts.companyName} Branches`
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
            markers = await API.getBranches()
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            markers,
            loading:false
        })
    }

    render() {

        const {initialCoords, markers, loading} = this.state

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
                        coordinate={{
                            latitude:m.latitude,
                            longitude:m.longitude
                        }}
                        title={m.branchname}
                        description={m.address}
                    >
                        <Image source={require('../res/app_icon.png')} style={style.marker} />
                    </Marker>
                ))}
            </MapView>
        )
    }
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