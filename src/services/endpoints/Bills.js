import { Fetch } from "../../utils"

export default {
    payBill: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getBillers: async category => {
        let data = {}
        let res = await Fetch.get(`bill_partners/all?category=${category}`)
        
        if(res.data) {
            for(let d in res.data) {
                let letter = res.data[d].bill_partner_name[0]

                if(typeof data[letter] === 'undefined') {
                    data[letter] = {
                        letter,
                        data:[]
                    }
                }

                data[letter].data.push(res.data[d])
            }
        }
        
        return Object.values(data)

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
        return await Fetch.post('addLoadReceiver',payload)
    },

    removeFavoriteBiller: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },
}