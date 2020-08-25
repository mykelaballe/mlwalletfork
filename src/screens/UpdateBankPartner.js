import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Button, TextInput, Footer} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Bank Account'
    }

    state = {
        ...this.props.navigation.state.params.bank,
        account_name:this.props.navigation.state.params.bank.old_account_name,
        account_no:this.props.navigation.state.params.bank.old_account_no,
        cAccountFname:this.props.navigation.state.params.bank.cAccountFname,
        cAccountLname:this.props.navigation.state.params.bank.cAccountLname,
        processing:false
    }

    handleChangeName = bankname => this.setState({bankname})
    handleChangeAccountName = account_name => this.setState({account_name})
    handleChangeAccountNo = account_no => this.setState({account_no})
    handleChangeFName = cAccountFname => this.setState({cAccountFname})
    handleChangeLName = cAccountLname => this.setState({cAccountLname})

    handleFocusAccountName = () => this.refs.account_name.focus()
    handleFocusAccountNo = () => this.refs.account_no.focus()
    handleFocusFName = () => this.refs.cAccountFname.focus()
    handleFocusLName = () => this.refs.cAccountLname.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {bankname, account_name, account_no, old_partnersid, old_account_no, old_account_name, cAccountFname, cAccountLname, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            bankname = bankname.trim()
            account_name = account_name.trim()
            account_no = account_no.trim()
            cAccountFname = cAccountFname.trim()
            cAccountLname = cAccountLname.trim()

            if(!bankname || !account_name || !account_no || !cAccountFname || !cAccountLname) Say.some(_('8'))
            else if(!Func.isAlphaNumOnly(account_no)) Say.warn(Consts.error.onlyAlphaNum)
            else {

                let payload = {
                    walletno,
                    bankname,
                    account_name,
                    account_no,
                    old_partnersid,
                    old_account_no,
                    old_account_name,
                    cAccountFname,
                    cAccountLname
                }
    
                let res = await API.updateBankPartner(payload)

                if(res.error) Say.warn(res.message)
                else {
                    this.props.updatePartner({
                        bankname,
                        account_name,
                        account_no,
                        old_account_name:account_name,
                        old_account_no:account_no,
                        cAccountFname,
                        cAccountLname
                    })
                    this.props.refreshAll(true)
                    this.props.refreshFavorites(true)
                    this.props.refreshRecent(true)
                    Say.ok('Bank Partner successfully updated')
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

        const {bankname, account_name, account_no, cAccountFname, cAccountLname, processing} = this.state
        let ready = false

        if(bankname && account_name && account_no && cAccountFname && cAccountLname) ready = true

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
                        onSubmitEditing={this.handleFocusFName}
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='cAccountFname'
                        label='Customer First Name'
                        value={cAccountFname}
                        onChangeText={this.handleChangeFName}
                        onSubmitEditing={this.handleFocusLName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='cAccountLname'
                        label='Customer Last Name'
                        value={cAccountLname}
                        onChangeText={this.handleChangeLName}
                        autoCapitalize='words'
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