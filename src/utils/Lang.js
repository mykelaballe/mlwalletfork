import en from '../lang/en.json'

export default (textCode) => {
    let text = en[textCode]
    
    return `${text[0].toUpperCase()}${text.substr(1)}`
}