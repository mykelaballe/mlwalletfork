import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'

export default {
    withdrawCashValidate: async payload => await Fetch.postc('withdrawcash/validate',payload),

    withdrawCash: async payload => {
        return await Fetch.postc('withdrawcash/withdraw',{
            ...payload,
            location:'',
            deviceid:Consts.deviceId
        })
    },

    attemptWithdrawCashCancel: async payload => await Fetch.postc('cancelattempt',payload),

    withdrawCashCancel: async payload => await Fetch.postc('withdrawcash/cancel',{
        ...payload,
        deviceid:Consts.deviceId,
        location:''
    })
}