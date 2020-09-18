import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text, Spacer, Button, TextInput, Checkbox} from '../components'
import {_, Consts, Func, Say} from '../utils'
import {Metrics} from '../themes'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Pay Bill'
    }

    state = {
        ...this.props.navigation.state.params.biller,
        cAccountFname:!this.props.navigation.state.params.biller.is_business ? this.props.navigation.state.params.biller.cAccountFname : '',
        cAccountLname:!this.props.navigation.state.params.biller.is_business ? this.props.navigation.state.params.biller.cAccountLname : '',
        business_name:this.props.navigation.state.params.biller.is_business ? this.props.navigation.state.params.biller.account_name : '',
        amount:'',
        fixed_charge:this.props.navigation.state.params.biller.charge,
        convenience_fee:this.props.navigation.state.params.biller.convenienceFee,
        total:'',
        error_email:false,
        error_mobile:false,
        processing:false
    }

    componentDidMount = () => {
        const {params = {}} = this.props.navigation.state

        if(params.biller) {
            const biller = params.biller
            this.setState({
                account_no:biller.account_no,
                account_name:biller.account_name,
                email:biller.email
            })
        }
    }

    handleChangeFName = cAccountFname => this.setState({cAccountFname})
    handleChangeLName = cAccountLname => this.setState({cAccountLname})
    handleChangeBusinessName = business_name => this.setState({business_name})
    handleChangeAccountNo = account_no => this.setState({account_no})
    handleChangeAccountName = account_name => this.setState({account_name})
    handleChangeEmail = email => this.setState({email, error_email:false})
    handleChangeMobile = mobile => this.setState({mobile, error_mobile:false})
    handleChangeAmount = amount => {
        const {fixed_charge, convenience_fee} = this.state
        if(Func.isAmount2Decimal(amount)) {
            this.setState({
                amount,
                total:Func.compute(fixed_charge, convenience_fee, amount)
            })
        }
    }

    handleFocusFName = () => this.refs.cAccountFname.focus()
    handleFocusLName = () => this.refs.cAccountLname.focus()
    handleFocusAccountNo = () => this.refs.account_no.focus()
    handleFocusAccountName = () => this.refs.account_name.focus()
    handleFocusAmount = () => this.refs.amount.focus()
    handleFocusEmail = () => this.refs.email.focus()
    handleFocusMobile = () => this.refs.mobile.focus()

    handleToggleIsBusiness = () => this.setState(prevState => ({is_business:!prevState.is_business}))

    handlePay = async () => {
        let {amount, fixed_charge, convenience_fee, processing} = this.state
        const {params} = this.props.navigation.state

        if(processing) return false

        if(!processing) {
            try {
    
                this.setState({processing:true})

                let validateRes = await Func.validateBillerDetails(this.state)

                if(Func.formatToCurrency(amount) <= 0) Say.warn(_('89'))
                else {
                    if(validateRes.ok) {
                        let res = await API.paybillValidate({
                            walletno:this.props.user.walletno,
                            principal:amount,
                            partnersId:params.biller.old_partnersid,
                            fixed_charge,
                            convenience_fee
                        })

                        if(res.error) Say.warn(res.message)
                        else {
                            this.props.navigation.navigate('TransactionReview',{
                                ...params,
                                type:Consts.tcn.bpm.code,
                                transaction: {
                                    ...this.state,
                                    ...validateRes.data,
                                    biller:params.biller,
                                    fixed_charge:res.data.fixedCharge,
                                    total:Func.compute(res.data.fixedCharge, convenience_fee, amount),
                                    sender:`${this.props.user.fname} ${this.props.user.lname}`
                                },
                                status:'success'
                            })
                        }
                    }
                    else {
                        if(validateRes.errors) this.setState(validateRes.errors)
                    }
                }
            }
            catch(err) {
                Say.err(err)
            }
    
            this.setState({processing:false})
        }
    }

    render() {

        const {bankname, account_no, cAccountFname, cAccountLname, business_name, account_name, amount, email, error_email, mobile, error_mobile, is_business, processing} = this.state
        let ready = false

        if(((is_business && business_name) || (!is_business && cAccountFname && cAccountLname)) && (account_no && email && mobile && amount)) ready = true

        return (
            <>
                <Screen>
                    <Headline title={bankname} />

                    <TextInput
                        editable={!processing}
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
                        editable={!processing}
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
                        editable={!processing}
                        ref='account_no'
                        label={_('95')}
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                        onSubmitEditing={this.handleFocusAmount}
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
                        ref='amount'
                        label={`Amount (${Consts.currency.PH})`}
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleFocusEmail}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
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
                        editable={!processing}
                        ref='mobile'
                        label={_('97')}
                        value={mobile}
                        error={error_mobile}
                        onChangeText={this.handleChangeMobile}
                        keyboardType='numeric'
                    />
                </Screen>
                
                <Footer>
                    <Text mute center>Note: Fees and charges may apply.</Text>
                    <Spacer />
                    <Button disabled={!ready} t={Consts.tcn.bpm.submit_text} onPress={this.handlePay} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)