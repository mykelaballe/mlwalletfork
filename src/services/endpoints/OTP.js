import Fetch from '../../utils/Fetch'

export default {
    requestOTP: async payload => await Fetch.postc('sendOTP',payload),

    validateOTP: async payload => await Fetch.postc('validateOTP',payload)
}