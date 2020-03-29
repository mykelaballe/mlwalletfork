import {Consts, Fetch} from "../../utils"

export default {
    buyLoad: async payload => {
        return await Fetch.post('LoadSIM',{
            ...payload,
            deviceid:Consts.deviceId,
            latitude:'1.1',
            longitude:'1.1',
            location:'cebu'
        })
    },

    getELoadReceivers: async walletno => {
        return [
            {
                receiverno:1,
                fullname:'John Andrews Smith',
                mobileno:'0912345678'
            },
            {
                receiverno:2,
                fullname:'Greg WAIVED Odom',
                mobileno:'0945532234'
            }
        ]
        let res = await Fetch.post(`getLoadReceiver`,{
            _walletno:walletno
        })

        return res.data || []
    },

    addELoadReceiver: async payload => await Fetch.post('addLoadReceiver',payload),

    updateELoadReceiver: async payload => await Fetch.put('updateLoadReceiver',payload),
    
    deleteELoadReceiver: async payload => await Fetch.delete('deleteLoadReceiver',payload),

    getFavoriteELoadReceivers: async walletno => {
        let res = await Fetch.get(`eloadFavorites/${walletno}`)
        return res.data || []
    },

    addFavoriteELoadReceiver: async payload => {
        return await Fetch.post(`eloadFavorites/${payload.receiverno}`)
    },

    removeFavoriteELoadReceiver: async payload => {
        return await Fetch.delete(`eloadFavorites/${payload.receiverno}`)
    },

    getRecentELoadReceivers: async walletno => {
        return []
        let res = await Fetch.get(`eload/recentreceiverlist?walletno=${walletno}`)
        return res.data || []
    },

    getLoadPromoCodes: async network => {
        let res = await Fetch.get(`getPromos?network=${network}`)
        return res.data
        return [
            {
                loadType:'All Text 20 Combo',
                networkID:'MLNET16060001',
                promoCode:'WAT020',
                Amount:0,
                promoName:'All Text 20 Combo'
            },
            {
                loadType:'Gaan All In One 99',
                networkID:'MLNET16060001',
                promoCode:'WGA99',
                Amount:0,
                promoName:'Gaan All In One 99'
            },
            {
                loadType:'Gaan Text Plus 2 Day',
                networkID:'MLNET16060001',
                promoCode:'WGT20',
                Amount:0,
                promoName:'Gaan Text Plus 2 Day'
            },
        ]
    },
}