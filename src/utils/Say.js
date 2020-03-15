//import Snackbar from 'react-native-snackbar'
import SomeModal from '../components/SomeModal'
//import {Colors} from '../themes'

const some = (message, title = 'Alert', options = {}) => {
    SomeModal.show({
        message,
        title,
        options
    })
    //alert(title)
    /*Snackbar.show({
        title
    })*/
}

const ok = (message, title = 'Success', options = {}) => {
    SomeModal.show({
        message,
        title,
        options
    })
    /*Snackbar.show({
        title,
        color:Colors.light,
        backgroundColor:Colors.success
    })*/
}

const warn = (message, title = 'Warning', options = {}) => {
    SomeModal.show({
        message,
        title,
        options
    })
    /*Snackbar.show({
        title,
        color:Colors.black,
        backgroundColor:Colors.warning
    })*/
}

const err = (message, title = 'Error', options = {}) => {
    SomeModal.show({
        message,
        title,
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

const info = (message, title = 'Information', options = {}) => {
    SomeModal.show({
        message,
        title,
        options
    })
    /*Snackbar.show({
        title,
        color:Colors.light,
        backgroundColor:Colors.info
    })*/
}

const ask = (message, title = 'Are you sure?', options = {}) => {
    SomeModal.show({
        message,
        title,
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