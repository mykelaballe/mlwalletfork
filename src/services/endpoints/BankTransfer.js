import Fetch from '../../utils/Fetch'

export default {
    sendBankTransfer: async payload => {
        return {
            error:false
        }
        return Fetch.post('',payload)
    },

    getBankPartners: async () => {
        return [
            {
                name:'Banco De Oro',
                account_name:'Banco De Oro',
                account_no:'234235562'
            },
            {
                name:'China Bank',
                account_name:'China Bank',
                account_no:'866535435'
            },
            {
                name:'Land Bank of the Philippines',
                account_name:'Land Bank of the Philippines',
                account_no:'343470068'
            },
            {
                name:'Bank of the Philippine Islands',
                account_name:'Bank of the Philippine Islands',
                account_no:'113343546'
            }
        ]
        return await Fetch.get('')
    },

    addBankPartner: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    updateBankPartner: async payload => {
        return {
            error:false
        }
        return await Fetch.put('',payload)
    },

    deleteBankPartner: async payload => {
        return {
            error:false
        }
        return await Fetch.delete('')
    }
}