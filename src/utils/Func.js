import Consts from './Consts'

const moment = require('moment')

const validate = (value, options = {}) => {
    let errors = []

    if(options.minLength) {
        errors.push({
            ok: checkMinLength(value, options.minLength),
            message: `Minimum of ${options.minLength} characters in length`
        })
    }
    
    if(options.alphaNum) {
        errors.push({
            ok: checkAlphaNum(value),
            message: 'Combination of letters and numbers'
        })
    }

    if(options.hasNum) {
        errors.push({
            ok: checkHasNum(value),
            message: 'At least one number'
        })
    }

    if(options.hasSpecialChar) {
        errors.push({
            ok: hasSpecialChar(value),
            message: 'At least one special character'
        })
    }

    return {
        ok: !(errors.some(err => {
            return err.ok === false
        })),
        errors
    }
}

const checkMinLength = (value, minLength) => value.length >= minLength

const checkAlphaNum = value => {
    const _hasNum = checkHasNum(value)
    const _hasSpecialChar = hasSpecialChar(value)

    const regex = /[A-Z]/i
    const _hasChar = regex.test(value)

    return (_hasNum && _hasChar && !_hasSpecialChar)
}

const checkHasNum = value => {
    const regex = /\d+/
    return regex.test(value)
}

const hasSpecialChar = value => {
    const regex = /[!@#$%&]+/
    return regex.test(value)
}

const isLettersOnly = str => {
    const regex = /^[a-zA-Z]+$/
    return regex.test(str)
}

const isNumbersOnly = str => {
    const regex = /^\d+$/
    return regex.test(str)
}

const isAlphaNumOnly = str => {
    const regex = /[^A-Za-z0-9]+/
    return !regex.test(str)
}

const isDateValid = dateStr => {
    return moment(dateStr, 'YYYY-MM-DD').isValid()
}

const hasCommonSpecialCharsOnly = str => {
    for(let s in str) {
        if(!isLettersOnly(str[s]) && !isNumbersOnly(str[s])) {
            if(Consts.allowedSpecialChars.common.indexOf(str[s]) < 0) return false
        }
    }
    return true
}

const hasEmailSpecialCharsOnly = str => {
    for(let s in str) {
        if(!isLettersOnly(str[s]) && !isNumbersOnly(str[s])) {
            if(Consts.allowedSpecialChars.email.indexOf(str[s]) < 0) return false
        }
    }

    return true
}

const hasAddressSpecialCharsOnly = str => {
    for(let s in str) {
        if(!isLettersOnly(str[s]) && !isNumbersOnly(str[s])) {
            if(Consts.allowedSpecialChars.address.indexOf(str[s]) < 0) return false
        }
    }

    return true
}

function compute() {
    let total = 0

    for(i = 0; i < arguments.length; i++) {
        total += parseFloat(formatToCurrency(arguments[i]))
      }

    return formatToCurrency(total)
}

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

const randomize = list => list[Math.floor(Math.random() * list.length)]

const cleanName = str => {
    str = str.replace(' WAIVED ', ' ')
    str = str.replace(' NONE', ' ')

    return str
}

const formatName = userObject => {
    if(userObject === null || !userObject) return ''

    const fname = userObject.fname || userObject.firstname
    const mname = (userObject.mname || userObject.middlename) || ' WAIVED'
    const lname = userObject.lname || userObject.lastname
    const suffix = userObject.suffix || ' NONE'

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
    validate,
    isLettersOnly,
    isNumbersOnly,
    isAlphaNumOnly,
    isDateValid,
    hasCommonSpecialCharsOnly,
    hasEmailSpecialCharsOnly,
    hasAddressSpecialCharsOnly,
    compute,
    formatToCurrency,
    formatToRealCurrency,
    randomize,
    cleanName,
    formatName,
    formatAddress
}