//import Snackbar from 'react-native-snackbar'
import SomeModal from '../components/SomeModal'
//import {Colors} from '../themes'

const some = (message, title = null, options = {}) => {
    SomeModal.show({
        message,
        title:title || 'Alert',
        options
    })
    //alert(title)
    /*Snackbar.show({
        title
    })*/
}

const ok = (message, title = null, options = {}) => {
    SomeModal.show({
        message,
        title:title || 'Success',
        options
    })
    /*Snackbar.show({
        title,
        color:Colors.light,
        backgroundColor:Colors.success
    })*/
}

const warn = (message, title = null, options = {}) => {
    SomeModal.show({
        message,
        title:title || 'Warning',
        options
    })
    /*Snackbar.show({
        title,
        color:Colors.black,
        backgroundColor:Colors.warning
    })*/
}

const err = (message, title = null, options = {}) => {
    SomeModal.show({
        message,
        title:title || 'Error',
        options
    })
    //alert(title)
    /*Snackbar.show({
        title,
        color:Colors.light,
        backgroundColor:Colors.danger,
        duration:Snackbar.LENGTH_INDEFINITE,
        action:{
            title:'Dismiss',
            color:Colors.light
        }
    })*/
}

const info = (message, title = null, options = {}) => {
    SomeModal.show({
        message,
        title:title || 'Information',
        options
    })
    /*Snackbar.show({
        title,
        color:Colors.light,
        backgroundColor:Colors.info
    })*/
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

export default {
    some,
    ok,
    warn,
    err,
    info,
    ask
}