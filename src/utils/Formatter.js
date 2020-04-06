import _ from './Lang'

const formatToCurrency = value => {
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

    if(userObject.province) data.push(userObject.province.province || userObject.province)
    if(userObject.city) data.push(userObject.city)
    if(userObject.barangay) data.push(userObject.barangay)
    if(userObject.street) data.push(userObject.street)
    if(userObject.houseno) data.push(userObject.houseno)
    if(userObject.zipcode) data.push(userObject.zipcode)

    return data.reverse().join(', ')
}

export default {
    formatToCurrency,
    formatToRealCurrency,
    cleanName,
    formatName,
    formatAddress
}