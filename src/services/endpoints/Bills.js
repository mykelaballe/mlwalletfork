import { Fetch } from "../../utils"

export default {
    payBill: async payload => {
        return {
            error:false
        }
        return await Fetch.post('',payload)
    },

    getAllBillers: async category => {
        let data = {}
        let res = await Fetch.get(`bill_partners/all?category=${category}`)

        /*let res = {
            data: [
                {
                    bill_partner_accountid:'MLBPP170388',
                    bill_partner_name:'API RIA',
                    classId:'CID081684154611'
                },
                {
                    bill_partner_accountid:'MLBPP130014',
                    bill_partner_name:'CEBU INSTITUTE OF TECHNOLOGY',
                    classId:'CID081684154611'
                }
            ]
        }*/
        
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
    },

    getBillers: async walletno => {
        /*return [
            {
                bill_partner_accountid:'MLBPP170388',
                bill_partner_name:'API RIA',
                classId:'CID081684154611',
                account_name:'John Smith',
                account_no:'334455',
                email:'johnsmith@gmail.com'
            },
            {
                bill_partner_accountid:'MLBPP130014',
                bill_partner_name:'CEBU INSTITUTE OF TECHNOLOGY',
                classId:'CID081684154611',
                account_name:'Jones Smith',
                account_no:'9982742',
                email:''
            }
        ]*/
        let res = await Fetch.get(`partners/getBillerAccounts?walletno=${walletno}`)
        return res.data || []
    },

    getFavoriteBillers: async walletno => {
        /*return []
        return [
            {
                id:1,
                partnersid:'MLB22324',
                partner:'CBN ASIA / 700 CLUB',
                account_name:'john',
                account_no:'1234',
                email:'john@gmail.com'
            },
            {
                id:2,
                partnersid:'MLB22324',
                partner:'CBN ASIA',
                account_name:'john',
                account_no:'222',
                email:'john@gmail.com'
            },
            {
                id:3,
                partnersid:'MLB22324',
                partner:'700 CLUB',
                account_name:'john',
                account_no:'3333',
                email:'john@gmail.com'
            }
        ]*/
        let res = await Fetch.get(`partners/getFavoriteAccounts?walletno=${walletno}`)
        return res.data || []
    },

    getRecentBillers: async walletno => {
        return []
        let res = await Fetch.get(`partners/recentreceiverlist?walletno=${walletno}`)
        return res.recieverlists || []
    },

    addBiller: async payload => {
        return await Fetch.post(`partners/addBillerAccount`,payload)
    },

    updateBiller: async payload => {
        return await Fetch.put(`partners/updateBillerAccount`,payload)
    },

    deleteBiller: async payload => {
        return await Fetch.delete(`partners/deleteBillerAccount?walletno=${payload.walletno}&id=${payload.id}`)
    },

    addFavoriteBiller: async payload => {
        return await Fetch.put(`partners/addToFavorite?walletno=${payload.walletno}&id=${payload.id}`)
    },

    removeFavoriteBiller: async payload => {
        return await Fetch.delete(`partners/removeFromFavorite?walletno=${payload.walletno}&id=${payload.id}`)
    },

    updateFavoriteBiller: async payload => {
        return {
            error:false
        }
        return await Fetch.put('',payload)
    },
}