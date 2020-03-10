import Snackbar from 'react-native-snackbar'
import {Colors} from '../themes'

const some = title => {
    alert(title)
    /*Snackbar.show({
        title
    })*/
}

const ok = title => {
    Snackbar.show({
        title,
        color:Colors.light,
        backgroundColor:Colors.success
    })
}

const warn = title => {
    Snackbar.show({
        title,
        color:Colors.black,
        backgroundColor:Colors.warning
    })
}

const err = title => {
    alert(title)
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

const info = title => {
    Snackbar.show({
        title,
        color:Colors.light,
        backgroundColor:Colors.info
    })
}

export default {
    some,
    ok,
    warn,
    err,
    info
}