import Fetch from '../../utils/Fetch'

export default {
    sendKP: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getKPReceivers: async payload => {
        return await Fetch.get(`kp/kplistreceivers?walletno=${payload.walletno}`)
    },

    addKPReceiver: async payload => {
        return await Fetch.post('kp/addkwartapadalareceiver',payload)
    },

    updateKPReceiver: async payload => {
        return await Fetch.put('kp/updateKwartaPadalaReceiver',payload)
    },

    deleteKPReceiver: async payload => {
        return await Fetch.delete('kp/deleteKwartaPadalaReceiver',payload)
    }
}