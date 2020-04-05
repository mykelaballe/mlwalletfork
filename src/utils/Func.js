import {Linking} from 'react-native'
import Consts from './Consts'
import _ from './Lang'
import Say from './Say'

import Formatter from './Formatter'
import Validator from './Validator'

import {request, PERMISSIONS, RESULTS} from 'react-native-permissions'
import Geolocation from 'react-native-geolocation-service'


function compute() {
    let total = 0

    for(i = 0; i < arguments.length; i++) {
        total += parseFloat(formatToCurrency(arguments[i]))
      }

    return formatToCurrency(total)
}

const randomize = list => list[Math.floor(Math.random() * list.length)]

const getLocation = () => {
    const message = 'Please turn on your location'
    if(!Consts.is_android) {
        return new Promise(resolve => {
            request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            .then(res => {
                if(res === RESULTS.UNAVAILABLE || res === RESULTS.DENIED) {
                    Say.warn(
                        message,
                        null,
                        {
                            OkBtnLabel:'Turn on location',
                            onDismiss:() => Linking.openURL('app-settings:')
                        }
                    )
                    resolve({
                        error:true
                    })
                }
                else {
                    Geolocation.getCurrentPosition(
                        pos => {
                            const {latitude, longitude} = pos.coords
                            resolve({
                                error:false,
                                data:{
                                    latitude,
                                    longitude
                                }
                            })
                        },
                        err => {
                            Say.warn(message)
                            resolve({
                                error:true
                            })
                        },
                        {enableHighAccuracy:true, timeout:15000, maximumAge:10000}
                    )
                }
            })
        })
    }
    else {
        return new Promise(resolve => {
            Geolocation.getCurrentPosition(
                pos => {
                    const {latitude, longitude} = pos.coords
                    resolve({
                        error:false,
                        data:{
                            latitude,
                            longitude
                        }
                    })
                },
                err => {
                    Say.warn(message)
                    resolve({
                        error:true
                    })
                },
                {enableHighAccuracy:true, timeout:15000, maximumAge:10000}
            )
        })
    }
}

export default {
    ...Formatter,
    ...Validator,
    compute,
    randomize,
    getLocation,
}