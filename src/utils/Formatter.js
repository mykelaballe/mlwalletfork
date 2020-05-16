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
    const data = [
        userObject.country
    ]

    let province = '', house = ''

    if(typeof userObject.province === 'string') province = userObject.province
    else if(typeof userObject.province === 'object') province = userObject.province.province

    if(userObject.house) house = userObject.house
    else if(userObject.houseno) house = userObject.houseno

    if(userObject.zipcode) data.push(userObject.zipcode)
    if(province) data.push(province)
    if(userObject.city) data.push(userObject.city)
    if(userObject.barangay) data.push(userObject.barangay)
    if(userObject.street) data.push(userObject.street)
    if(house) data.push(house)

    return data.reverse().join(', ')
}

const formatToPHMobileNumber = str => {
    return str.replace('+639 ', '09')
}

export default {
    formatToCurrency,
    formatToRealCurrency,
    cleanName,
    formatName,
    formatAddress,
    formatToPHMobileNumber
}