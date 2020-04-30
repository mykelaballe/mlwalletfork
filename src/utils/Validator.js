import Consts from './Consts'
import _ from './Lang'

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
    const regex = /^[a-zA-Z\s]+$/
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

const isEmail = str => {
    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(String(str).toLowerCase())
}

const isPHMobileNumber = value => {
    if(value.length !== 11 || !isNumbersOnly(value)) return false
    return true

    //const regex = /^(09|\+639)\d{9}$/
    //return !regex.test(value)
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
    isEmail,
    isPHMobileNumber
}