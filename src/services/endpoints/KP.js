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

    sendKPCancel: async payload => await Fetch.post('kp/cancelSendMoney',payload),

    getKPReceivers: async walletno => {
        return [
            {
                receiverno:1,
                firstname:'Mary',
                middlename:'WAIVED',
                lastname:'Poppins',
                suffix:'NONE',
                ContactNo:'09121212'
            },
            {
                receiverno:2,
                firstname:'John',
                middlename:'WAIVED',
                lastname:'Andrews',
                suffix:'Jr',
                ContactNo:'098786565'
            },
            {
                receiverno:3,
                firstname:'Paul',
                middlename:'Saunder',
                lastname:'Bridges',
                suffix:'NONE',
                ContactNo:'0944345423'
            }
        ]
        return await Fetch.get(`kp/kplistreceivers?walletno=${walletno}`)
    },

    getFavoriteKPReceivers: async walletno => {
        return []
        let res = await Fetch.get(`kp/favoritereceiverlist?walletno=${walletno}`)
        return res.recieverlists || []
    },

    getRecentKPReceivers: async walletno => {
        return []
        let res = await Fetch.get(`kp/recentreceiverlist?walletno=${walletno}`)
        return res.recieverlists || []
    },

    addKPReceiver: async payload => await Fetch.post('kp/addkwartapadalareceiver',payload),

    updateKPReceiver: async payload => await Fetch.put('kp/updateKwartaPadalaReceiver',payload),

    deleteKPReceiver: async payload => await Fetch.delete('kp/deleteKwartaPadalaReceiver',payload),

    addFavoriteKPReceiver: async receiverno => {
        return {error:false}
        return await Fetch.post(`kpFavorites/${receiverno}`)
    },

    removeFavoriteKPReceiver: async receiverno => {
        return {error:false}
        return await Fetch.delete(`kpFavorites/${receiverno}`)
    },
}