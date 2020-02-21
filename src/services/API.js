import Consts from '../utils/Consts'
import Fetch from '../utils/Fetch'
import Storage from '../utils/Storage'

export default {
    login: async payload => {
        let res = await Fetch.post('login', {
            ...payload,
            grant_type:'password'
        })

        if(res.access_token) {
            await Storage.doSave(Consts.db.user, {...res})
        }

        return res
    },

    checkVersion: async () => {
        return await Fetch.get('')
    },

    getRates: async () => {
        return await Fetch.get('getchargevalues')
    },

    getNotifications: async params => {
        return await Fetch.get(`getnotificationlist?walletno=${params.walletno}`)
    },
}