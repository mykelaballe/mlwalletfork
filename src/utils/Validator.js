import Consts from './Consts'
import _ from './Lang'
import Say from './Say'

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
    const chars = ['.','!', '@', '#', '$', '%', '&', '+', '(', ')', '[', ']', '¥', '÷', '€', "‘", '“', '\\', '/', '=', '-', '|', '£', '_', ':', '{', '}', ';', ',', '^', '~', '?', '*', '`']

    for(let v in value) {
        if(chars.indexOf(value[v]) >= 0) return true
    }

    return false
}

const isLettersOnly = str => {
    const regex = /^[a-zA-ZÑñ\s]+$/
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
}

const isAgeAllowed = birthdate => {
    const currentDate = moment()
    let duration = moment.duration(currentDate.diff(moment(birthdate, 'YYYY-MM-DD')))
    let years = duration.asYears()
    return years >= Consts.user_min_age && years <= Consts.user_max_age ? true : false
}

const isAmount2Decimal = value => {
    if(value.indexOf('.') >= 0) {

        let pieces = value.split('.')

        if(pieces.length > 2) return false

        if(pieces[1].length > 2) {
            return false
        }
    }

    return true
}

const isImage = filename => {
    const ALLOWED_IMAGES = ['jpg', 'jpeg', 'png', 'bmp']

    const split = filename.split('.')
    return ALLOWED_IMAGES.indexOf((split.pop()).toLowerCase()) >= 0
}

const validateBillerDetails = payload => {
    return new Promise((resolve, reject) => {
        
        let {cAccountFname, cAccountLname, business_name, account_name, account_no, email, mobileno, isBusiness} = payload

        try {
            cAccountFname = cAccountFname.trim()
            cAccountLname = cAccountLname.trim()
            business_name = business_name.trim()
            account_no = account_no.trim()
            email = email.trim()
            mobileno = mobileno.trim()

            if(((isBusiness && !business_name) || (!isBusiness && (!cAccountFname || !cAccountLname))) || (!account_no)) {
                Say.some(_('8'))
                resolve({ok:false})
            }
            else if(!isAlphaNumOnly(account_no)) {
                Say.warn(Consts.error.onlyAlphaNum)
                resolve({ok:false})
            }
            else if(email && !hasEmailSpecialCharsOnly(email)) {
                Say.warn(Consts.error.notAllowedChar)
                resolve({
                    ok:false,
                    errors:{
                        error_email:true
                    }
                })
            }
            else if(email && !isEmail(email)) {
                Say.warn(Consts.error.email)
                resolve({
                    ok:false,
                    errors:{
                        error_email:true
                    }
                })
            }
            else if(mobileno && !isPHMobileNumber(mobileno)) {
                Say.warn(Consts.error.mobile)
                resolve({
                    ok:false,
                    errors:{
                        error_mobile:true
                    }
                })
            }
            else {

                if(isBusiness) {
                    cAccountFname = business_name
                    cAccountLname = business_name
                    account_name = business_name
                }
                else {
                    account_name = `${cAccountFname} ${cAccountLname}`
                }

                resolve({
                    ok:true,
                    data:{
                        cAccountFname,
                        cAccountLname,
                        //business_name,
                        account_name,
                        account_no,
                        email,
                        mobileno,
                        isBusiness:isBusiness ? 1 : 0
                    }
                })
            }
        }
        catch(err) {
            Say.err(err)
        }
    })
}

const validateBankDetails = payload => {
    return new Promise((resolve, reject) => {
        
        let {name, cAccountFname, cAccountLname, cAccountMname, business_name, account_name, account_no, mobileno, isBusiness} = payload

        try {
            name = name.trim()
            cAccountFname = cAccountFname.trim()
            cAccountLname = cAccountLname.trim()
            cAccountMname = cAccountMname.trim()
            business_name = business_name.trim()
            account_no = account_no.trim()
            mobileno = mobileno.trim()

            if(((isBusiness && !business_name) || (!isBusiness && (!cAccountFname || !cAccountLname || !cAccountMname))) || (!name)) {
                Say.some(_('8'))
                resolve({ok:false})
            }
            else if(!isAlphaNumOnly(account_no)) {
                Say.warn(Consts.error.onlyAlphaNum)
                resolve({ok:false})
            }
            else if(mobileno && !isPHMobileNumber(mobileno)) {
                Say.warn(Consts.error.mobile)
                resolve({
                    ok:false,
                    errors:{
                        error_mobile:true
                    }
                })
            }
            else {

                if(isBusiness) {
                    cAccountFname = business_name
                    cAccountLname = business_name
                    cAccountMname = business_name
                    account_name = business_name
                }
                else {
                    account_name = `${cAccountFname} ${cAccountMname} ${cAccountLname}`
                }

                resolve({
                    ok:true,
                    data:{
                        name,
                        cAccountFname,
                        cAccountLname,
                        cAccountMname,
                        account_name,
                        account_no,
                        mobileno,
                        isBusiness:isBusiness ? 1 : 0
                    }
                })
            }
        }
        catch(err) {
            Say.err(err)
        }
    })
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
    isPHMobileNumber,
    isAgeAllowed,
    isAmount2Decimal,
    isImage,
    validateBillerDetails,
    validateBankDetails
}