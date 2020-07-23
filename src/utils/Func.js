import {Linking} from 'react-native'
import Consts from './Consts'
import _ from './Lang'
import Say from './Say'

const moment = require('moment')

import Formatter from './Formatter'
import Validator from './Validator'

import {request, PERMISSIONS, RESULTS} from 'react-native-permissions'
import Geolocation from 'react-native-geolocation-service'

function isCheckLocation(action) {
    if(Consts.checkLocation) {
        const actionsToCheckForLocation = [
            'signup',
            Consts.tcn.stw.code,
            Consts.tcn.skp.code,
            Consts.tcn.stb.code,
            Consts.tcn.wdc.code,
            Consts.tcn.bpm.code,
            Consts.tcn.bul.code,
            Consts.tcn.rmi.code,
            Consts.tcn.rmd.code,
            'cskp',
            'cwdc'
        ]

        return actionsToCheckForLocation.indexOf(action) >= 0
    }
}

function compute() {
    let total = 0

    for(i = 0; i < arguments.length; i++) {
        total += parseFloat(Formatter.formatToCurrency(arguments[i]))
    }

    return Formatter.formatToCurrency(total)
}

const calculateKPRate = (amount, rates) => {
    for(let r in rates) {
        if(amount >= rates[r].minAmount && amount <= rates[r].maxAmount) {
            return rates[r].chargeValue
        }
    }

    return 0
}

const randomize = list => list[Math.floor(Math.random() * list.length)]

const getCurrentPosition = () => {
    const config = {
        enableHighAccuracy:false,
        distanceFilter:0,
        timeout:15000,
        maximumAge:10000
    }

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
                resolve({
                    error:true,
                    ...err
                })
            },
            {...config}
        )
    })
}

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
                    resolve({error:true})
                }
                else {
                    return (
                        getCurrentPosition()
                        .then(res => {
                            if(res.error) Say.warn(message)
                            resolve(res)
                        })
                    )
                }
            })
        })
    }
    else {
        return (
            getCurrentPosition()
            .then(res => {
                if(res.error) {
                    if(res.code == 1 || res.code == 5) {
                        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                        .then(reqRes => {
                            if(reqRes === RESULTS.UNAVAILABLE || reqRes === RESULTS.DENIED) {
                                Say.warn(message)
                            }
                        })
                    }
                    else if(res.code == 3) Say.warn('Location request timed out')
                    else if(res.code == 4) Say.warn('Google play service is not installed or has an older version')
                    else Say.warn(message)
                }
                return res
            })
        )
    }
}

const getDistance = (lat1, lon1, lat2, lon2, unit) => {
    let radlat1 = Math.PI * lat1 / 180
    let radlat2 = Math.PI * lat2 / 180
    let theta = lon1 - lon2
    let radtheta = Math.PI * theta / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

    if(dist > 1) dist = 1
    
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515

    if (unit == 'K') dist = dist * 1.609344
    else if (unit == 'N') dist = dist * 0.8684

    return dist
}

const getNearestBranches = (branches, currentCoords) => {
    let near_branches = []

    if(branches.length > 0 && currentCoords && currentCoords.latitude && currentCoords.longitude) {
        for(let m in branches) {

            let dist = getDistance(currentCoords.latitude, currentCoords.longitude, branches[m].latitude, branches[m].longitude, 'K')

            //if this location is within 2KM of the user, add it to the list
            if(dist <= 2) near_branches.push(branches[m])
        }
    }

    return near_branches
}

const getAge = birthdate => {
    const currentDate = moment()
    let duration = moment.duration(currentDate.diff(moment(birthdate, 'YYYY-MM-DD')))
    return duration.asYears()
}

export default {
    ...Formatter,
    ...Validator,
    isCheckLocation,
    compute,
    calculateKPRate,
    randomize,
    getCurrentPosition,
    getLocation,
    getDistance,
    getNearestBranches,
    getAge
}