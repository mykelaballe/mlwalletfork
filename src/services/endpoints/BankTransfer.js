import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'
import Crypt from '../../utils/Crypt'

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
                let letter = res.data[d].PartnersName[0]

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
        let res = await Fetch.get(`bankFavorites/${Crypt.en(walletno)}`)
        return res.data || []
    },

    getRecentBankPartners: async walletno => {
        let res = await Fetch.get(`recent/${Consts.tcn.stb.code}/${Crypt.en(walletno)}`)
        return res.data || []
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