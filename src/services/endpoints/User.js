import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'

export default {
    updateProfile: async payload => await Fetch.putc('editProfile',payload),

    reupdateProfile: async payload => await Fetch.put('updateInfo',payload),

    fullVerification: async payload => await Fetch.putc('wallet/fullyverified',payload),

    requestUpdateProfile: async payload => {
        return await Fetch.postc('send_wallet_request',{
            ...payload,
            reason:payload.reasons ? payload.reasons.join(';') : ''
        })
    },

    changePassword: async payload => await Fetch.putc('changePassword',payload),

    getAccountInfo: async walletno => await Fetch.get(`wallet/info?walletno=${walletno}`),

    updateQR: async payload => await Fetch.putc('update/qrcode',payload),

    getRemotePhoto: walletno => `${Consts.baseURL}wallet/image?walletno=${walletno}`
}