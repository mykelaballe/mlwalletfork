import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'
import Crypt from '../../utils/Crypt'

export default {
    buyLoad: async payload => {
        let res = await Fetch.postc('LoadSIM',{
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
        let res = await Fetch.postc(`getLoadReceiver`,{
            _walletno:walletno
        })

        return res.data || []
    },

    addELoadReceiver: async payload => await Fetch.postc('addLoadReceiver',payload),

    updateELoadReceiver: async payload => await Fetch.putc('updateLoadReceiver',payload),
    
    deleteELoadReceiver: async payload => await Fetch.deletec(`deleteLoadReceiver?${JSON.stringify({receiverno:payload.receiverno})}`),

    getFavoriteELoadReceivers: async walletno => {
        //let res = await Fetch.get(`eloadFavorites/${walletno}`)
        let res = await Fetch.getc(`eloadFavorites?${JSON.stringify({walletno})}`)
        return res.data || []
    },

    addFavoriteELoadReceiver: async payload => await Fetch.postc(`eloadFavorites?${JSON.stringify({receiverno:payload.receiverno})}`),

    removeFavoriteELoadReceiver: async payload => await Fetch.deletec(`eloadFavorites?${JSON.stringify({receiverno:payload.receiverno})}`),

    getRecentELoadReceivers: async walletno => {
        //let res = await Fetch.get(`recent/${Consts.tcn.bul.code}/${walletno}`)
        let res = await Fetch.getc(`recent?${JSON.stringify({type:Consts.tcn.bul.code, walletno})}`)
        return res.data || []
    },

    getLoadPromoCodes: async network => {
        let res = await Fetch.getc(`getPromos?network=${network}`)
        return res.data || []
    },
}