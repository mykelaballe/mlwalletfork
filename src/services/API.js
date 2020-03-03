import Consts from '../utils/Consts'
import Fetch from '../utils/Fetch'
import Storage from '../utils/Storage'

import WalletToWallet from './endpoints/WalletToWallet'
import KP from './endpoints/KP'
import BankTransfer from './endpoints/BankTransfer'
import ReceiveMoney from './endpoints/ReceiveMoney'
import ELoad from './endpoints/ELoad'

export default {
    login: async payload => {
        return {
            fname:'John',
            mname:'F',
            lname:'Smith',
            suffix:'',
            birthdate:'1980-01-01',
            gender:'male',
            email:'johnsmith@gmail.com',
            nationality:'Filipino',
            source_of_income:'Business',
            country:'Philippines',
            province:'Cebu',
            city:'Cebu City',
            barangay:'Basak',
            zip_code:'6000',
            mobile_no:'0912345678',
            walletno:'123456789',
            balance:'1000',
            level:0
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
            error:false
        }
        return Fetch.post('',payload)
    },

    forgotPassword: async payload => {
        return {
            error:false
        }
        return Fetch.post('',payload)
    },

    checkVersion: async () => {
        return await Fetch.get('')
    },

    validateUsername: async username => {
        return await Fetch.post('',{username})
    },

    requestOTP: async payload => {
        return {
            error:false
        }
        return Fetch.post('',payload)
    },

    validateOTP: async payload => {
        return {
            error:false
        }
        return Fetch.post('',payload)
    },

    ...WalletToWallet,
    ...KP,
    ...BankTransfer,
    ...ReceiveMoney,
    ...ELoad,

    withdrawCash: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getBillers: async () => {
        return await Fetch.get('')
    },

    getRates: async () => {
        return await Fetch.get('getchargevalues')
    },

    getBranches: async () => {
        return await Fetch.get('')
    },

    getNotifications: async params => {
        return await Fetch.get(`getnotificationlist?walletno=${params.walletno}`)
    },
}