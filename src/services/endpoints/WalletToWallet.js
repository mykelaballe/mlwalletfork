import Fetch from '../../utils/Fetch'

export default {
    sendWalletToWallet: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getWalletReceivers: async payload => {
        let res = await Fetch.get(`wallettowallet/receiverlist?walletNo=${payload.walletno}`)
        return res.recieverlists || []
    },

    searchWalletReceiver: async payload => {
        let params = [
            `walletno=${payload.walletno}`
        ]

        if(payload.firstname) params.push(`firstname=${payload.firstname}`)
        if(payload.lastname) params.push(`lastname=${payload.lastname}`)
        if(payload.mobile_no) params.push(`mobileNum=${payload.mobile_no}`)

        let endpoint = payload.mobile_no ? 'searchreceiver/mobilenumber' : 'searchreceiver'

        let res = await Fetch.get(`wallettowallet/${endpoint}?${params.join('&')}`)

        return res.respcode === 1 ? res : null
    },

    addWalletReceiver: async payload => {
        return await Fetch.post('wallettowallet/addreceiver',payload)
    },

    deleteWalletReceiver: async payload => {
        return await Fetch.delete(`wallettowallet/deletereceiver?receiverNo=${payload.walletno}`)
    }
}