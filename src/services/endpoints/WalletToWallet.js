import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'

export default {
    sendWalletToWalletValidate: async payload => {
        let res = await Fetch.getc(`sendout/wallettowallet/validate?${JSON.stringify({
            walletno:payload.walletno,
            principal:payload.amount,
            isMLP:1
        })}`,true)

        return {
            ...res,
            error:res.respcode == 1 ? false : true,
            message:res.respmessage
        }
    },

    sendWalletToWallet: async payload => {
        let res = await Fetch.postc('sendmoney/wallettowallet',{
            ...payload,
            currency:'PHP',
            location:'',
            version:Consts.appVersion,
            deviceid:Consts.deviceId
        },true)

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
        let res = await Fetch.getc(`wallettowallet/receiverlist?${JSON.stringify({walletno})}`,true)
        return res.recieverlists || []
    },

    getFavoriteWalletReceivers: async walletno => {
        let res = await Fetch.getc(`walletFavorites?${JSON.stringify({walletno})}`,true)
        return res.data || []
    },

    getRecentWalletReceivers: async walletno => {
        let res = await Fetch.getc(`recent?${JSON.stringify({type:Consts.tcn.stw.code, walletno})}`,true)
        return res.data || []
    },

    searchWalletReceiver: async payload => {
        let params = {
            walletno:payload.walletno
        }

        if(payload.firstname) params.firstname = payload.firstname
        if(payload.lastname) params.lastname = payload.lastname
        if(payload.mobile_no) params.mobileno = payload.mobile_no

        let endpoint = params.mobileNum ? 'searchreceiver/mobilenumber' : 'searchreceiver'

        let res = await Fetch.getc(`wallettowallet/${endpoint}?${JSON.stringify(params)}`,true)

        return {
            ...res,
            error:res.respcode == 0,
            message:res.respmessage
        }
    },

    addWalletReceiver: async payload => {
        let res = await Fetch.postc('wallettowallet/addreceiver',payload,true)

        return {
            ...res,
            error:res.respcode == 0,
            message:res.respmessage
        }
    },

    deleteWalletReceiver: async payload => {
        let res = await Fetch.deletec(`wallettowallet/deletereceiver`,payload,true)

        return {
            ...res,
            error:res.respcode == 0,
            message:res.respmessage
        }
    },

    addFavoriteWalletReceiver: async payload => await Fetch.postc(`walletFavorites`,payload,true),

    removeFavoriteWalletReceiver: async payload => await Fetch.deletec(`walletFavorites`,payload,true)
}