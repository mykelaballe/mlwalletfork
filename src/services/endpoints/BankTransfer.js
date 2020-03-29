import Fetch from '../../utils/Fetch'

export default {
    sendBankTransfer: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getPartners: async () => {
        let data = {}
        let res = await Fetch.get('banks')

        if(res.data) {
            for(let d in res.data) {
                let letter = res.data[d].bank_name[0]

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

    getBankPartners: async walletno => {
        let res = await Fetch.get(`bankAccount/all?walletno=${walletno}`)
        return res.data || []
    },

    getFavoriteBankPartners: async walletno => {
        let res = await Fetch.get(`bankFavorites/${walletno}`)
        return res.recieverlists || []
    },

    getRecentBankPartners: async walletno => {
        return []
        let res = await Fetch.get(`bankAccount/recentreceiverlist?walletno=${walletno}`)
        return res.recieverlists || []
    },

    addBankPartner: async payload => await Fetch.post('bankAccount/add',payload),

    updateBankPartner: async payload => await Fetch.put('bankAccount/edit',payload),

    deleteBankPartner: async payload => await Fetch.delete('bankAccount/delete',payload),

    addFavoriteBankPartner: async payload => {
        return await Fetch.post(`bankFavorites`,payload)
    },

    removeFavoriteBankPartner: async payload => {
        return await Fetch.delete(`bankFavorites`,payload)
    }
}