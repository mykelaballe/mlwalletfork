import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Button, TextInput, Footer, StaticInput} from '../components'
import {_, Say, Func, Consts} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Biller'
    }

    state = {
        ...this.props.navigation.state.params.biller,
        error_email:false,
        processing:false
    }

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAccountNo = account_no => this.setState({account_no})

    handleChangeEmail = email => this.setState({email, error_email:false})

    handleFocusAccountNo = () => this.refs.account_no.focus()

    handleFocusEmail = () => this.refs.email.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {partnersid, id, account_name, account_no, email, processing} = this.state

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
                    partnersid,
                    id,
                    account_name,
                    account_no,
                    email
                }
    
                let res = await API.updateBiller(payload)

                if(res.error) Say.warn(res.message)
                else {
                    this.props.updateBiller({
                        account_name,
                        account_no,
                        email
                    })
                    this.props.refreshAll(true)
                    this.props.refreshFavorites(true)
                    this.props.refreshRecent(true)
                    Say.ok('Biller successfully updated')
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {partner, account_name, account_no, email, error_email, processing} = this.state
        let ready = false

        if(account_name && account_no) ready = true

        return (
            <>
                <Screen>
                    <StaticInput
                        label='Biller'
                        value={partner}
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
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />
                </Screen>
            
                <Footer>
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
    updateBiller:newProp => dispatch(Creators.updateBiller(newProp)),
    refreshAll:refresh => dispatch(Creators.refreshBillersAll(refresh)),
    refreshFavorites:refresh => dispatch(Creators.refreshBillersFavorites(refresh)),
    refreshRecent:refresh => dispatch(Creators.refreshBillersRecent(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)