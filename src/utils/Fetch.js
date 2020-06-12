import axios from 'axios'
import Consts from './Consts'
import Storage from './Storage'
import Crypt from './Crypt'
import {Clipboard} from 'react-native'

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const callAPI = async (method, url, data = null, crypt = false) => {
  let user = await Storage.doLoad(Consts.db.user)
  if(user) {
    headers.Authorization = `Bearer ${user.access_token}`
  }

  url = `${Consts.baseURL}${url}`

  if(crypt) {
    if(url.indexOf('?') >= 0) {
      let url_pieces = url.split('?')
      url = `${url_pieces[0]}?ciphertext=${Crypt.en(url_pieces[1])}`
      //url = `${url_pieces[0]}?ciphertext=${Crypt.en(JSON.stringify(url_pieces[1]))}`
    }
  }

  let config = {
    method,
    url,
    headers
  }

  if(data) {
    config.data = crypt ? JSON.stringify({ciphertext:Crypt.en(data)}) : JSON.stringify(data)
  }

  //Clipboard.setString(config.url)
  //Clipboard.setString(config.data)

  let response = await axios(config)

  //console.warn(response.data)

  return response.data.ciphertext ? Crypt.de(response.data.ciphertext) : response.data
}

export default {
  post: async (url, data = null) => callAPI('post', url, data),

  put: async(url, data = null) => callAPI('put', url, data),

  delete: async (url, data = null) => callAPI('delete', url, data),

  get: async url => callAPI('get', url),

  //Crypt enabled
  postc: async (url, data = null) => callAPI('post', url, data, true),

  putc: async(url, data = null) => callAPI('put', url, data, true),

  deletec: async (url, data = null) => callAPI('delete', url, data, true),

  getc: async url => callAPI('get', url, null, true)
}