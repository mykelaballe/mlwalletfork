import axios from 'axios'
import Consts from './Consts'
import Storage from './Storage'
import Crypt from './Crypt'

let headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const callAPI = async (method, url, data = null) => {
  let user = await Storage.doLoad(Consts.db.user)
  if(user) {
    headers.Authorization = `Bearer ${user.access_token}`
  }

  url = `${Consts.baseURL}${url}`

  /*if(url.indexOf('?') >= 0) {
    let url_pieces = url.split('?')
    url = `${url_pieces[0]}?${Crypt.en(url_pieces[1])}`
  }*/

  let response = await axios({
    method,
    url,
    headers,
    data
  })

  return response.data.ciphertext ? Crypt.de(response.data.ciphertext) : response.data
}

export default {

  post: async (url, data = null) => callAPI('post', url, data),

  put: async(url, data = null) => callAPI('put', url, data),

  delete: async (url, data = null) => callAPI('delete', url, data),

  get: async url => callAPI('get', url)
}