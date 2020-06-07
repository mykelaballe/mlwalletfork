import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'
import Crypt from '../../utils/Crypt'

export default {
    sendWalletToWalletValidate: async payload => {
        let res = await Fetch.get(`sendout/wallettowallet/validate?walletno=${payload.walletno}&principal=${payload.amount}&isMLP=1`)

        return {
            ...res,
            error:res.respcode == 1 ? false : true,
            message:res.respmessage
        }
    },

    sendWalletToWallet: async payload => {
        let res = await Fetch.post('sendmoney/wallettowallet',{
            ...payload,
            currency:'PHP',
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
        let res = await Fetch.get(`wallettowallet/receiverlist?walletno=${walletno}`)
        return res.recieverlists || []
    },

    getFavoriteWalletReceivers: async walletno => {
        let res = await Fetch.get(`walletFavorites/${Crypt.en(walletno)}`)
        return res.data || []
    },

    getRecentWalletReceivers: async walletno => {
        let res = await Fetch.get(`recent/${Consts.tcn.stw.code}/${Crypt.en(walletno)}`)
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

        return {
            ...res,
            error:res.respcode == 0,
            message:res.respmessage
        }
    },

    addWalletReceiver: async payload => {
        let res = await Fetch.post('wallettowallet/addreceiver',payload)

        return {
            ...res,
            error:res.respcode == 0,
            message:res.respmessage
        }
    },

    deleteWalletReceiver: async payload => await Fetch.delete(`wallettowallet/deletereceiver?receiverNo=${payload.walletno}`),

    addFavoriteWalletReceiver: async payload => await Fetch.post(`walletFavorites`,payload),

    removeFavoriteWalletReceiver: async payload => await Fetch.delete(`walletFavorites`,payload)
}