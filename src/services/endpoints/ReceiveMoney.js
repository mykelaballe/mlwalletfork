import Fetch from '../../utils/Fetch'

export default {
    receiveMoneyDomestic: async payload => await Fetch.postc('domestic/payout',payload),

    receiveMoneyInternational: async payload => await Fetch.post('corporate/payout',payload)
}