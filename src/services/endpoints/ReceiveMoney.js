import Fetch from '../../utils/Fetch'

export default {
    receiveMoneyDomestic: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    receiveMoneyInternational: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },
}