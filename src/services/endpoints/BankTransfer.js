import Fetch from '../../utils/Fetch'

export default {
    sendBankTransfer: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getBankPartners: async walletno => {
        let res = await Fetch.get(`bankAccount/all?walletno=${walletno}`)
        return res.data || []
    },

    addBankPartner: async payload => await Fetch.post('bankAccount/add',payload),

    updateBankPartner: async payload => {
        return await Fetch.put('bankAccount/edit',payload)
    },

    deleteBankPartner: async payload => await Fetch.delete('bankAccount/delete',payload)
}