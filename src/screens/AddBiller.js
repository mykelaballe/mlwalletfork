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
        mobile:'',
        is_business:false,
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
    handleChangeMobile = mobile => this.setState({mobile, error_mobile:false})

    handleFocusAccountName = () => this.refs.account_name.focus()
    handleFocusAccountNo = () => this.refs.account_no.focus()
    handleFocusFName = () => this.refs.cAccountFname.focus()
    handleFocusLName = () => this.refs.cAccountLname.focus()
    handleFocusEmail = () => this.refs.email.focus()
    handleFocusMobile = () => this.refs.mobile.focus()

    handleToggleIsBusiness = () => this.setState(prevState => ({is_business:!prevState.is_business}))

    handlePay = async () => {
        let res = await Func.validateBillerDetails(this.state)
        if(res.ok) {
            this.props.navigation.navigate('PayBill',{
                biller:{
                    ...this.state,
                    ...res.data,
                    is_business:this.state.is_business
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

        const {bankname, cAccountFname, cAccountLname, business_name, account_name, account_no, email, error_email, mobile, error_mobile, is_business, processing} = this.state
        let ready = false

        if(((is_business && business_name) || (!is_business && cAccountFname && cAccountLname)) && (account_no && email && mobile)) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that all of the information inputted is correct.' />

                    <StaticInput label='Biller' value={bankname} />

                    <TextInput
                        ref='cAccountFname'
                        frozen={is_business}
                        label={_('93')}
                        value={cAccountFname}
                        onChangeText={this.handleChangeFName}
                        onSubmitEditing={this.handleFocusLName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='cAccountLname'
                        frozen={is_business}
                        label={_('94')}
                        value={cAccountLname}
                        onChangeText={this.handleChangeLName}
                        onSubmitEditing={this.handleFocusAccountNo}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <Checkbox
                        status={is_business}
                        onPress={this.handleToggleIsBusiness}
                        label={<Text>{_('99')}<Text b> {_('100',3)}</Text></Text>}
                        labelStyle={{fontSize:Metrics.font.sm}}
                    />

                    <TextInput
                        ref='business_name'
                        editable={is_business}
                        frozen={!is_business}
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
                    />

                    <TextInput
                        ref='mobile'
                        label={_('97')}
                        value={mobile}
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