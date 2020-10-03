import SomeModal from '../components/SomeModal'
import Consts from './Consts'
import _ from './Lang'
import Storage from './Storage'
import API from '../services/API'
import moment from 'moment'
import DeviceInfo from 'react-native-device-info'

const LAST_CHARS = ['.', '!', '?']

const checkLastChar = str => {
    if(str) {
        let lastchar = str[str.length - 1]
        if(LAST_CHARS.indexOf(lastchar) < 0) str = `${str}.`
    }

    return str
}

const some = (message, title = null, options = {}) => {
    SomeModal.show({
        message:checkLastChar(message),
        title:title || 'Oops!',
        options
    })
}

const ok = (message, title = null, options = {}) => {
    SomeModal.show({
        message:checkLastChar(message),
        title:title || 'Success!',
        options
    })
}

const warn = (message, title = null, options = {}, noPeriod = false) => {
    if(!noPeriod) message = checkLastChar(message)

    SomeModal.show({
        message,
        title:title || 'Oops!',
        options
    })
}

const err = (message, title = null, options = {}, extraLogsData = {}) => {
    if(message === 'unauthorize') SomeModal.forceLogout()
    else {

        let errorMsg = ''

        try {
            Storage.doLoad(Consts.db.user)
            .then(user => {
                let logsPayload = {
                    env: Consts.env,
                    os: Consts.platform,
                    osVersion: DeviceInfo.getSystemVersion(),
                    appVersion: Consts.appVersion,
                    ...extraLogsData,
                    datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
                    message: message.message || message
                }

                if(user) {
                    logsPayload.username = user.username
                    logsPayload.walletno = user.walletno
                }

                API.log(logsPayload)
            })
        }
        catch(err) {}

        if(Consts.is_dev) errorMsg = message.message || message
        else errorMsg = _('500')

        /*if(message) {
            if(message.toLowerCase() == 'network error') {
                title = 'Uh-oh!'
                message = Consts.error.network
            }
        
            if(message[message.length - 1] != '.') message = `${message}.`
        }*/

        SomeModal.show({
            message:checkLastChar(errorMsg),
            title:title || 'Uh-oh!',
            options
        })
    }
}

const info = (message, title = null, options = {}) => {
    SomeModal.show({
        message:checkLastChar(message),
        title:title || 'Information',
        options
    })
}

const ask = (message, title = null, options = {}) => {
    SomeModal.show({
        message:checkLastChar(message),
        title:title || 'Are you sure?',
        options: {
            type:'yes_no',
            ...options
        }
    })
}

const attemptLeft = (error,options = {}) => {
    let frontMsg = options.frontMsg || Consts.error.wrongInfo

    if(error === Consts.error.atl1) warn(`${frontMsg}. You only have 1 attempt left.`)
    else if(error === Consts.error.atl2) warn(`${frontMsg}. You only have 2 attempts left.`)
    else if(error === 'reach_maximum_attempts' || error === Consts.error.blk1d) {
        warn(
            `Your account will be blocked for 24 hours. Please contact our Customer Care for assistance.
            
            Globe  :${Consts.hotline2}
            Smart  :${Consts.hotline1}`,
            null,
            null,
            true
        )
    }
    else {
        if(options.frontMsg) warn(`${frontMsg}.`)
        else warn(error)
    }
}

const logout = () => SomeModal.sayLogout()

const hide = () => SomeModal.hide()

export default {
    some,
    ok,
    warn,
    err,
    info,
    ask,
    attemptLeft,
    logout,
    hide
}