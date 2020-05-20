import axios from 'axios'
import Consts from './Consts'
import Storage from './Storage'

//import CryptoJS from 'react-native-crypto-js'

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export default {

  post: async (url, data = null) => {

    let user = await Storage.doLoad(Consts.db.user)
    if(user) {
      headers.Authorization = 'Bearer ' + user.access_token
    }

    url = `${Consts.baseURL}${url}`

    let response = await axios({
      method: 'post',
      url,
      headers,
      data
    })

    return response.data
  },

  put: async(url, data = null) => {

    let user = await Storage.doLoad(Consts.db.user)
    if(user) {
      headers.Authorization = 'Bearer ' + user.access_token
    }

    url = `${Consts.baseURL}${url}`

    let response = await axios({
      method: 'put',
      url,
      headers,
      data
    })

    return response.data
  },

  delete: async (url, data = null) => {

    let user = await Storage.doLoad(Consts.db.user)
    if(user) {
      headers.Authorization = 'Bearer ' + user.access_token
    }

    url = `${Consts.baseURL}${url}`

    let response = await axios({
      method: 'delete',
      url,
      headers,
      data
    })

    return response.data
  },

  get: async url => {

    let user = await Storage.doLoad(Consts.db.user)
    if(user) {
      headers.Authorization = 'Bearer ' + user.access_token
    }

    url = `${Consts.baseURL}${url}`

    let response = await axios({
      method: 'get',
      url,
      headers,
    })

    let responseData = response.data

    //let bytes = CryptoJS.AES.decrypt(responseData.ciphertext, 'mlinc12345678900', 'mlinc12345678900')
    //return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    return responseData
  }
}