import Consts from './Consts'
import HasHms from 'react-native-has-hms'
import HMSLocation from 'react-native-hms-location'

const getDeviceMobileService = async () => {

    const hasGMS = await HasHms.isGMSAvailable()

    if(hasGMS) return 'gms'

    if(Consts.is_android) {
        const hasHMS = await HasHms.isHMSAvailable()

        if(hasHMS) return 'hms'
    }

    return 'gms'
}

const getHMSLocation = () => {
    return new Promise((resolve, reject) => {
        HMSLocation.FusedLocation.Native.hasPermission()
        .then(res => {
            if(!res) {
                HMSLocation.FusedLocation.Native.requestPermission()
            }
            else {
                HMSLocation.FusedLocation.Native.getLastLocation()
                .then(pos => {
                    resolve({
                        error:false,
                        data:{
                            latitude:pos.latitude,
                            longitude:pos.longitude
                        }
                    })
                })
                .catch(err => resolve(false))
            }
        })
    })
}

export default {
    getDeviceMobileService,
    getHMSLocation
}