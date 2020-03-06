import Consts from '../utils/Consts'
import Fetch from '../utils/Fetch'
import Storage from '../utils/Storage'

import WalletToWallet from './endpoints/WalletToWallet'
import KP from './endpoints/KP'
import BankTransfer from './endpoints/BankTransfer'
import ReceiveMoney from './endpoints/ReceiveMoney'
import Bills from './endpoints/Bills'
import ELoad from './endpoints/ELoad'

export default {
    login: async payload => {
        return {
            fname:'John',
            mname:'F',
            lname:'Smith',
            suffix:'',
            birthdate:'1980-01-01',
            gender:'Male',
            email:'johnsmith@gmail.com',
            nationality:'Filipino',
            source_of_income:'Business',
            country:'Philippines',
            province:'Cebu',
            city:'Cebu City',
            barangay:'Basak',
            zip_code:'6000',
            mobile_no:'09326118146',
            walletno:'14040000000020',
            balance:'1000',
            level:0,
            error:payload.username == 'newphone' ? 'registered_anotherdevice' : null
        }
        let res = await Fetch.post('login', {
            ...payload,
            grant_type:'password'
        })

        if(res.access_token) {
            await Storage.doSave(Consts.db.user, {...res})
        }

        return res
    },

    register: async payload => {
        return {
            walletno:'14874',
            error:false
        }
        return Fetch.post('',payload)
    },

    forgotPassword: async payload => {
        return Fetch.put('forgotPassword',payload)
    },

    checkVersion: async () => {
        return await Fetch.get('')
    },

    updateDevice: async payload => {
        return await Fetch.put('updateDevice',{
            username:payload.username,
            device_id:Consts.deviceId
        })
    },

    validateUsername: async username => {
        return await Fetch.post('validateUsername',{username})
    },

    validateSecurityQuestion: async payload => {
        return await Fetch.post('validateSecurityQuestion',payload)
    },

    requestOTP: async payload => {
        return Fetch.post('sendOTP',payload)
    },

    validateOTP: async payload => {
        return Fetch.post('validateOTP',payload)
    },

    changePassword: async payload => {
        return await Fetch.put('changePassword',payload)
    },

    ...WalletToWallet,
    ...KP,
    ...BankTransfer,
    ...ReceiveMoney,
    ...Bills,
    ...ELoad,

    withdrawCash: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getRates: async () => {
        return await Fetch.get('getchargevalues')
    },

    getBranches: async () => {
        return await Fetch.get('')
    },

    getNotifications: async params => {
        let res = await Fetch.get(`getnotificationlist?walletno=${params.walletno}&start=${params.start}`)
        return res.data.notificationList || []
    },
}