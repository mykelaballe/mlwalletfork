import Fetch from '../../utils/Fetch'

export default {
    withdrawCashValidate: async payload => {
        return {error:false}
        return await Fetch.post('withdrawcash/validate',payload)
    },

    withdrawCash: async payload => {
        return {error:false}
        return await Fetch.post('withdrawcash/validate',payload)
    },
}