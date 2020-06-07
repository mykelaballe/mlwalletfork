import Fetch from '../../utils/Fetch'

export default {
    validatePIN: async payload => {
        return await Fetch.postc('validatePin',{
            walletno:payload.walletno,
            current_pin:payload.pin
        })
    },

    forgotPIN: async payload => await Fetch.getc(`forgotpin?flag_num=${payload.flag_num}&walletno=${payload.walletno}`),

    changePIN: async payload => await Fetch.putc('changePin',payload),
}