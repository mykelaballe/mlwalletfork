import SomeModal from '../components/SomeModal'
import Consts from './Consts'
import _ from './Lang'

const some = (message, title = null, options = {}) => {
    SomeModal.show({
        message,
        title:title || 'Alert',
        options
    })
}

const ok = (message, title = null, options = {}) => {
    SomeModal.show({
        message,
        title:title || 'Success',
        options
    })
}

const warn = (message, title = null, options = {}) => {
    SomeModal.show({
        message,
        title:title || 'Warning',
        options
    })
}

const err = (message, title = null, options = {}) => {
    SomeModal.show({
        message:Consts.is_dev ? message.message : _('500'),
        title:title || 'Error',
        options
    })
}

const info = (message, title = null, options = {}) => {
    SomeModal.show({
        message,
        title:title || 'Information',
        options
    })
}

const ask = (message, title = null, options = {}) => {
    SomeModal.show({
        message,
        title:title || 'Are you sure?',
        options: {
            type:'yes_no',
            ...options
        }
    })
}

const attemptLeft = error => {
    if(error === Consts.error.atl1) warn('Oops! You entered the wrong information. You only have 1 attempt left.')
    else if(error === Consts.error.atl2) warn('Oops! You entered the wrong information. You only have 2 attempts left')
    else if(error === 'reach_maximum_attempts' || error === Consts.error.blk1d) {
        warn(
            `Your account will be blocked for 24 hours. Please contact our Customer Care for assistance.
            
            Smart  :0947-999-0037
            Globe  :0917-871-2973`,
            null
        )
    }
    else warn('Oops! You entered the wrong information')
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