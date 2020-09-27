import React, {useState, useEffect} from 'react'
import {View, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Button, Text, Spacer, ActivityIndicator, GoogleMap, HuaweiMap} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'
import {Metrics} from '../themes'

const Scrn = ({navigation, user, updateInfo}) => {

    const [initialCoords, setInitialCoords] = useState({
        latitude: user.latitude,
        longitude: user.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })
    const [branches, setBranches] = useState([])
    const [loading, setLoading] = useState(true)
    const [locationAllowed, setLocationAllowed] = useState(false)
    const [service, setService] = useState('')

    const getData = async () => {
        const {params = {}} = navigation.state
        newCoords = {...initialCoords}
        let _locationAllowed = false

        try {

            setService(await Func.getDeviceMobileService())

            const locationRes = await Func.getLocation()

            if(!locationRes.error) {

                _locationAllowed = true

                setLocationAllowed(true)
                
                let location = await Func.getCurrentPosition()

                if(!location.error) {
                    newCoords = {
                        latitude:location.data.latitude,
                        longitude:location.data.longitude
                    }

                    updateInfo(newCoords)
                    setInitialCoords({
                        ...initialCoords,
                        latitude:newCoords.latitude,
                        longitude:newCoords.longitude
                    })
                }
            }
            else {
                _locationAllowed = false
                setLocationAllowed(false)
            }

            if(_locationAllowed) {
                let data = await API.getBranches()

                setBranches(data)

                if(params.is_nearest) {
                    data = Func.getNearestBranches(data, newCoords)
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        setLoading(false)
    }

    useEffect(() => {
        InteractionManager.runAfterInteractions(getData)
    },[])

    const handleRefresh = () => {
        setLoading(true)
        getData()
    }

    if(loading) return <ActivityIndicator />

    if(!locationAllowed) {
        return (
            <Screen>
                <Text center lg>Please turn on location</Text>
                <Spacer />
                <Button t='Reload' onPress={handleRefresh} />
            </Screen>
        )
    }

    if(service == 'gms') return <GoogleMap initialCoords={initialCoords} markers={branches} />

    else if(service == 'hms') return <HuaweiMap initialCoords={initialCoords} markers={branches} />

    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center',padding:Metrics.md}}>
            <Text center>Sorry we are unable to find Google Play Services or Huawei Mobile Services installed on the device</Text>
        </View>
    )
}

Scrn.navigationOptions = {
    title:`${Consts.companyName} Branches`
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updateInfo:newInfo => dispatch(Creators.updateUserInfo(newInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)