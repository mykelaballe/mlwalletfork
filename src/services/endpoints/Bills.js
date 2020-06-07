import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'
import Crypt from '../../utils/Crypt'

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

        if(res.respcode != 1) {
            return {
                error:true,
                message:res.respmessage
            }
        }

        console.warn(res)

        return {
            error:false,
            message:res.respmessage,
            data: {
                kptn:res.Kptn,
                balance:res.balance
            }
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

            //data = data.concat(Object.values(data))
        }
        
        return Object.values(data)
    },

    getBillers: async walletno => {
        let data = []
        let res = await Fetch.get(`partners/getBillerAccounts?walletno=${walletno}`)

        if(!res.error) data = res.data

        return data
    },

    getFavoriteBillers: async walletno => {
        let data = []
        let res = await Fetch.get(`partners/getFavoriteAccounts?walletno=${walletno}`)

        if(!res.error) data = res.data

        return data
    },

    getRecentBillers: async walletno => {
        let data = []
        let res = await Fetch.get(`recent/${Consts.tcn.bpm.code}/${Crypt.en(walletno)}`)

        if(!res.error) data = res.data

        return data
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