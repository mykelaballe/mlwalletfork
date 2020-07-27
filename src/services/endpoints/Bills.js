import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'

export default {
    payBill: async payload => {
        let res = await Fetch.postc('paybills',{
            ...payload,
            currency:'PHP',
            location:'',
            deviceid:Consts.deviceId,
            version:Consts.appVersion,
            isRTA:payload.isRTA,
            version:Consts.appVersion
        })

        if(res.respcode != 1) {
            return {
                error:true,
                message:res.respmessage
            }
        }

        return {
            error:false,
            message:res.respmessage,
            data: {
                kptn:res.Kptn,
                balance:res.newBalance
            }
        }
    },

    getAllBillers: async (category = '') => {
        let data = {}
        let res = await Fetch.getc(`bill_partners/all?category=${category}`)
        
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
        let data = []
        let res = await Fetch.getc(`partners/getBillerAccounts?walletno=${walletno}`)

        if(!res.error) data = res.data

        return data
    },

    getFavoriteBillers: async walletno => {
        let data = []
        let res = await Fetch.getc(`partners/getFavoriteAccounts?walletno=${walletno}`)

        if(!res.error) data = res.data

        return data
    },

    getRecentBillers: async walletno => {
        let data = []
        let res = await Fetch.getc(`recent?${JSON.stringify({type:Consts.tcn.bpm.code, walletno})}`)

        if(res.data) data = res.data

        return data
    },

    addBiller: async payload => await Fetch.postc(`partners/addBillerAccount`,payload),

    updateBiller: async payload => await Fetch.putc(`partners/updateBillerAccount`,payload),

    deleteBiller: async payload => await Fetch.deletec(`partners/deleteBillerAccount?walletno=${payload.walletno}&id=${payload.id}`),

    addFavoriteBiller: async payload => await Fetch.putc(`partners/addToFavorite?walletno=${payload.walletno}&id=${payload.id}`),

    removeFavoriteBiller: async payload => await Fetch.deletec(`partners/removeFromFavorite?walletno=${payload.walletno}&id=${payload.id}`),

    updateFavoriteBiller: async payload => {
        return {error:false}
        return await Fetch.put('',payload)
    },
}