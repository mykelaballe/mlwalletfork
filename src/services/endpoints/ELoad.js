import {Fetch} from "../../utils"

export default {
    buyLoad: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getELoadReceivers: async walletno => {
        /*return [
            {
                fullname:'John Smith',
                contact_no:'0912345678'
            }
        ]*/
        let res = await Fetch.post(`getLoadReciever`,{
            _walletno:walletno
        })

        return res.data || []
    },

    addELoadReceiver: async payload => await Fetch.post('addLoadReciever',payload),

    getLoadPromoCodes: async () => {
        return [
            {
                label:'GoSURF10',
                short_desc:'For Globe Prepaid only.',
                long_desc:'100MB data + 30MB for IG. Valid for 2 days',
                amount:10
            },
            {
                label:'GoSURF15',
                short_desc:'For Globe Prepaid only.',
                long_desc:'100MB data + 30MB for IG. Valid for 2 days',
                amount:15
            },
            {
                label:'GoSAKTO70',
                short_desc:'For Globe Prepaid only.',
                long_desc:'100MB data + 30MB for IG. Valid for 2 days',
                amount:70
            },
            {
                label:'GoSURF50',
                short_desc:'For Globe Prepaid only.',
                long_desc:'100MB data + 30MB for IG. Valid for 2 days',
                amount:50
            },
            {
                label:'GoSAKTO90',
                short_desc:'For Globe Prepaid only.',
                long_desc:'100MB data + 30MB for IG. Valid for 2 days',
                amount:90
            }
        ]
        return await Fetch.get('')
    },
}