import _ from './Lang'

const formatToCurrency = value => {
    if(value === undefined) return '0.00'

    value = parseFloat(value).toFixed(2)
    return isNaN(value) ? '0.00' : value
}

const formatToRealCurrency = value => {
    value += ''
    value = formatToCurrency(value)
	x = value.split('.')
	x1 = x[0]
	x2 = x.length > 1 ? '.' + x[1] : ''
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
	return x1 + x2
}

const cleanName = str => {
    if(str === null) return ''
    
    str = str.replace(' WAIVED ', ' ')
    str = str.replace(' NONE', ' ')

    return str
}

const formatName = userObject => {
    if(userObject === null || !userObject) return ''

    const fname = userObject.fname || userObject.firstname
    const mname = (userObject.mname || userObject.middlename) || _('50')
    const lname = userObject.lname || userObject.lastname
    const suffix = userObject.suffix || _('51')

    return cleanName(`${fname} ${mname} ${lname} ${suffix}`)
}

const formatAddress = userObject => {
    const data = []

    let province = '', house = ''

    if(typeof userObject.province === 'string') province = userObject.province
    else if(typeof userObject.province === 'object') province = userObject.province.province

    if(userObject.house) house = userObject.house
    else if(userObject.houseno) house = userObject.houseno

    if(house) data.push(house)
    if(userObject.street) data.push(userObject.street)
    if(userObject.barangay) data.push(userObject.barangay)
    if(userObject.city) data.push(userObject.city)
    if(province) data.push(province)
    data.push(userObject.country)
    if(userObject.zipcode && userObject.zipcode != '0') data.push(userObject.zipcode)

    return data.join(', ')
}

const formatToPHMobileNumber = str => {
    if(!str) return ''
    str = str.replace('+63 ', '0')
    return str.replace(/ /g, '')
}

const formatToPHMobileNumberFull = str => {
    if(!str) return ''
    
    let piece1 = str.slice(1, 4)
    let piece2 = str.slice(4, 7)
    let piece3 = str.slice(7, 11)
    return `+63 ${piece1} ${piece2} ${piece3}`
}

const formatWalletNo = str => {
    if(!str) return ''
    return str.replace(/^(\d{4})(\d{4})(\d{4})(\d{2}).*/, '$1 $2 $3 $4')
}

const formatKPTN = str => {
    if(!str) return ''
    return str.replace(/^(\w{3})(\d{4})(\d{4})(\d{4})(\d{4})(\d{2}).*/, '$1 $2-$3-$4-$5-$6')
}

const buildReceiptBody = data => {
    let output = ''

    for(let d in data) {
        if(data[d] !== false) {
            output += `
                <h5 style="color:#6A6A6A;line-height:0">${d}</h5>
                <h4>${data[d] == '' || !data[d] ? '---' : data[d]}</h4>
            `
        }
    }

    return output
}

export default {
    formatToCurrency,
    formatToRealCurrency,
    cleanName,
    formatName,
    formatAddress,
    formatToPHMobileNumber,
    formatToPHMobileNumberFull,
    formatWalletNo,
    formatKPTN,
    buildReceiptBody
}