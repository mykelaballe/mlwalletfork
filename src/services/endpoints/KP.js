import Fetch from '../../utils/Fetch'

export default {
    sendKP: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getKPReceivers: async payload => await Fetch.get(`kp/kplistreceivers?walletno=${payload.walletno}`),

    addKPReceiver: async payload => await Fetch.post('kp/addkwartapadalareceiver',payload),

    updateKPReceiver: async payload => await Fetch.put('kp/updateKwartaPadalaReceiver',payload),

    deleteKPReceiver: async payload => await Fetch.delete('kp/deleteKwartaPadalaReceiver',payload),
}