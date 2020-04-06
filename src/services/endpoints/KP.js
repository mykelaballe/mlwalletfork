import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'

export default {
    sendKPValidate: async payload => {
        return await Fetch.post('kp/validate',payload)
    },

    sendKP: async payload => {
        return await Fetch.post('kp/sendMoney',{
            ...payload,
            //mlat:'1',
            //mlong:'1',
            location:''
        })
    },

    sendKPCancel: async payload => await Fetch.post('kp/cancelSendMoney',payload),

    getKPReceivers: async walletno => {
        return await Fetch.get(`kp/kplistreceivers?walletno=${walletno}`)
    },

    getFavoriteKPReceivers: async walletno => {
        let res = await Fetch.get(`kpFavorites/${walletno}`)
        return res.data || []
    },

    getRecentKPReceivers: async walletno => {
        let res = await Fetch.get(`recent/${Consts.tcn.skp.code}/${walletno}`)
        return res.data || []
    },

    addKPReceiver: async payload => {
        let res = await Fetch.post('kp/addkwartapadalareceiver',payload)
        return {
            error:res.respcode === 1,
            message:res.respmessage
        }
    },

    updateKPReceiver: async payload => {
        let res = await Fetch.put('kp/updateKwartaPadalaReceiver',payload)
        return {
            error:res.respcode === 0,
            message:res.respmessage
        }
    },

    deleteKPReceiver: async payload => await Fetch.delete('kp/deleteKwartaPadalaReceiver',payload),

    addFavoriteKPReceiver: async payload => {
        return await Fetch.post(`kpFavorites`,payload)
    },

    removeFavoriteKPReceiver: async payload => {
        return await Fetch.delete(`kpFavorites`,payload)
    },
}