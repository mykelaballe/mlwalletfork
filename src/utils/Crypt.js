import Consts from './Consts'

const CryptoJS = require('crypto-js')
const AES = require('crypto-js/aes')

let key = CryptoJS.enc.Utf8.parse(Consts.cipher.key)
let iv = CryptoJS.enc.Utf8.parse(Consts.cipher.iv)

const config = {
    iv,
    keySize:128 / 8
}

const en = data => {
    //return data
    if(typeof data === 'object') data = JSON.stringify(data)
    return AES.encrypt(data, key, config).toString()
}

const de = encryptedData => {
    let bytes  = AES.decrypt(encryptedData, key, config)
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

export default {
    en,
    de
}