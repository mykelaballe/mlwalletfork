import Consts from './Consts'
import Storage from './Storage'

import en from '../lang/en.json'
import tgl from '../lang/tgl.json'
import ceb from '../lang/ceb.json'

let langs = {
    en,
    tgl,
    ceb
}

let lang = en

const checkLang = async () => {
    let db = await Storage.doLoad(Consts.db.app)

    if(db.lang) lang = langs[db.lang] 
}

checkLang()

export default (textCode) => {
    let text = lang[textCode]
    
    return `${text[0].toUpperCase()}${text.substr(1)}`
}