import Consts from '../../utils/Consts'
import Fetch from '../../utils/Fetch'
import Crypt from '../../utils/Crypt'

export default {
    sendKPValidate: async payload => await Fetch.postc('kp/validate',payload),

    sendKP: async payload => {
        return await Fetch.postc('kp/sendMoney',{
            ...payload,
            location:'',
            deviceid:Consts.deviceId
        })
    },

    sendKPCancel: async payload => await Fetch.postc('kp/cancelSendMoney',payload),

    getKPReceivers: async walletno => await Fetch.getc(`kp/kplistreceivers?walletno=${walletno}`),

    getFavoriteKPReceivers: async walletno => {
        let res = await Fetch.get(`kpFavorites/${walletno}`)
        return res.data || []
    },

    getRecentKPReceivers: async walletno => {
        let res = await Fetch.get(`recent/${Consts.tcn.skp.code}/${walletno}`)
        return res.data || []
    },

    addKPReceiver: async payload => {
        let res = await Fetch.postc('kp/addkwartapadalareceiver',payload)
        return {
            error:res.respcode == 0,
            message:res.respmessage
        }
    },

    updateKPReceiver: async payload => {
        let res = await Fetch.putc('kp/updateKwartaPadalaReceiver',payload)
        return {
            error:res.respcode == 0,
            message:res.respmessage
        }
    },

    deleteKPReceiver: async payload => await Fetch.deletec('kp/deleteKwartaPadalaReceiver',payload),

    addFavoriteKPReceiver: async payload => await Fetch.post(`kpFavorites`,payload),

    removeFavoriteKPReceiver: async payload => await Fetch.delete(`kpFavorites`,payload),
}