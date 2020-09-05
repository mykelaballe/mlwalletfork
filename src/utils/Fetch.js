import axios from 'axios'
import Consts from './Consts'
import Storage from './Storage'
import Crypt from './Crypt'
import VerifyToken from '../services/VerifyToken'

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const callAPI = async (method, url, data = null, crypt = false, verifyToken = false) => {
  let user = await Storage.doLoad(Consts.db.user)
  if(user) {
    headers.Authorization = `Bearer ${user.access_token}`
  }

  url = `${Consts.baseURL}${url}`

  if(crypt) {
    if(url.indexOf('?') >= 0) {
      let url_pieces = url.split('?')
      url = `${url_pieces[0]}?ciphertext=${Crypt.en(url_pieces[1])}`
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

  //FORCE LOGOUT
  try {
    if(user) await VerifyToken(user)
  }
  catch(err) {
   
  }

  let response = await axios(config)

  return response.data.ciphertext ? Crypt.de(response.data.ciphertext) : response.data
}

export default {
  post: async (url, data = null, verifyToken = false) => callAPI('post', url, data, false, verifyToken),

  put: async(url, data = null, verifyToken = false) => callAPI('put', url, data, false, verifyToken),

  delete: async (url, data = null, verifyToken = false) => callAPI('delete', url, data, false, verifyToken),

  get: async (url, verifyToken = false) => callAPI('get', url, null, false, verifyToken),

  //Crypt enabled
  postc: async (url, data = null, verifyToken = false) => callAPI('post', url, data, true, verifyToken),

  putc: async(url, data = null, verifyToken = false) => callAPI('put', url, data, true, verifyToken),

  deletec: async (url, data = null, verifyToken = false) => callAPI('delete', url, data, true, verifyToken),

  getc: async (url, verifyToken = false) => callAPI('get', url, null, true, verifyToken)
}