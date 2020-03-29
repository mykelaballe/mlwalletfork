import Fetch from '../../utils/Fetch'

export default {
    receiveMoneyDomestic: async payload => {
        return await Fetch.post('domestic/payout',payload)
    },

    receiveMoneyInternational: async payload => {
        return {error:false}
        return await Fetch.post('',payload)
    },
}