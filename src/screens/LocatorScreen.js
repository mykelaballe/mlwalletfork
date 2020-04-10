import React from 'react'
import {StyleSheet, Image, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {ActivityIndicator} from '../components'
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
        error:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {params = {}} = this.props.navigation.state
        const {initialCoords} = this.state
        let branches = []

        try {
            branches = await API.getBranches()

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

            if(params.is_nearest) {
                branches = Func.getNearestBranches(branches, initialCoords)
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            branches,
            loading:false
        })
    }

    render() {

        const {initialCoords, branches, loading} = this.state

        if(loading) return <ActivityIndicator />

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
                            latitude:b.latitude,
                            longitude:b.longitude
                        }}
                        title={b.branchname}
                        description={b.address}
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