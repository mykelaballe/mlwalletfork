import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Button, StaticInput, Spacer, Checkbox, Text} from '../components'
import {_, Say, Func} from '../utils'
import {Metrics} from '../themes'
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
        business_name:'',
        account_no:'',
        email:'',
        mobileno:'',
        isBusiness:false,
        error_email:false,
        error_mobile:false,
        processing:false
    }

    handleChangeAccountNo = account_no => this.setState({account_no})
    handleChangeAccountName = account_name => this.setState({account_name})
    handleChangeFName = cAccountFname => this.setState({cAccountFname})
    handleChangeLName = cAccountLname => this.setState({cAccountLname})
    handleChangeBusinessName = business_name => this.setState({business_name})
    handleChangeEmail = email => this.setState({email, error_email:false})
    handleChangeMobile = mobileno => this.setState({mobileno, error_mobile:false})

    handleFocusAccountName = () => this.refs.account_name.focus()
    handleFocusAccountNo = () => this.refs.account_no.focus()
    handleFocusFName = () => this.refs.cAccountFname.focus()
    handleFocusLName = () => this.refs.cAccountLname.focus()
    handleFocusEmail = () => this.refs.email.focus()
    handleFocusMobile = () => this.refs.mobileno.focus()

    handleToggleIsBusiness = () => this.setState(prevState => ({isBusiness:!prevState.isBusiness}))

    handlePay = async () => {
        let res = await Func.validateBillerDetails(this.state)
        if(res.ok) {
            this.props.navigation.navigate('PayBill',{
                biller:{
                    ...this.state,
                    ...res.data
                }
            })
        }
        else {
            if(res.errors) this.setState(res.errors)
        }
    }

    handleSubmit = async () => {
        let {bill_partner_accountid, processing} = this.state

        if(!processing) {
            try {
                const {walletno} = this.props.user

                this.setState({processing:true})
    
                let validateRes = await Func.validateBillerDetails(this.state)
    
                if(validateRes.ok) {
                    let payload = {
                        walletno,
                        partnersid:bill_partner_accountid,
                        ...validateRes.data,
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
                else {
                    if(validateRes.errors) this.setState(validateRes.errors)
                }
            }
            catch(err) {
                Say.err(err)
            }
    
            this.setState({processing:false})
        }
    }

    render() {

        const {bankname, cAccountFname, cAccountLname, business_name, account_name, account_no, email, error_email, mobileno, error_mobile, isBusiness, processing} = this.state
        let ready = false

        if(((isBusiness && business_name) || (!isBusiness && cAccountFname && cAccountLname)) && (account_no)) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that all of the information inputted is correct.' />

                    <StaticInput label='Biller' value={bankname} />

                    <TextInput
                        ref='cAccountFname'
                        editable={!isBusiness}
                        frozen={isBusiness}
                        label={_('93')}
                        value={cAccountFname}
                        onChangeText={this.handleChangeFName}
                        onSubmitEditing={this.handleFocusLName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='cAccountLname'
                        editable={!isBusiness}
                        frozen={isBusiness}
                        label={_('94')}
                        value={cAccountLname}
                        onChangeText={this.handleChangeLName}
                        onSubmitEditing={this.handleFocusAccountNo}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <Checkbox
                        status={isBusiness}
                        onPress={this.handleToggleIsBusiness}
                        label={<Text>{_('99')}<Text b> {_('100',3)}</Text></Text>}
                        labelStyle={{fontSize:Metrics.font.sm}}
                    />

                    <TextInput
                        ref='business_name'
                        editable={isBusiness}
                        frozen={!isBusiness}
                        label={_('98')}
                        value={business_name}
                        onChangeText={this.handleChangeBusinessName}
                        onSubmitEditing={this.handleFocusAccountNo}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='account_no'
                        label={_('95')}
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                        onSubmitEditing={this.handleFocusEmail}
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='email'
                        label={_('96')}
                        value={email}
                        error={error_email}
                        onChangeText={this.handleChangeEmail}
                        onSubmitEditing={this.handleFocusMobile}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='mobileno'
                        label={_('97')}
                        value={mobileno}
                        error={error_mobile}
                        onChangeText={this.handleChangeMobile}
                        keyboardType='numeric'
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