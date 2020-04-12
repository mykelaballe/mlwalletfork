import Fetch from '../../utils/Fetch'

export default {
    withdrawCashValidate: async payload => await Fetch.post('withdrawcash/validate',payload),

    withdrawCash: async payload => {
        return await Fetch.post('withdrawcash/withdraw',{
            ...payload,
            location:''
        })
    },

    withdrawCashCancel: async payload => await Fetch.post('withdrawcash/cancel',payload)

}