import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Button, Picker} from '../components'
import {_, Consts, Say, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Bank'
    }

    state = {
        partners:[
            {label:'CHINABANK RTA',value:'MLBPP170374'},
            {label:'METROBANK REMIT TO ACCOUNT',value:'MLBPP160278'}
        ],
        name:'',
        partnerid:'',
        account_name:'',
        account_no:'',
        processing:false
    }

    handleChangeName = (bank = {}) => this.setState({name:bank.label, partnerid:bank.value})
    handleChangeAccountName = account_name => this.setState({account_name})
    handleChangeAccountNo = account_no => this.setState({account_no})

    handleFocusAccountName = () => this.refs.account_name.focus()
    handleFocusAccountNo = () => this.refs.account_no.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {name, partnerid, account_name, account_no, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            name = name.trim()
            account_name = account_name.trim()
            account_no = account_no.trim()

            if(!name || !account_name || !account_no) Say.some(_('8'))
            else if(!Func.isAlphaNumOnly(account_no)) Say.warn(Consts.error.onlyAlphaNum)
            else {

                let payload = {
                    walletno,
                    partnersid:partnerid,
                    account_name,
                    account_no,
                    isRTA:1
                }
    
                let res = await API.addBankPartner(payload)

                if(res.error) Say.warn(res.message)
                else {
                    this.props.refreshAll(true)
                    Say.ok('Bank Partner successfully added')
                    this.props.navigation.pop()
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {partners, name, account_name, account_no, processing} = this.state
        let ready = false

        if(name && account_name && account_no) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that all of the information inputted is correct.' />

                    <Picker
                        selected={name}
                        items={partners}
                        placeholder='Bank Name'
                        onChoose={this.handleChangeName}
                    />
                    {/*<TextInput
                        ref='name'
                        label='Bank Name'
                        value={name}
                        onChangeText={this.handleChangeName}
                        onSubmitEditing={this.handleFocusAccountName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />*/}

                    <TextInput
                        ref='account_name'
                        label='Account Name'
                        value={account_name}
                        onChangeText={this.handleChangeAccountName}
                        onSubmitEditing={this.handleFocusAccountNo}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='account_no'
                        label='Account No.'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t='Save Bank' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    //addPartner:newPartner => dispatch(Creators.addBankPartner(newPartner)),
    refreshAll:refresh => dispatch(Creators.refreshBankAllPartners(refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)