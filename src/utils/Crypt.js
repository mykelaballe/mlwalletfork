import {NativeModules} from 'react-native'
import RNCryptor from 'react-native-rncryptor'

var Aes = NativeModules.Aes

const PASSWORD = 'test'

const generateKey = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length)

const encryptData = (text, key) => {
    return Aes.randomKey(16).then(iv => {
        return Aes.encrypt(text, key, iv).then(cipher => ({
            cipher,
            iv,
        }))
    })
}

const en = async text => {
    try {
        generateKey('Arnold', 'salt', 5000, 256).then(key => {
            console.log('Key:', key)
            encryptData('These violent delights have violent ends', key)
                .then(({ cipher, iv }) => {
                    console.log('Encrypted:', cipher)
    
                    /*decryptData({ cipher, iv }, key)
                        .then(text => {
                            console.log('Decrypted:', text)
                        })
                        .catch(error => {
                            console.log(error)
                        })
    
                    Aes.hmac256(cipher, key).then(hash => {
                        console.log('HMAC', hash)
                    })*/
                })
                .catch(error => {
                    console.log(error)
                })
        })
    } catch (e) {
        console.error(e)
    }
    /*return RNCryptor.encrypt(text, PASSWORD)
    .then(encryptedbase64 => {
        return encryptedbase64
    })
    .catch(err => {
        console.log(err)
    })*/
}

const de = async base64 => {
    return RNCryptor.decrypt(base64, PASSWORD)
    .then(text => {
        return text
    })
    .catch(err => {
        console.log(err)
    })
}

export default {
    en,
    de
}