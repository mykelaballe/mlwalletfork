import Fetch from '../../utils/Fetch'
import Consts from '../../utils/Consts'

export default {
    receiveMoneyDomestic: async payload => await Fetch.postc('domestic/payout',{
        ...payload,
        deviceID:Consts.deviceId
    }),

    receiveMoneyInternational: async payload => await Fetch.post('corporate/payout',{
        ...payload,
        deviceID:Consts.deviceId
    })
}