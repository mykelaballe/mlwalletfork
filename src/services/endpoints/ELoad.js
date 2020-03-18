import {Consts, Fetch} from "../../utils"

export default {
    buyLoad: async payload => {
        return {
            error:false
        }
        return await Fetch.post('LoadSIM',{
            ...payload,
            deviceid:Consts.deviceId,
            longitude:'1',
            location:'cebu'
        })
    },

    getELoadReceivers: async walletno => {
        /*return [
            {
                fullname:'John Smith',
                contact_no:'0912345678'
            }
        ]*/
        let res = await Fetch.post(`getLoadReceiver`,{
            _walletno:walletno
        })

        return res.data || []
    },

    addELoadReceiver: async payload => await Fetch.post('addLoadReceiver',payload),

    getLoadPromoCodes: async network => {
        //network - Globe, Smart Eload, Sun Cellular
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