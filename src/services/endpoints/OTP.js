import Fetch from '../../utils/Fetch'

export default {
    requestOTP: async payload => {return {error:false}},//await Fetch.post('sendOTP',payload),

    validateOTP: async payload => {return {error:false}}//await Fetch.post('validateOTP',payload)
}