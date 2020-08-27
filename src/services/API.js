import axios from 'axios'

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
import PIN from './endpoints/PIN'
import User from './endpoints/User'

export default {
    login: async payload => {
        let res = await Fetch.postc('wallet/login', {
            ...payload,
            location:'',
            deviceid:Consts.deviceId,
            devicetype:Consts.is_android ? 'android' : 'ios',
            version:Consts.appVersion,
            grant_type:'password'
        })

        if(!res.error) await Storage.doSave(Consts.db.user, res.data)

        return res
    },

    loginByTouchID: async () => await Fetch.get(`login/touchid?deviceId=${Consts.deviceId}`),

    updateTouchIDStatus: async payload => await Fetch.putc('update/touchid',{
        ...payload,
        deviceid:Consts.deviceId
    }),

    register: async payload => {
        return await Fetch.post('wallet/registration',{
            ...payload,
            deviceId:Consts.deviceId,
            version:Consts.appVersion,
        })
    },

    checkExistingSession: async payload => {
        return await Fetch.postc('wallet/verify_login', {
            username: payload.username,
            deviceid: Consts.deviceId,
            token: ''
        })
    },

    logout: async (payload = {}) => {
        let user = await Storage.doLoad(Consts.db.user)
        let username = payload.username || (user ? user.username : '')
        let token = payload.token || (user ? user.access_token : '')

        if(username && token) {
            await Storage.doSave(Consts.db.user)
            await Fetch.postc('wallet/logout', {
                username,
                deviceid: Consts.deviceId,
                token
            })
        }
    },

    requestCustID: async () => {
        return {
            custid:'123'
        }
    },

    forgotPassword: async payload => await Fetch.putc('forgotPassword',payload),

    checkVersion: async () => await Fetch.get(''),

    checkDeviceId: async () => await Fetch.get(`checkDeviceId?deviceId=${Consts.deviceId}`),

    updateDevice: async payload => await Fetch.putc('updateDevice',{username:payload.username, deviceid:Consts.deviceId}),

    validateUsername: async username => await Fetch.postc('validateUsername',{username}),

    validateSecurityQuestion: async payload => {
        if(payload.key) {
            return await Fetch.postc('validate_answers',{
                walletno:payload.wallet_no,
                type:payload.type,
                key:payload.key,
                answer:payload.answer
            })
        }

        return await Fetch.postc('validateSecurityQuestion',{
            wallet_no:payload.wallet_no,
            question:payload.question,
            answer:payload.answer
        })
    },

    ...WalletToWallet,
    ...KP,
    ...BankTransfer,
    ...ReceiveMoney,
    ...WithdrawCash,
    ...Bills,
    ...ELoad,
    ...OTP,
    ...PIN,
    ...User,

    checkBalance: async () => await Fetch.get('checkBalance'),

    getRates: async () => await Fetch.getc('getchargevalues'),

    getNotifications: async params => {
        let res = await Fetch.get(`getnotificationlist?walletno=${params.walletno}&start=${params.start}`)
        return res.data.notificationList || []
    },

    getTransactionHistory: async payload => {
        let res = await Fetch.getc(`transactionhistory?${JSON.stringify({
            walletno:payload.walletno,
            dfrom:payload.from,
            dto:payload.to,
            type:payload.type
        })}`)
        return res.listTransaction || []
    },

    getTransaction: async kptn => await Fetch.get(`transactiondate?ktpn=${kptn}`),

    getBranches: async () => {
        //let res = await Fetch.get('ml_branches')
        let data = []
        let res = await axios({
            method: 'get',
            url: 'https://mlmobileweb.mlhuillier1.com/Mobile/Client/6.5/MapService/MapService.svc/getCoordinates'
        })

        if(res.status == 200 && res.data.getCoordinatesResult && res.data.getCoordinatesResult.mapInfo) {
            data = res.data.getCoordinatesResult.mapInfo
        }

        return data
    },

    getCountries: async () => {
        let data = {}
        let res = await Fetch.getc('getCountries')

        if(res.data) {
            for(let d in res.data) {
                let letter = res.data[d].name[0]

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

    getProvinces: async () => {
        let data = {}
        let res = await Fetch.getc('getProvinces')

        if(res.data) {
            for(let d in res.data) {
                let letter = res.data[d].province[0]

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

    getCities: async provCode => {
        let data = {}
        let res = await Fetch.getc(`getCities?${JSON.stringify({provCode})}`)

        if(res.data) {
            for(let d in res.data) {
                let letter = res.data[d].city[0]

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

    validateID: async payload => {
        let data = new FormData()
        data.append('id_type',payload.type)
        data.append('id_image',payload.image)
        data.append('first_name',payload.first_name)
        data.append('last_name',payload.last_name)
        data.append('birth_date',payload.birth_date)
        data.append('birth_month',payload.birth_month)
        data.append('birth_year',payload.birth_year)
        data.append('is_base64',true)
        data.append('extract_details',true)

        let res = await axios({
            method: 'post',
            url: `https://ml-symph-ai.df.r.appspot.com/api/v2/id/validity`,
            data
        })

        return res.data
    },

    compareFace: async payload => {
        let data = new FormData()
        data.append('id_image',payload.id)
        data.append('face_image',payload.face)
        data.append('is_base64',true)

        let res = await axios({
            method: 'post',
            url: `https://ml-symph-ai.df.r.appspot.com/api/v1/face/compare`,
            data
        })

        return res.data
    }
}