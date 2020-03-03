import { Fetch } from "../../utils"

export default {
    payBill: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getBillers: async () => {
        return [
            {
                letter:'A',
                data:[
                    {
                        id:1,
                        name:'A2M Global Distribution Inc.',
                    },
                    {
                        id:2,
                        name:'ABOEX Travel and Tours'
                    },
                    {
                        id:3,
                        name:'AT Service Limited'
                    }
                ]
            },
            {
                letter:'B',
                data:[
                    {
                        id:4,
                        name:'BDMPC',
                    },
                    {
                        id:5,
                        name:'BIGSTART Travel and VISA Assistance'
                    },
                    {
                        id:6,
                        name:'Bohol Lights Inc.'
                    },
                    {
                        id:7,
                        name:'BPI'
                    },
                    {
                        id:8,
                        name:'Buenavista CATV Inc.'
                    }
                ]
            },
        ]
        return await Fetch.get('')
    },

    getFavoriteBillers: async payload => {
        return [
            {
                id:1,
                name:'A2M Global Distribution Inc.',
                account_no:'123456',
                account_name:'A2M',
                email:'a2m@gmail.com',
                add_to_favorites:true
            }
        ]
        return await Fetch.get('',payload)
    },

    updateFavoriteBiller: async payload => {
        return {
            error:false
        }
        return await Fetch.put('',payload)
    },

    addFavoriteBiller: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    removeFavoriteBiller: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },
}