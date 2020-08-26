import Consts from '../../utils/Consts'
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
        let res = await Fetch.getc('banks/corporate', true)

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

    getBankPartners: async payload => {
        let res = await Fetch.getc(`bankAccount/all?walletno=${payload.walletno}&isRTA=${payload.isRTA}`, true)
        if(res.error) throw new Error(res.message)
        return res.data || []
    },

    getFavoriteBankPartners: async payload => {
        let res = await Fetch.getc(`bankFavorites?walletno=${payload.walletno}&isRTA=${payload.isRTA}`, true)
        if(res.error) throw new Error(res.message)
        return res.data || []
    },

    getRecentBankPartners: async walletno => {
        let res = await Fetch.getc(`recent?${JSON.stringify({type:Consts.tcn.stb.code, walletno})}`, true)
        if(res.error) throw new Error(res.message)
        return res.data || []
    },

    addBankPartner: async payload => await Fetch.postc('bankAccount/add',payload, true),

    updateBankPartner: async payload => await Fetch.putc('bankAccount/edit',payload, true),

    deleteBankPartner: async payload => await Fetch.deletec('bankAccount/delete',payload, true),

    addFavoriteBankPartner: async payload => await Fetch.postc(`bankFavorites/add`,payload, true),

    removeFavoriteBankPartner: async payload => await Fetch.deletec(`bankFavorites/delete`,payload, true)
}