import Consts from '../utils/Consts'
import Crypt from '../utils/Crypt'
import axios from 'axios'

export default async user => {
    let headers = {
        'Accept':'application/json',
        'Content-Type':'application/json'
    }

    const payload = {
        username:user.username,
        deviceid:Consts.deviceId,
        token:user.access_token
    }
  
    let verifyTokenRes = await axios({
        method:'post',
        url:`${Consts.baseURL}wallet/verify_login`,
        headers,
        data:JSON.stringify({ciphertext:Crypt.en(payload)})
    })

    let verifyTokenData = Crypt.de(verifyTokenRes.data.ciphertext)

    if(verifyTokenData.error) {
        await axios({
            method:'post',
            url:`${Consts.baseURL}wallet/logout`,
            headers,
            data:JSON.stringify({ciphertext:Crypt.en(payload)})
        })
        throw 'unauthorize'
    }
    else {
        return true
    }
}