import SomeModal from '../components/SomeModal'
import Consts from './Consts'
import _ from './Lang'

const some = (message, title = null, options = {}) => {
    if(message && message[message.length - 1] != '.') message = `${message}.`

    SomeModal.show({
        message,
        title:title || 'Oops!',
        options
    })
}

const ok = (message, title = null, options = {}) => {
    if(message && message[message.length - 1] != '.') message = `${message}.`

    SomeModal.show({
        message,
        title:title || 'Success!',
        options
    })
}

const warn = (message, title = null, options = {}) => {
    if(message && message[message.length - 1] != '.') message = `${message}.`

    SomeModal.show({
        message,
        title:title || 'Oops!',
        options
    })
}

const err = (message, title = null, options = {}) => {
    if(Consts.is_dev) message = message.message
    else message = _('500')

    if(message) {
        if(message.toLowerCase() == 'network error') {
            title = 'Uh-oh!'
            message = Consts.error.network
        }
    
        if(message[message.length - 1] != '.') message = `${message}.`
    }

    SomeModal.show({
        message,
        title:title || 'Error',
        options
    })
}

const info = (message, title = null, options = {}) => {
    if(message && message[message.length - 1] != '.') message = `${message}.`

    SomeModal.show({
        message,
        title:title || 'Information',
        options
    })
}

const ask = (message, title = null, options = {}) => {
    if(message && message[message.length - 1] != '.') message = `${message}.`

    SomeModal.show({
        message,
        title:title || 'Are you sure?',
        options: {
            type:'yes_no',
            ...options
        }
    })
}

const attemptLeft = (error,options = {}) => {
    let frontMsg = options.frontMsg || 'You entered the wrong information.'

    if(error === Consts.error.atl1) warn(`${frontMsg}. You only have 1 attempt left.`)
    else if(error === Consts.error.atl2) warn(`${frontMsg}. You only have 2 attempts left.`)
    else if(error === 'reach_maximum_attempts' || error === Consts.error.blk1d) {
        warn(
            `Your account will be blocked for 24 hours. Please contact our Customer Care for assistance.
            
            Smart  :0947-999-0037
            Globe  :0917-871-2973`,
            null
        )
    }
    else {
        if(options.frontMsg) warn(`${frontMsg}.`)
        else warn(error)
    }
}

const logout = () => SomeModal.sayLogout()

export default {
    some,
    ok,
    warn,
    err,
    info,
    ask,
    attemptLeft,
    logout
}