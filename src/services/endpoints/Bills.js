import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'

export default {
    payBill: async payload => {
        let res = await Fetch.post('paybills',{
            ...payload,
            currency:'PHP',
            location:'',
            deviceid:Consts.deviceId,
            version:Consts.appVersion,
            isRTA:''
        })

        return {
            error:res.respcode == 1 ? false : true,
            message:res.respmessage,
            ...res
        }
    },

    getAllBillers: async category => {
        let data = {}
        let res = await Fetch.get(`bill_partners/all?category=${category}`)
        
        if(!res.error) {
            for(let d in res.data) {
                let letter = res.data[d].bill_partner_name[0]

                if(typeof data[letter] === 'undefined') {
                    data[letter] = {
                        letter,
                        data:[]
                    }
                }

                data[letter].data.push(res.data[d])
            }
        }
        
        return Object.values(data)
    },

    getBillers: async walletno => {
        let res = await Fetch.get(`partners/getBillerAccounts?walletno=${walletno}`)
        return res.data || []
    },

    getFavoriteBillers: async walletno => {
        let res = await Fetch.get(`partners/getFavoriteAccounts?walletno=${walletno}`)
        return res.data || []
    },

    getRecentBillers: async walletno => {
        let res = await Fetch.get(`recent/${Consts.tcn.bpm.code}/${walletno}`)
        return res.data || []
    },

    addBiller: async payload => await Fetch.post(`partners/addBillerAccount`,payload),

    updateBiller: async payload => await Fetch.put(`partners/updateBillerAccount`,payload),

    deleteBiller: async payload => await Fetch.delete(`partners/deleteBillerAccount?walletno=${payload.walletno}&id=${payload.id}`),

    addFavoriteBiller: async payload => await Fetch.put(`partners/addToFavorite?walletno=${payload.walletno}&id=${payload.id}`),

    removeFavoriteBiller: async payload => await Fetch.delete(`partners/removeFromFavorite?walletno=${payload.walletno}&id=${payload.id}`),

    updateFavoriteBiller: async payload => {
        return {error:false}
        return await Fetch.put('',payload)
    },
}