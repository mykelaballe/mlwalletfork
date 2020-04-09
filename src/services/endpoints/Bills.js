import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'

export default {
    payBill: async payload => {
        return await Fetch.post('paybills',{
            ...payload,
            currency:'PHP',
            location:'',
            deviceid:Consts.deviceId,
            isRTA:''
        })
    },

    getAllBillers: async category => {
        let data = {}
        let res = await Fetch.get(`bill_partners/all?category=${category}`)
        
        if(res.data) {
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
        return []
        let res = await Fetch.get(`partners/recentreceiverlist?walletno=${walletno}`)
        return res.recieverlists || []
    },

    addBiller: async payload => {
        return await Fetch.post(`partners/addBillerAccount`,payload)
    },

    updateBiller: async payload => {
        return await Fetch.put(`partners/updateBillerAccount`,payload)
    },

    deleteBiller: async payload => {
        return await Fetch.delete(`partners/deleteBillerAccount?walletno=${payload.walletno}&id=${payload.id}`)
    },

    addFavoriteBiller: async payload => {
        return await Fetch.put(`partners/addToFavorite?walletno=${payload.walletno}&id=${payload.id}`)
    },

    removeFavoriteBiller: async payload => {
        return await Fetch.delete(`partners/removeFromFavorite?walletno=${payload.walletno}&id=${payload.id}`)
    },

    updateFavoriteBiller: async payload => {
        return {
            error:false
        }
        return await Fetch.put('',payload)
    },
}