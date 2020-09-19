import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'
import Crypt from '../../utils/Crypt'
import axios from 'axios'

export default {
    buyLoad: async payload => {
        let res = await Fetch.postc('LoadSIM',{
            ...payload,
            deviceid:Consts.deviceId,
            location:'',
            version:Consts.appVersion
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
        let res = await Fetch.getc(`eloadFavorites?${JSON.stringify({walletno})}`)
        return res.data || []
    },

    addFavoriteELoadReceiver: async payload => await Fetch.postc(`eloadFavorites?${JSON.stringify({receiverno:payload.receiverno})}`),

    removeFavoriteELoadReceiver: async payload => await Fetch.deletec(`eloadFavorites?${JSON.stringify({receiverno:payload.receiverno})}`),

    getRecentELoadReceivers: async walletno => {
        let res = await Fetch.getc(`recent?${JSON.stringify({type:Consts.tcn.bul.code, walletno})}`)
        return res.data || []
    },

    getLoadNetworks: async () => {
        let data = {}
        let res = await axios({
            method: 'get',
            url: 'https://mluatservice.mlhuillier1.com:4444/Partners/Eload/EloadSaving/EloadSaving.svc/getNetworkListv2'
        })

        if(res.status == 200 && res.data.getNetworkListV2Result && res.data.getNetworkListV2Result.respMsg == 'Success') {
            res.data.getNetworkListV2Result.NetworkList.map(d => {
                if(data[d.network] === undefined) {
                    data[d.network] = {
                        id: d.networkID,
                        label: d.network,
                        value: d.networkID,
                        promos: []
                    }
                }

                data[d.network].promos.push({
                    loadType: d.loadType,
                    promoCode: d.promoCode,
                    promoName: d.promoName,
                    Amount: d.Amount
                })
            })
        }
        
        return Object.values(data)
    },

    getLoadPromoCodes: async network => {
        let res = await Fetch.getc(`getPromos?network=${network}`)
        return res.data || []
    },
}