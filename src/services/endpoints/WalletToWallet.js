import Fetch from '../../utils/Fetch'

export default {
    sendWalletToWallet: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getWalletReceivers: async payload => {
        return [
            {
                fullname:'Bren Deverick',
                walletno:'3304827485'
            },
            {
                fullname:'Zeke Gavrielli',
                walletno:'8443756429'
            },
            {
                fullname:'Janet Godden',
                walletno:'1032947299'
            },
            {
                fullname:'Connor Beaty',
                walletno:'2132104822'
            },
            {
                fullname:'Shaine Laviss',
                walletno:'4773921031'
            }
        ]
        return await Fetch.get(`wallettowallet/receiverlist?walletNo=${payload.wallet_no}`)
    },

    searchWalletReceiver: async payload => {
        return {
            error:false
        }
        return await Fetch.post('')
    },

    addWalletReceiver: async payload => {
        return {
            error:false
        }
        return await Fetch.post('wallettowallet/addreceiver',payload)
    },

    deleteWalletReceiver: async payload => {
        return {
            error:false
        }
        return await Fetch.delete('')
    }
}