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
        return {
            username:'johnsmith',
            password:'123',
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
            isresetpass:"0",
            isresetpin:"0",
            error:payload.username == 'newphone' ? 'registered_anotherdevice' : null
        }
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

    validateUsername: async username => {return {error:false,data:{walletno:'123',secquestion1:'one',secquestion2:'two',secquestion3:'three'}}},//await Fetch.post('validateUsername',{username}),

    validateSecurityQuestion: async payload => {return {error:false}},//await Fetch.post('validateSecurityQuestion',payload),

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

    getRates: async () => await Fetch.get('getchargevalues'),

    getBranches: async () => await Fetch.get(''),

    getNotifications: async params => {
        let res = await Fetch.get(`getnotificationlist?walletno=${params.walletno}&start=${params.start}`)
        return res.data.notificationList || []
    },

    getCountries: async () => {
        let data = {}
        let res = {
            data: [
                {
                    name:'Afghanistan'
                },
                {
                    name:'Albania'
                },
                {
                    name:'Andorra'
                },
                {
                    name:'Algeria'
                },
                {
                    name:'Andorra'
                },
                {
                    name:'Angola'
                }
            ]
        }
        //let res = await Fetch.get('getCountries')

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
        let res = {
            data:[
                {
                    province:'ABRA',
                    provCode:'1401'
                },
                {
                    province:'AGUSAN DEL NORTE',
                    provCode:'1602'
                },
                {
                    province:'AGUSAN DEL SUR',
                    provCode:'1603'
                },
                {
                    province:'AKLAN',
                    provCode:'0604'
                }
            ]
        }
        //let res = await Fetch.get('getProvinces')

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

    getCities: async provinceCode => {
        let data = {}
        let res = {
            data:[
                {
                    city:'AGOO',
                    zipCode:'2504'
                },
                {
                    city:'ARINGAY',
                    zipCode:'2503'
                },
                {
                    city:'BACNOTAN',
                    zipCode:'2515'
                },
                {
                    city:'BAGULIN',
                    zipCode:'2512'
                },
                {
                    city:'BALAOAN',
                    zipCode:'2517'
                },
            ]
        }
        //let res = await Fetch.get(`getCities/${provinceCode}`)

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
}