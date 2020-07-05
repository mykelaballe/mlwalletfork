import axios from 'axios'

import Consts from '../utils/Consts'
import Fetch from '../utils/Fetch'
import Storage from '../utils/Storage'
import Crypt from '../utils/Crypt'

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
        /*return {
            error:true,
            message:'old_user',
            data:{
                walletno:'123'
            }
        }*/
        /*return {
            error:false,
            data: {
                username:'johnsmith',
                password:'123',
                fname:'John',
                mname:'WAIVED',
                lname:'Smith',
                suffix:'NONE',
                birthdate:'1980-01-01',
                gender:'Male',
                emailaddress:'johnsmith@gmail.com',
                nationality:'Filipino',
                sourceofincome:'Business',
                country:'Philippines',
                province:'Cebu',
                city:'Talisay City',
                barangay:'Cansojong',
                street:'Canton',
                houseno:'123',
                zipcode:'6000',
                mobileno:'09326118146',
                walletno:'14040000000020',
                secquestion1:'What was the name of your first pet?',
                secquestion2:'What elementary school did you attend in Grade 6?',
                secquestion3:'What is the name of your childhood bestfriend?',
                balance:'50000',
                profilepic:null,
                validID:null,
                points:35,
                status:0,
                isresetpass:"0",
                isresetpin:"0",
                qrcode:'14040000000020',
                error:payload.username == 'newphone' ? 'registered_anotherdevice' : null
            }
        }*/
        let res = await Fetch.postc('wallet/login', {
            ...payload,
            location:'',
            deviceid:Consts.deviceId,
            devicetype:Consts.deviceType,
            version:Consts.appVersion,
            grant_type:'password'
        })

        if(!res.error) await Storage.doSave(Consts.db.user, res.data)

        return res
    },

    loginByTouchID: async () => await Fetch.get(`login/touchid?deviceId=${Consts.deviceId}`),

    updateTouchIDStatus: async payload => await Fetch.putc('update/touchid',payload),

    register: async payload => {
        return await Fetch.post('wallet/registration',{
            ...payload,
            deviceId:Consts.deviceId,
            version:Consts.appVersion,
        })
    },

    requestCustID: async () => {
        //return await Fetch.get('http://192.168.19.96\c$\inetpub\wwwroot\WalletDomesticKYC')
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
        //let res = await Fetch.get(`transactionhistory?walletno=${payload.walletno}&dfrom=${payload.from}&dto=${payload.to}&type=${payload.type}`)
        let res = await Fetch.getc(`transactionhistory?${JSON.stringify({
            walletno:payload.walletno,
            dfrom:payload.dfrom,
            dto:payload.dto,
            type:payload.type
        })}`)
        return res.listTransaction || []
    },

    getBranches: async () => {
        let res = await Fetch.get('ml_branches')
        if(res.error) return []
        return res.data || []
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
        //let res = await Fetch.get(`getCities/${provCode}`)
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
        data.append('is_base64',true)
        data.append('extract_details',true)

        let res = await axios({
            method: 'post',
            url: `https://ml-symph-ai.df.r.appspot.com/api/v2/id/validity`,
            data
        })

        //console.warn(res.data)

        return res.data
    },

    compareFace: async payload => {
        let data = new FormData()
        data.append('id_image',payload.id)
        data.append('face_image',payload.face)
        data.append('is_base64',true)

        let res = await axios({
            method: 'post',
            url: `https://ml-symph-ai.df.r.appspot.com/api/v2/face/compare`,
            data
        })

        //console.warn(res.data)

        return res.data
    }
}