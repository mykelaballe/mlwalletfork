import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'
import Crypt from '../../utils/Crypt'

export default {
    buyLoad: async payload => {
        let res = await Fetch.post('LoadSIM',{
            ...payload,
            deviceid:Consts.deviceId,
            location:''
        })

        if(!res.error) {
            return {
                ...res,
                data:{
                    kptn:res.data.transactionNo,
                    balance:res.data.currentBalance
                }
            }
        }

        return res
    },

    getELoadReceivers: async walletno => {
        let res = await Fetch.post(`getLoadReceiver`,{
            _walletno:walletno
        })

        return res.data || []
    },

    addELoadReceiver: async payload => await Fetch.post('addLoadReceiver',payload),

    updateELoadReceiver: async payload => await Fetch.put('updateLoadReceiver',payload),
    
    deleteELoadReceiver: async payload => await Fetch.delete(`deleteLoadReceiver/${Crypt.en(payload.receiverno)}`),

    getFavoriteELoadReceivers: async walletno => {
        let res = await Fetch.get(`eloadFavorites/${Crypt.en(walletno)}`)
        return res.data || []
    },

    addFavoriteELoadReceiver: async payload => await Fetch.post(`eloadFavorites/${Crypt.en(payload.receiverno)}`),

    removeFavoriteELoadReceiver: async payload => await Fetch.delete(`eloadFavorites/${Crypt.en(payload.receiverno)}`),

    getRecentELoadReceivers: async walletno => {
        let res = await Fetch.get(`recent/${Consts.tcn.bul.code}/${Crypt.en(walletno)}`)
        return res.data || []
    },

    getLoadPromoCodes: async network => {
        let res = await Fetch.get(`getPromos?network=${network}`)
        return res.data || []
    },
}