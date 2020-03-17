import { Fetch } from "../../utils"

export default {
    payBill: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getBillers: async category => {
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

    getFavoriteBillers: async walletno => {
        return [
            {
                id:1,
                name:'A2M Global Distribution Inc.',
                account_no:'123456',
                account_name:'A2M',
                email:'a2m@gmail.com',
                add_to_favorites:true
            }
        ]
        return await Fetch.get(`partners/getFavorite?walletno=${walletno}`)
    },

    updateFavoriteBiller: async payload => {
        return {
            error:false
        }
        return await Fetch.put('',payload)
    },

    addFavoriteBiller: async payload => {
        return await Fetch.post('partners/addFavorite',payload)
    },

    removeFavoriteBiller: async payload => {
        return {
            error:false
        }
        return await Fetch.delete(`partners/deleteFavorite?walletno=${payload.walletno}&id=${payload.id}`)
    },
}