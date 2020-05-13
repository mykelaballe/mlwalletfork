import RNCryptor from 'react-native-rncryptor'

const PASSWORD = 'test'

const en = async text => {
    return RNCryptor.encrypt(text, PASSWORD)
    .then(encryptedbase64 => {
        return encryptedbase64
    })
    .catch(err => {
        console.log(err)
    })
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