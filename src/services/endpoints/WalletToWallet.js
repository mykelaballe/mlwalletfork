import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'
import Crypt from '../../utils/Crypt'

export default {
    sendWalletToWalletValidate: async payload => {
        //let res = await Fetch.get(`sendout/wallettowallet/validate?walletno=${payload.walletno}&principal=${payload.amount}&isMLP=1`)
        let res = await Fetch.getc(`sendout/wallettowallet/validate?${JSON.stringify({
            walletno:payload.walletno,
            principal:payload.amount,
            isMLP:1
        })}`)

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
        //let res = await Fetch.get(`wallettowallet/receiverlist?walletno=${walletno}`)
        let res = await Fetch.getc(`wallettowallet/receiverlist?${JSON.stringify({walletno})}`)
        return res.recieverlists || []
    },

    getFavoriteWalletReceivers: async walletno => {
        //let res = await Fetch.get(`walletFavorites/${walletno}`)
        let res = await Fetch.getc(`walletFavorites?${JSON.stringify({walletno})}`)
        return res.data || []
    },

    getRecentWalletReceivers: async walletno => {
        //let res = await Fetch.get(`recent/${Consts.tcn.stw.code}/${walletno}`)
        let res = await Fetch.getc(`recent?${JSON.stringify({type:Consts.tcn.stw.code, walletno})}`)
        return res.data || []
    },

    searchWalletReceiver: async payload => {
        /*let params = [
            `${payload.mobile_no ? 'walletnum' : 'walletno'}=${payload.walletno}`
        ]*/

        let params = {
            walletno:payload.walletno
        }

        //if(payload.mobile_no) params.walletnum = payload.walletno
        //else params.walletno = payload.walletno

        /*if(payload.firstname) params.push(`firstname=${payload.firstname}`)
        if(payload.lastname) params.push(`lastname=${payload.lastname}`)
        if(payload.mobile_no) params.push(`mobileNum=${payload.mobile_no}`)*/

        if(payload.firstname) params.firstname = payload.firstname
        if(payload.lastname) params.lastname = payload.lastname
        if(payload.mobile_no) params.mobileno = payload.mobile_no

        let endpoint = params.mobileNum ? 'searchreceiver/mobilenumber' : 'searchreceiver'

        //let res = await Fetch.get(`wallettowallet/${endpoint}?${params.join('&')}`)
        let res = await Fetch.getc(`wallettowallet/${endpoint}?${JSON.stringify(params)}`)

        return {
            ...res,
            error:res.respcode == 0,
            message:res.respmessage
        }
    },

    addWalletReceiver: async payload => {
        let res = await Fetch.postc('wallettowallet/addreceiver',payload)

        return {
            ...res,
            error:res.respcode == 0,
            message:res.respmessage
        }
    },

    deleteWalletReceiver: async payload => {
        let res = await Fetch.deletec(`wallettowallet/deletereceiver`,payload)

        return {
            ...res,
            error:res.respcode == 0,
            message:res.respmessage
        }
    },

    addFavoriteWalletReceiver: async payload => await Fetch.postc(`walletFavorites`,payload),

    removeFavoriteWalletReceiver: async payload => await Fetch.deletec(`walletFavorites`,payload)
}