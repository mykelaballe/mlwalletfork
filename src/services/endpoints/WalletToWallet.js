import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'

export default {
    sendWalletToWalletValidate: async payload => {
        let res = await Fetch.get(`sendout/wallettowallet/validate?walletno=${payload.walletno}&principal=${payload.amount}&isMLP=1`)

        if(res.respcode == 1) {
            return {
                ...res,
                error:false,
                message:res.respmessage
            }
        }

        return {
            error:true,
            message:res.respmessage
        }
    },

    sendWalletToWallet: async payload => {
        let res = await Fetch.post('sendmoney/wallettowallet',{
            ...payload,
            currency:'PHP',
            //latitude:'1.1',
            //longitude:'1.2',
            location:'',
            version:Consts.appVersion,
            deviceid:Consts.deviceId
        })

        if(res.respcode != 1) {
            return {
                error:true,
                message:res.respmessage
            }
        }

        return {
            error:false,
            message:res.respmessage,
            data: {
                kptn:res.kptn,
                balance:res.Balance
            }
        }
    },

    getWalletReceivers: async walletno => {
        /*return [
            {
                receiverno:1,
                walletno:'123',
                fullname:'Mary WAIVED Poppins',
                mobileno:'09121321'
            },
            {
                receiverno:2,
                walletno:'456',
                fullname:'Jane Grace Peters NONE',
                mobileno:'0955456'
            },
            {
                receiverno:3,
                walletno:'789',
                fullname:'Gary WAIVED Oak Jr',
                mobileno:'094435455'
            }
        ]*/
        let res = await Fetch.get(`wallettowallet/receiverlist?walletno=${walletno}`)
        return res.recieverlists || []
    },

    getFavoriteWalletReceivers: async walletno => {
        let res = await Fetch.get(`walletFavorites/${walletno}`)
        return res.data || []
    },

    getRecentWalletReceivers: async walletno => {
        let res = await Fetch.get(`recent/${Consts.tcn.stw.code}/${walletno}`)
        return res.data || []
    },

    searchWalletReceiver: async payload => {
        let params = [
            `${payload.mobile_no ? 'walletnum' : 'walletno'}=${payload.walletno}`
        ]

        if(payload.firstname) params.push(`firstname=${payload.firstname}`)
        if(payload.lastname) params.push(`lastname=${payload.lastname}`)
        if(payload.mobile_no) params.push(`mobileNum=${payload.mobile_no}`)

        let endpoint = payload.mobile_no ? 'searchreceiver/mobilenumber' : 'searchreceiver'

        let res = await Fetch.get(`wallettowallet/${endpoint}?${params.join('&')}`)

        if(res.respcode == 1) {
            return {
                ...res,
                error:false,
                message:res.respmessage
            }
        }

        return {
            error:true,
            message:res.respmessage
        }
    },

    addWalletReceiver: async payload => {
        let res = await Fetch.post('wallettowallet/addreceiver',payload)

        if(res.respcode == 1) {
            return {
                ...res,
                error:false,
                message:res.respmessage
            }
        }

        return {
            error:true,
            message:res.respmessage
        }
    },

    deleteWalletReceiver: async payload => await Fetch.delete(`wallettowallet/deletereceiver?receiverNo=${payload.walletno}`),

    addFavoriteWalletReceiver: async payload => {
        return await Fetch.post(`walletFavorites`,payload)
    },

    removeFavoriteWalletReceiver: async payload => {
        return await Fetch.delete(`walletFavorites`,payload)
    }
}