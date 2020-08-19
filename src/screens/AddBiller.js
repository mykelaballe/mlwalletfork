import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Button, StaticInput, Spacer} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Biller'
    }

    state = {
        ...this.props.navigation.state.params.biller,
        cAccountFname:'',
        cAccountLname:'',
        account_name:'',
        account_no:'',
        email:'',
        error_email:false,
        processing:false
    }

    handleChangeAccountNo = account_no => this.setState({account_no})
    handleChangeAccountName = account_name => this.setState({account_name})
    handleChangeFName = cAccountFname => this.setState({cAccountFname})
    handleChangeLName = cAccountLname => this.setState({cAccountLname})
    handleChangeEmail = email => this.setState({email, error_email:false})

    handleFocusAccountName = () => this.refs.account_name.focus()
    handleFocusAccountNo = () => this.refs.account_no.focus()
    handleFocusFName = () => this.refs.cAccountFname.focus()
    handleFocusLName = () => this.refs.cAccountLname.focus()
    handleFocusEmail = () => this.refs.email.focus()

    handlePay = () => {
        let {account_name, account_no, email} = this.state

        account_name = account_name.trim()
        account_no = account_no.trim()
        email = email.trim()

        if(!account_name || !account_no) Say.some(_('8'))
        else if(!Func.isAlphaNumOnly(account_no)) Say.warn(Consts.error.onlyAlphaNum)
        else if(email && !Func.hasEmailSpecialCharsOnly(email)) {
            this.setState({error_email:true})
            Say.warn(Consts.error.notAllowedChar)
        }
        else if(email && !Func.isEmail(email)) {
            this.setState({error_email:true})
            Say.warn(Consts.error.email)
        }
        else {
            this.props.navigation.navigate('PayBill',{
                biller:{
                    ...this.state
                }
            })
        }
    }

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {bill_partner_accountid, cAccountFname, cAccountLname, account_name, account_no, email, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            cAccountFname = cAccountFname.trim()
            cAccountLname = cAccountLname.trim()
            account_name = account_name.trim()
            account_no = account_no.trim()
            email = email.trim()

            if(!account_name || !account_no) Say.some(_('8'))
            else if(!Func.isAlphaNumOnly(account_no)) Say.warn(Consts.error.onlyAlphaNum)
            else if(email && !Func.hasEmailSpecialCharsOnly(email)) {
                this.setState({error_email:true})
                Say.warn(Consts.error.notAllowedChar)
            }
            else if(email && !Func.isEmail(email)) {
                this.setState({error_email:true})
                Say.warn(Consts.error.email)
            }
            else {

                let payload = {
                    walletno,
                    cAccountFname,
                    cAccountLname,
                    partnersid:bill_partner_accountid,
                    account_no,
                    account_name,
                    email,
                    isRTA:0
                }
    
                let res = await API.addBankPartner(payload)

                if(res.error) Say.warn(res.message)
                else {
                    this.props.refreshAll(true)
                    Say.ok('Biller successfully added')
                    this.props.navigation.navigate('AllBillsPartners')
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {bankname, cAccountFname, cAccountLname, account_name, account_no, email, error_email, processing} = this.state
        let ready = false

        if(cAccountFname && cAccountLname && account_name && account_no) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that all of the information inputted is correct.' />

                    <StaticInput
                        label='Biller'
                        value={bankname}
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
                        label='Account Number'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                        onSubmitEditing={this.handleFocusFName}
                        keyboardType='numeric'
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
                        onSubmitEditing={this.handleFocusEmail}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='email'
                        label='Email'
                        value={email}
                        error={error_email}
                        onChangeText={this.handleChangeEmail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready || processing} mode='outlined' t='Pay' onPress={this.handlePay} />
                    <Spacer xs />
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
    refreshAll:refresh => dispatch(Creators.refreshBillersAll(refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)