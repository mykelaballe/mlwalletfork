import Consts from '../utils/Consts'
import Fetch from '../utils/Fetch'
import Storage from '../utils/Storage'

export default {
    login: async payload => {
        return {
            id:1,
            firstname:'John',
            lastname:'Doe',
            access_token:'123456'
        }

        /*let res = await Fetch.post('login', {
            ...payload,
            grant_type:'password'
        })*/

        if(res.access_token) {
            await Storage.doSave(Consts.db.user, {...res})
        }

        return res
    },

    checkVersion: async () => {
        return await Fetch.get('')
    },

    getKPRates: async () => {
        return await Fetch.get('getwalletcharge')
    },

    getCashoutRates: async () => {

    },
}