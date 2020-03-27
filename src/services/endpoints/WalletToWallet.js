import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'

export default {
    sendWalletToWalletValidate: async payload => {
        let res = await Fetch.get(`sendout/wallettowallet/validate?walletno=${payload.walletno}&principal=${payload.amount}&isMLP=1`)

        return {
            ...res,
            error:res.respcode === 1,
            message:res.respmessage
        }
    },

    sendWalletToWallet: async payload => {
        return await Fetch.post('sendout/wallettowallet',{
            ...payload,
            currency:'PHP',
            latitude:'1.1',
            longitude:'1.2',
            location:'cebu',
            version:Consts.appVersion,
            deviceid:Consts.deviceId
        })
    },

    getWalletReceivers: async walletno => {
        return [
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
        ]
        let res = await Fetch.get(`wallettowallet/receiverlist?walletno=${walletno}`)
        return res.recieverlists || []
    },

    getFavoriteWalletReceivers: async walletno => {
        return []
        let res = await Fetch.get(`wallettowallet/favoritereceiverlist?walletno=${walletno}`)
        return res.recieverlists || []
    },

    getRecentWalletReceivers: async walletno => {
        return []
        let res = await Fetch.get(`wallettowallet/recentreceiverlist?walletno=${walletno}`)
        return res.recieverlists || []
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

        return res
    },

    addWalletReceiver: async payload => await Fetch.post('wallettowallet/addreceiver',payload),

    deleteWalletReceiver: async payload => await Fetch.delete(`wallettowallet/deletereceiver?receiverNo=${payload.walletno}`),

    addFavoriteWalletReceiver: async receiverno => {
        return {error:false}
        return await Fetch.post(`wallettowallet/addfavorite/${receiverno}`)
    },

    removeFavoriteWalletReceiver: async receiverno => {
        return {error:false}
        return await Fetch.delete(`wallettowallet/removefavorite/${receiverno}`)
    }
}