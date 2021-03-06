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
        let data = []
        let res = await Fetch.getc('getNetworks')

        if(res.error) return res
        
        if(!res.error && res.data) {
            res.data.map(d => {
                data.push({
                    id: d.networkID,
                    label: d.network,
                    value: d.networkID
                })

                /*if(data[d.network] === undefined) {
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
                })*/
            })
        }
        
        return data
    },

    getLoadOptions: async (networkID, mobileno) => {
        let data = {
            regulars:[],
            promos:[]
        }
        let res = await Fetch.getc(`getRegularPromoLoad?${JSON.stringify({networkID, mobileno})}`)

        if(res.error) return res

        if(!res.error && res.data) {
            res.data.regular.map(d => {
                data.regulars.push({
                    amount:d.Amount.toString(),
                    promoCode:d.promoCode,
                    selected:false
                })
            })

            res.data.promo.map(d => data.promos.push(d))
        }

        return data
    },

    getLoadPromoCodes: async network => {
        let res = await Fetch.getc(`getPromos?network=${network}`)
        return res.data || []
    },
}