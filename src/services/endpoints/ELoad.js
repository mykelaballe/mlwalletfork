import {Fetch} from "../../utils"

export default {
    buyLoad: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getELoadReceivers: async payload => {
        return [
            {
                contact_no:'09123456789',
                fullname:'Ashley Uy',
            },
            {
                contact_no:'0955398234',
                fullname:'Lotlot Rubite'
            }
        ]
        return await Fetch.get('',payload)
    },

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