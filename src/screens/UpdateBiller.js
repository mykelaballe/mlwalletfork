import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Button, TextInput, Footer, StaticInput} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Biller'
    }

    state = {
        ...this.props.navigation.state.params.biller,
        processing:false
    }

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAccountNo = account_no => this.setState({account_no})

    handleChangeEmail = email => this.setState({email})

    handleFocusAccountNo = () => this.refs.account_no.focus()

    handleFocusEmail = () => this.refs.email.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {bill_partner_accountid, id, account_name, account_no, email, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            account_name = account_name.trim()
            account_no = account_no.trim()
            email = email.trim()

            if(!account_name || !account_no) Say.some(_('8'))
            else {

                let payload = {
                    walletno,
                    partnersid:bill_partner_accountid,
                    id,
                    account_name,
                    account_no,
                    email
                }
    
                let res = await API.updateBiller(payload)

                if(res.error) Say.warn(res.message)
                else {
                    /*this.props.updatePartner({
                        bankname,
                        account_name,
                        account_no,
                        old_account_name:account_name,
                        old_account_no:account_no
                    })*/
                    this.props.refreshAll(true)
                    this.props.refreshFavorites(true)
                    this.props.refreshRecent(true)
                    Say.ok('Biller successfully updated')
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {bill_partner_name, account_name, account_no, email, processing} = this.state
        let ready = false

        if(account_name && account_no) ready = true

        return (
            <>
                <Screen>
                    <StaticInput
                        label='Biller'
                        value={bill_partner_name}
                    />

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
                        onSubmitEditing={this.handleFocusEmail}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='email'
                        label='Email'
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t='Save Biller' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updatePartner:newProp => dispatch(Creators.updateBankPartner(newProp)),
    refreshAll:refresh => dispatch(Creators.refreshBankAllPartners(refresh)),
    refreshFavorites:refresh => dispatch(Creators.refreshBankFavorites(refresh)),
    refreshRecent:refresh => dispatch(Creators.refreshBankRecent(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)