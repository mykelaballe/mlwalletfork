import Fetch from '../../utils/Fetch'

export default {
    sendWalletToWalletValidate: async payload => {
        return await Fetch.get(`sendout/wallettowallet/validateamount?walletno=${payload.walletno}&principal=${payload.amount}&isMLP=1`)
    },

    sendWalletToWallet: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getWalletReceivers: async payload => {
        let res = await Fetch.get(`wallettowallet/receiverlist?walletno=${payload.walletno}`)
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

    deleteWalletReceiver: async payload => await Fetch.delete(`wallettowallet/deletereceiver?receiverNo=${payload.walletno}`)
}