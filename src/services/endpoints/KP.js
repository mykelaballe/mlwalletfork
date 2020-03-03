import Fetch from '../../utils/Fetch'

export default {
    sendKP: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getKPReceivers: async payload => {
        return [
            {
                firstname:'Bren',
                lastname:'Deverick',
                contact_no:'09534343462'
            },
            {
                firstname:'Zeke',
                lastname:'Gavrielli',
                contact_no:'09238452201'
            },
            {
                firstname:'Janet',
                lastname:'Godden',
                contact_no:'09322109584'
            },
            {
                firstname:'Connor',
                lastname:'Beaty',
                contact_no:'09112301913'
            }
        ]
        return await Fetch.get(`sendoutmobile/KPListReceivers?walletno=${payload.wallet_no}`)
    },

    addKPReceiver: async payload => {
        return {
            errors:false
        }
        return await Fetch.post('')
    },

    updateKPReceiver: async payload => {
        return {
            errors:false
        }
        return await Fetch.put('')
    },

    deleteKPReceiver: async payload => {
        return {
            errors:false
        }
        return await Fetch.delete('')
    }
}