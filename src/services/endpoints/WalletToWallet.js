import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'

export default {
    sendWalletToWalletValidate: async payload => {
        return await Fetch.get(`sendout/wallettowallet/validate?walletno=${payload.walletno}&principal=${payload.amount}&isMLP=1`)
    },

    sendWalletToWallet: async payload => {
        return await Fetch.post('sendout/wallettowallet',{
            ...payload,
            currency:'PHP',
            latitude:'1.1',
            longitude:'1.2',
            version:Consts.appVersion,
            deviceid:Consts.deviceId
        })
    },

    getWalletReceivers: async payload => {
        /*return [
            {
                receiverno:1,
                walletno:'123',
                fullname:'Mary Poppins'
            },
            {
                receiverno:2,
                walletno:'456',
                fullname:'Jane Peters'
            },
            {
                receiverno:3,
                walletno:'789',
                fullname:'Gary Oak'
            }
        ]*/
        let res = await Fetch.get(`wallettowallet/receiverlist?walletno=${payload.walletno}`)
        return res.recieverlists || []
    },

    getFavoriteWalletReceivers: async payload => {
        return []
        let res = await Fetch.get(`wallettowallet/favoritereceiverlist?walletno=${payload.walletno}`)
        return res.recieverlists || []
    },

    getRecentWalletReceivers: async payload => {
        return []
        let res = await Fetch.get(`wallettowallet/recentreceiverlist?walletno=${payload.walletno}`)
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

    addFavoriteWalletReceiver: async payload => {
        return {error:false}
        return await Fetch.post('wallettowallet/addfavorite',payload)
    },

    removeFavoriteWalletReceiver: async payload => {
        return {error:false}
        return await Fetch.post('wallettowallet/removefavorite',payload)
    }
}