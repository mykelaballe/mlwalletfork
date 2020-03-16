import Consts from '../utils/Consts'
import Fetch from '../utils/Fetch'
import Storage from '../utils/Storage'

import WalletToWallet from './endpoints/WalletToWallet'
import KP from './endpoints/KP'
import BankTransfer from './endpoints/BankTransfer'
import ReceiveMoney from './endpoints/ReceiveMoney'
import WithdrawCash from './endpoints/WithdrawCash'
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
            secquestion1:'What was the name of your first pet?',
            secquestion2:'What elementary school did you attend in Grade 6?',
            secquestion3:'What is the name of your childhood bestfriend?',
            balance:'50000',
            points:35,
            level:0,
            error:payload.username == 'newphone' ? 'registered_anotherdevice' : null
        }*/
        let res = await Fetch.post('login', {
            ...payload,
            deviceId:Consts.deviceId,
            devicetype:Consts.deviceType,
            version:Consts.appVersion,
            grant_type:'password'
        })

        if(res.access_token) {
            res = {
                ...res,
                mobile_no:res.mobileno,
                email:res.emailaddress,
                zip_code:res.zipcode,
                source_of_income:res.sourceofincome
            }
            await Storage.doSave(Consts.db.user, {...res})
        }

        return res
    },

    loginByTouchID: async () => await Fetch.get(`login/touchid?deviceId=${Consts.deviceId}`),

    updateTouchIDStatus: async payload => await Fetch.put('update/touchid',payload),

    register: async payload => {
        return await Fetch.post('wallet/registration',{
            ...payload,
            deviceId:Consts.deviceId,
            version:Consts.appVersion,
        })
    },

    forgotPassword: async payload => await Fetch.put('forgotPassword',payload),

    checkVersion: async () => await Fetch.get(''),

    checkDeviceId: async () => await Fetch.get(`checkDeviceId?deviceId=${Consts.deviceId}`),

    updateDevice: async payload => await Fetch.put('updateDevice',{username:payload.username, deviceid:Consts.deviceId}),

    validateUsername: async username => await Fetch.post('validateUsername',{username}),

    validateSecurityQuestion: async payload => await Fetch.post('validateSecurityQuestion',payload),

    ...WalletToWallet,
    ...KP,
    ...BankTransfer,
    ...ReceiveMoney,
    ...WithdrawCash,
    ...Bills,
    ...ELoad,

    ...OTP,
    ...User,

    checkBalance: async () => await Fetch.get('checkBalance'),

    getRates: async () => await Fetch.get('getchargevalues'),

    getBranches: async () => await Fetch.get(''),

    getNotifications: async params => {
        let res = await Fetch.get(`getnotificationlist?walletno=${params.walletno}&start=${params.start}`)
        return res.data.notificationList || []
    },
}