import Consts from '../utils/Consts'
import Fetch from '../utils/Fetch'
import Storage from '../utils/Storage'

export default {
    login: async payload => {
        return {
            fname:'John',
            mname:'F',
            lname:'Smith',
            suffix:'',
            birthdate:'1980-01-01',
            gender:'male',
            email:'johnsmit@gmail.com',
            nationality:'Filipino',
            source_of_income:'Business',
            country:'Philippines',
            province:'Cebu',
            city:'Cebu City',
            barangay:'Basak',
            zip_code:'6000',
            walletno:'123456789',
            balance:'1000'
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

    },

    forgotPassword: async payload => {

    },

    checkVersion: async () => {
        return await Fetch.get('')
    },

    validateUsername: async username => {
        return await Fetch.post('',{username})
    },

    getWalletReceivers: async payload => {
        return await Fetch.get(`wallettowallet/receiverlist?walletNo=${payload.wallet_no}`)
    },

    searchWalletReceiver: async payload => {
        return await Fetch.post('')
    },

    addWalletReceiver: async payload => {
        return await Fetch.post('wallettowallet/addreceiver',payload)
    },

    deleteWalletReceiver: async payload => {
        return await Fetch.delete('')
    },

    getKPReceivers: async payload => {
        return await Fetch.get(`sendoutmobile/KPListReceivers?walletno=${payload.wallet_no}`)
    },

    addKPReceiver: async payload => {
        return await Fetch.post('')
    },

    deleteKPReceiver: async payload => {
        return await Fetch.delete('')
    },

    getBankPartners: async () => {
        return await Fetch.get('')
    },

    getBillers: async () => {
        return await Fetch.get('')
    },

    getLoadPromoCodes: async () => {
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