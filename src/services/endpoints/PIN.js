import Fetch from '../../utils/Fetch'

export default {
    validatePIN: async payload => {
        return {error:false}
        return await Fetch.post('validatePin',{
            walletno:payload.walletno,
            current_pin:payload.pin
        })
    },

    forgotPIN: async payload => {
        return {error:false}
        return await Fetch.get(`forgotpin?flag_num=${payload.flag_num}&walletno=${payload.walletno}`)
    },

    changePIN: async payload => await Fetch.put('changePin',payload),
}