import React from 'react'
import {Screen, Footer, Headline, Text, Spacer, Button, TextInput} from '../components'
import {_, Consts, Func, Say} from '../utils'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Pay Bill'
    }

    state = {
        account_name:'',
        account_no:'',
        email:'',
        ...this.props.navigation.state.params.biller,
        amount:'',
        fixed_charge:this.props.navigation.state.params.biller.charge,
        convenience_fee:'15',
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

    handleFocusAccountName = () => this.refs.account_name.focus()
    handleFocusAmount = () => this.refs.amount.focus()
    handleFocusEmail = () => this.refs.email.focus()

    handlePay = async () => {
        const {amount} = this.state
        const {params} = this.props.navigation.state

        if(Func.formatToCurrency(amount) <= 0) Say.warn(_('89'))
        else {
            this.props.navigation.navigate('TransactionReview',{
                ...params,
                type:Consts.tcn.bpm.code,
                transaction: {
                    ...this.state,
                    biller:params.biller
                },
                status:'success'
            })
        }
    }

    render() {

        const {partner, account_no, account_name, amount, email} = this.state
        let ready = false

        if(account_no && account_name && amount) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext={partner} />

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
                        label='Amount (PHP)'
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
                    <Button disabled={!ready} t={Consts.tcn.bpm.submit_text} onPress={this.handlePay} />
                </Footer>
            </>
        )
    }
}