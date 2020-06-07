import Fetch from '../../utils/Fetch'

export default {
    updateProfile: async payload => await Fetch.putc('editProfile',payload),

    requestUpdateProfile: async payload => {
        return await Fetch.postc('send_wallet_request',{
            ...payload,
            reason:payload.reasons ? payload.reasons.join(';') : ''
        })
    },

    changePassword: async payload => await Fetch.putc('changePassword',payload),

    getAccountInfo: async walletno => await Fetch.get(`wallet/info?walletno=${walletno}`),

    updateQR: async payload => await Fetch.putc('update/qrcode',payload)
}