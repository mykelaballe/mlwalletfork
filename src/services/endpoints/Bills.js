import { Fetch } from "../../utils"

export default {
    payBill: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
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
        return await Fetch.get(`bill_partners/${walletno}`)
    },

    getFavoriteBillers: async walletno => {
        return []
        return [
            {
                id:1,
                partnersid:'MLB22324',
                partner:'CBN ASIA / 700 CLUB',
                account_name:'john',
                account_no:'1234',
                email:'john@gmail.com'
            },
            {
                id:2,
                partnersid:'MLB22324',
                partner:'CBN ASIA',
                account_name:'john',
                account_no:'222',
                email:'john@gmail.com'
            },
            {
                id:3,
                partnersid:'MLB22324',
                partner:'700 CLUB',
                account_name:'john',
                account_no:'3333',
                email:'john@gmail.com'
            }
        ]
        return await Fetch.get(`partners/getFavorite?walletno=${walletno}`)
    },

    getRecentBillers: async walletno => {
        return []
        let res = await Fetch.get(`partners/recentreceiverlist?walletno=${walletno}`)
        return res.recieverlists || []
    },

    updateFavoriteBiller: async payload => {
        return {
            error:false
        }
        return await Fetch.put('',payload)
    },

    addFavoriteBiller: async payload => {
        return {error:false}
        return await Fetch.post('partners/addFavorite',payload)
    },

    removeFavoriteBiller: async payload => {
        return {error:false}
        return await Fetch.delete(`partners/deleteFavorite?walletno=${payload.walletno}&id=${payload.id}`)
    },
}