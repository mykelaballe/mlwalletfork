import React from 'react'
import {Screen, Footer, Headline, Text, Spacer, Button, TextInput, Row, Switch} from '../components'
import {_, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Pay Bill'
    }

    state = {
        account_no:'',
        account_name:'',
        amount:'',
        email:'',
        add_to_favorites:false,
        fixed_charge:'15',
        convenience_fee:'7',
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
                email:biller.email,
                add_to_favorites:biller.add_to_favorites
            })
        }
    }

    handleChangeAccountNo = account_no => this.setState({account_no})

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAmount = amount => {
        const {fixed_charge, convenience_fee} = this.state
        this.setState({
            amount,
            total:Func.compute(fixed_charge, convenience_fee, amount)
        })
    }

    handleChangeEmail = email => this.setState({email})

    handleFocusAccountName = () => this.refs.account_name.focus()

    handleFocusAmount = () => this.refs.amount.focus()

    handleFocusEmail = () => this.refs.email.focus()

    handleToggleAddToFavorites = () => this.setState(prevState => ({add_to_favorites:!prevState.add_to_favorites}))

    handlePay = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            ...params,
            transaction: {
                ...this.state,
                biller:params.biller
            },
            type:Consts.tcn.bpm.code,
            status:'success'
        })
    }

    render() {

        const {type, biller} = this.props.navigation.state.params
        const {account_no, account_name, amount, email, add_to_favorites} = this.state
        let ready = false

        if(account_no && account_name && amount) ready = true

        return (
            <>
                <Screen>
                    <Headline title={biller.name} />

                    <TextInput
                        ref='account_no'
                        label='Account Number'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                        onSubmitEditing={this.handleFocusAccountName}
                        autoCapitalize='none'
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
                        label='Email address (Optional)'
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />

                    <Spacer sm />

                    <Row bw>
                        <Text mute md>{add_to_favorites ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
                        <Switch value={add_to_favorites} onValueChange={this.handleToggleAddToFavorites} />
                    </Row>
                </Screen>
                
                <Footer>
                    <Text mute center>Note: Fees and charges may apply.</Text>
                    <Spacer />
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handlePay} />
                </Footer>
            </>
        )
    }
}

export default Scrn