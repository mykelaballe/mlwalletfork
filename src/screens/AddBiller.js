import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Button, StaticInput} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Biller'
    }

    state = {
        ...this.props.navigation.state.params.biller,
        account_name:'',
        account_no:'',
        email:'',
        error_email:false,
        processing:false
    }

    handleChangeAccountNo = account_no => this.setState({account_no})

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeEmail = email => this.setState({email, error_email:false})

    handleFocusAccountName = () => this.refs.account_name.focus()

    handleFocusAccountNo = () => this.refs.account_no.focus()

    handleFocusEmail = () => this.refs.email.focus()

    handlePay = () => this.props.navigation.navigate('PayBill',{biller:this.state})

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {bill_partner_accountid, $id, account_name, account_no, email, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            account_name = account_name.trim()
            account_no = account_no.trim()
            email = email.trim()

            if(!account_name || !account_no) Say.some(_('8'))
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
                    partnersid:bill_partner_accountid,
                    id:$id,
                    account_no,
                    account_name,
                    email
                }
    
                let res = await API.addBiller(payload)

                if(res.error) Say.warn(res.message)
                else {
                    this.props.refreshAll(true)
                    Say.ok('Biller successfully added')
                    this.props.navigation.pop()
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {bill_partner_name, account_name, account_no, email, error_email, processing} = this.state
        let ready = false

        if(account_name && account_no) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that all of the information inputted is correct.' />

                    <StaticInput
                        label='Biller'
                        value={bill_partner_name}
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
                        label='Account No.'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                        onSubmitEditing={this.handleFocusEmail}
                        keyboardType='numeric'
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
                    <Button disabled={!ready} t='Pay' onPress={this.handlePay} />
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