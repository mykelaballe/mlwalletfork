import Fetch from '../../utils/Fetch'

export default {
    withdrawCashValidate: async payload => await Fetch.post('withdrawcash/validate',payload),

    withdrawCash: async payload => {
        return await Fetch.post('withdrawcash/withdraw',{
            ...payload,
            location:'cebu',
            latitude:'11.11',
            longitude:'2.22'
        })
    },

    withdrawCashCancel: async payload => await Fetch.post('withdrawcash/cancel',payload)
}