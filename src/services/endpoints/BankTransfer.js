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

    addBankPartner: async payload => await Fetch.post('bankAccount/add',payload),

    updateBankPartner: async payload => await Fetch.put('bankAccount/edit',payload),

    deleteBankPartner: async payload => await Fetch.delete('bankAccount/delete',payload)
}