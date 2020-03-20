import Fetch from '../../utils/Fetch'

export default {
    updateProfile: async payload => await Fetch.put('updateProfile',payload),

    requestUpdateProfile: async payload => {
        return await Fetch.post('send_wallet_request',{
            ...payload,
            reason:payload.reasons ? payload.reasons.join(';') : ''
        })
    },

    changePassword: async payload => {return {error:false}},//await Fetch.put('changePassword',payload),
}