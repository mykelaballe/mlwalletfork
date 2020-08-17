import Consts from './Consts'
import Storage from './Storage'
import database from '@react-native-firebase/database'

const clearExistingLogins = () => {
    return new Promise((resolve, reject) => {
        Storage.doLoad(Consts.db.user)
        .then(user => {
            if(user) {
                database().ref(`users/${user.walletno}`).off('value')
                database()
                .ref(`users/${user.walletno}`)
                .set({
                    deviceid:''
                })
                .catch(err => {})
            }

            resolve(true)
        })
    })
}

export default {
    clearExistingLogins
}