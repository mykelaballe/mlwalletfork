import Consts from '../utils/Consts'
import Fetch from '../utils/Fetch'
import Storage from '../utils/Storage'

export default {
    login: async payload => {
        let res = await Fetch.post('login', payload)

        if(res.access_token) {
            await Storage.doSave(Consts.db.user, {...res})
        }

        return res
    },
}