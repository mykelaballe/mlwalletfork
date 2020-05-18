import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Button, TextInput, Footer} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Bank Account'
    }

    state = {
        ...this.props.navigation.state.params.bank,
        account_name:this.props.navigation.state.params.bank.old_account_name,
        account_no:this.props.navigation.state.params.bank.old_account_no,
        processing:false
    }

    handleChangeName = bankname => this.setState({bankname})

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAccountNo = account_no => this.setState({account_no})

    handleFocusAccountName = () => this.refs.account_name.focus()

    handleFocusAccountNo = () => this.refs.account_no.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {bankname, account_name, account_no, old_partnersid, old_account_no, old_account_name, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            bankname = bankname.trim()
            account_name = account_name.trim()
            account_no = account_no.trim()

            if(!bankname || !account_name || !account_no) Say.some(_('8'))
            else {

                let payload = {
                    walletno,
                    bankname,
                    account_name,
                    account_no,
                    old_partnersid,
                    old_account_no,
                    old_account_name
                }
    
                let res = await API.updateBankPartner(payload)

                if(res.error) Say.warn(res.message)
                else {
                    this.props.updatePartner({
                        bankname,
                        account_name,
                        account_no,
                        old_account_name:account_name,
                        old_account_no:account_no
                    })
                    this.props.refreshAll(true)
                    this.props.refreshFavorites(true)
                    this.props.refreshRecent(true)
                    Say.ok('Bank Partner successfully updated')
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {bankname, account_name, account_no, processing} = this.state
        let ready = false

        if(bankname && account_name && account_no) ready = true

        return (
            <>
                <Screen>
                    <TextInput
                        disabled
                        label='Bank Name'
                        value={bankname}
                    />
                    {/*<TextInput
                        ref='bankname'
                        label='Bank Name'
                        value={bankname}
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
                        keyboardType='numeric'
                    />
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t='Save Bank Account' onPress={this.handleSubmit} loading={processing} />
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