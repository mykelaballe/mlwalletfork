import React from 'react'
import {StyleSheet, View, Image, InteractionManager} from 'react-native'
import {Text, Card, Row, ActivityIndicator} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps'

class LocatorScreen extends React.Component {

    static navigationOptions = {
        title:'M Lhuillier Branches'
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

        const {initialCoords, markers, loading, refreshing, error} = this.state
        const {navigate} = this.props.navigation

        if(loading) return <ActivityIndicator />

        return (
            <View style={{ position: 'relative', height: 500}}>
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
                            title={m.branchname}
                            description={m.address}
                        >
                            <Image source={require('../res/app_icon.png')} style={style.marker} />
                        </Marker>
                    ))}
                </MapView>
            </View>
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

export default LocatorScreen