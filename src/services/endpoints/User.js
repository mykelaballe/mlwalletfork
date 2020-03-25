import Fetch from '../../utils/Fetch'

export default {
    updateProfile: async payload => {
        return await Fetch.put('updateProfile',payload)
    },

    requestUpdateProfile: async payload => {
        return await Fetch.post('send_wallet_request',{
            ...payload,
            reason:payload.reasons ? payload.reasons.join(';') : ''
        })
    },

    changePassword: async payload => await Fetch.put('changePassword',payload),

    getAccountInfo: async walletno => await Fetch.get(`wallet/info?walletno=${walletno}`)
}