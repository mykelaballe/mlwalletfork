import Fetch from '../../utils/Fetch'

export default {
    requestOTP: async payload => await Fetch.post('sendOTP',payload),

    validateOTP: async payload => await Fetch.post('validateOTP',payload)
}