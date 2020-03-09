import Consts from '../utils/Consts'
import Fetch from '../utils/Fetch'
import Storage from '../utils/Storage'

import WalletToWallet from './endpoints/WalletToWallet'
import KP from './endpoints/KP'
import BankTransfer from './endpoints/BankTransfer'
import ReceiveMoney from './endpoints/ReceiveMoney'
import Bills from './endpoints/Bills'
import ELoad from './endpoints/ELoad'

import OTP from './endpoints/OTP'
import User from './endpoints/User'

export default {
    login: async payload => {
        /*return {
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
            street:'',
            house:'',
            zip_code:'6000',
            mobile_no:'09326118146',
            walletno:'14040000000020',
            balance:'1000',
            level:0,
            error:payload.username == 'newphone' ? 'registered_anotherdevice' : null
        }*/
        let res = await Fetch.post('login', {
            ...payload,
            grant_type:'password'
        })

        if(res.access_token) {
            res = {
                ...res,
                mobile_no:res.mobileno,
                email:res.emailaddress,
                zip_code:res.zipcode,
                source_of_income:res.sourceofincome,
            }
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

    forgotPassword: async payload => await Fetch.put('forgotPassword',payload),

    checkVersion: async () => await Fetch.get(''),

    updateDevice: async payload => await Fetch.put('updateDevice',{username:payload.username, deviceid:Consts.deviceId}),

    validateUsername: async username => await Fetch.post('validateUsername',{username}),

    validateSecurityQuestion: async payload => await Fetch.post('validateSecurityQuestion',payload),

    ...WalletToWallet,
    ...KP,
    ...BankTransfer,
    ...ReceiveMoney,
    ...Bills,
    ...ELoad,

    ...OTP,
    ...User,

    getPartners: async () => {
        let data = {}
        let res = await Fetch.get('banks')

        if(res.data) {
            for(let d in res.data) {
                let letter = res.data[d].bank_name[0]

                if(typeof data[letter] === 'undefined') {
                    data[letter] = {
                        letter,
                        data:[]
                    }
                }

                data[letter].data.push(res.data[d])
            }
        }
        
        return Object.values(data)
    },

    checkBalance: async () => await Fetch.get('checkBalance'),

    withdrawCashValidate: async payload => {
        return await Fetch.post('withdrawcash/validate',payload)
    },

    withdrawCash: async payload => {
        return {error:false}
        return await Fetch.post('withdrawcash/validate',payload)
    },

    getRates: async () => await Fetch.get('getchargevalues'),

    getBranches: async () => await Fetch.get(''),

    getNotifications: async params => {
        let res = await Fetch.get(`getnotificationlist?walletno=${params.walletno}&start=${params.start}`)
        return res.data.notificationList || []
    },
}