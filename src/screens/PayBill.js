import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text, Spacer, Button, TextInput} from '../components'
import {_, Consts, Func, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Pay Bill'
    }

    state = {
        ...this.props.navigation.state.params.biller,
        amount:'',
        fixed_charge:this.props.navigation.state.params.biller.charge,
        convenience_fee:this.props.navigation.state.params.biller.convenienceFee,
        total:'',
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
    handleChangeAccountNo = account_no => this.setState({account_no})
    handleChangeAccountName = account_name => this.setState({account_name})
    handleChangeEmail = email => this.setState({email})
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

    handlePay = async () => {
        let {cAccountFname, cAccountLname, amount, fixed_charge, convenience_fee, processing} = this.state
        const {params} = this.props.navigation.state

        if(processing) return false

        try {

            cAccountFname = cAccountFname.trim()
            cAccountLname = cAccountLname.trim()

            this.setState({processing:true})
            
            if(!cAccountFname || !cAccountLname) Say.warn('Please enter customer name')
            else if(Func.formatToCurrency(amount) <= 0) Say.warn(_('89'))
            else {
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
                            cAccountFname,
                            cAccountLname,
                            biller:params.biller,
                            fixed_charge:res.data.fixedCharge,
                            total:Func.compute(res.data.fixedCharge, convenience_fee, amount),
                            sender:`${this.props.user.fname} ${this.props.user.lname}`
                        },
                        status:'success'
                    })
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {bankname, account_no, cAccountFname, cAccountLname, account_name, amount, email, processing} = this.state
        let ready = false

        if(cAccountFname && cAccountLname && account_no && account_name && amount) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext={bankname} />

                    <TextInput
                        editable={!processing}
                        ref='account_no'
                        label='Account Number'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                        onSubmitEditing={this.handleFocusAccountName}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
                        ref='account_name'
                        label='Account Name'
                        value={account_name}
                        onChangeText={this.handleChangeAccountName}
                        onSubmitEditing={this.handleFocusAmount}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
                        ref='amount'
                        label={`Amount (${Consts.currency.PH})`}
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleFocusFName}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
                        ref='cAccountFname'
                        label='Customer First Name'
                        value={cAccountFname}
                        onChangeText={this.handleChangeFName}
                        onSubmitEditing={this.handleFocusLName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
                        ref='cAccountLname'
                        label='Customer Last Name'
                        value={cAccountLname}
                        onChangeText={this.handleChangeLName}
                        onSubmitEditing={this.handleFocusEmail}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
                        ref='email'
                        label='Email address'
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        autoCapitalize='none'
                        keyboardType='email-address'
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