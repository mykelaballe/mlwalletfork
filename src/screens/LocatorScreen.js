import React from 'react'
import {StyleSheet, Image, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Button, Text, Spacer, ActivityIndicator} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'

class Scrn extends React.Component {

    static navigationOptions = {
        title:`${Consts.companyName} Branches`
    }

    state = {
        initialCoords: {
            latitude: this.props.user.latitude,
            longitude: this.props.user.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        branches:[],
        loading:true,
        refreshing:false,
        error:false,
        locationAllowed:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {params = {}} = this.props.navigation.state
        let {initialCoords, locationAllowed} = this.state
        let branches = []

        try {
            branches = await API.getBranches()

            const locationRes = await Func.getLocation()

            if(!locationRes.error) {

                locationAllowed = true
                
                let location = await Func.getCurrentPosition()

                if(!location.error) {
                    let newCoords = {
                        latitude:location.data.latitude,
                        longitude:location.data.longitude
                    }

                    this.props.updateInfo(newCoords)
                    this.setState({
                        initialCoords: {
                            ...initialCoords,
                            latitude:newCoords.latitude,
                            longitude:newCoords.longitude
                        }
                    })
                }
            }
            else {
                locationAllowed = false
            }

            if(params.is_nearest) {
                branches = Func.getNearestBranches(branches, initialCoords)
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            branches,
            locationAllowed,
            loading:false
        })
    }

    handleRefresh = () => this.setState({loading:true},this.getData)

    render() {

        const {initialCoords, branches, loading, locationAllowed} = this.state

        if(loading) return <ActivityIndicator />

        if(!locationAllowed) {
            return (
                <Screen>
                    <Text center lg>Please turn on location</Text>
                    <Spacer />
                    <Button t='Reload' onPress={this.handleRefresh} />
                </Screen>
            )
        }

        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={initialCoords}
                style={style.map}
                showsUserLocation={true}
            >
                {branches.map((b, i) => (
                    <Marker
                        key={i}
                        coordinate={{
                            latitude:b.mLat,
                            longitude:b.mLong
                        }}
                        title={b.bName}
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

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updateInfo:newInfo => dispatch(Creators.updateUserInfo(newInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)