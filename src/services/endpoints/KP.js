import Fetch from '../../utils/Fetch'

export default {
    sendKPValidate: async payload => {
        return await Fetch.post('kp/validate',payload)
    },

    sendKP: async payload => {
        return await Fetch.post('kp/sendMoney',{
            ...payload,
            mlat:'1',
            mlong:'1',
            location:'cebu'
        })
    },

    getKPReceivers: async payload => await Fetch.get(`kp/kplistreceivers?walletno=${payload.walletno}`),

    addKPReceiver: async payload => await Fetch.post('kp/addkwartapadalareceiver',payload),

    updateKPReceiver: async payload => await Fetch.put('kp/updateKwartaPadalaReceiver',payload),

    deleteKPReceiver: async payload => await Fetch.delete('kp/deleteKwartaPadalaReceiver',payload),
}