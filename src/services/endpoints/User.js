import Fetch from '../../utils/Fetch'

export default {
    updateProfile: async payload => await Fetch.put('updateProfile',payload),

    changePassword: async payload => await Fetch.put('changePassword',payload),
}