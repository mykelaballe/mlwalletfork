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
        fname:'',
        lname:'',
        account_name:'',
        account_no:'',
        email:'',
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

    handleChangeFName = fname => this.setState({fname})
    handleChangeLName = lname => this.setState({lname})
    handleChangeAccountNo = account_no => this.setState({account_no})
    handleChangeAccountName = account_name => this.setState({account_name})
    handleChangeEmail = email => this.setState({email})
    handleChangeAmount = amount => {
        const {fixed_charge, convenience_fee} = this.state
        this.setState({
            amount,
            total:Func.compute(fixed_charge, convenience_fee, amount)
        })
    }

    handleFocusLName = () => this.refs.lname.focus()
    handleFocusAccountNo = () => this.refs.account_no.focus()
    handleFocusAccountName = () => this.refs.account_name.focus()
    handleFocusAmount = () => this.refs.amount.focus()
    handleFocusEmail = () => this.refs.email.focus()

    handlePay = async () => {
        let {fname, lname, amount, fixed_charge, convenience_fee, processing} = this.state
        const {params} = this.props.navigation.state

        if(processing) return false

        try {

            fname = fname.trim()
            lname = lname.trim()

            this.setState({processing:true})
            
            //if(!fname || !lname) Say.warn('Please enter customer name')
            if(Func.formatToCurrency(amount) <= 0) Say.warn(_('89'))
            else {
                let res = await API.paybillValidate({
                    walletno:this.props.user.walletno,
                    principal:amount,
                    fixed_charge,
                    convenience_fee,
                    partnersId:params.biller.partnersid,
                    //fname,
                    //lname
                })

                if(res.error) Say.warn(res.message)
                else {
                    this.props.navigation.navigate('TransactionReview',{
                        ...params,
                        type:Consts.tcn.bpm.code,
                        transaction: {
                            ...this.state,
                            fname,
                            lname,
                            biller:params.biller,
                            fixed_charge:res.data.fixedCharge,
                            sender:Func.formatName(this.props.user)
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

        const {partner, account_no, fname, lname, account_name, amount, email, processing} = this.state
        let ready = false

        if(account_no && account_name && amount) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext={partner} />

                    <TextInput
                        ref='fname'
                        label='Customer First Name'
                        value={fname}
                        onChangeText={this.handleChangeFName}
                        onSubmitEditing={this.handleFocusLName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='lname'
                        label='Customer Last Name'
                        value={lname}
                        onChangeText={this.handleChangeLName}
                        onSubmitEditing={this.handleFocusAccountNo}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='account_no'
                        label='Account Number'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                        onSubmitEditing={this.handleFocusAccountName}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='account_name'
                        label='Account Name'
                        value={account_name}
                        onChangeText={this.handleChangeAccountName}
                        onSubmitEditing={this.handleFocusAmount}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='amount'
                        label={`Amount (${Consts.currency.PH})`}
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleFocusEmail}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TextInput
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