import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Button, TextInput, Footer, StaticInput, Checkbox, Text} from '../components'
import {_, Say, Func} from '../utils'
import {Metrics} from '../themes'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Biller'
    }

    state = {
        ...this.props.navigation.state.params.biller,
        cAccountFname:!this.props.navigation.state.params.biller.isBusiness ? this.props.navigation.state.params.biller.cAccountFname : '',
        cAccountLname:!this.props.navigation.state.params.biller.isBusiness ? this.props.navigation.state.params.biller.cAccountLname : '',
        business_name:this.props.navigation.state.params.biller.isBusiness ? this.props.navigation.state.params.biller.account_name : '',
        error_email:false,
        error_mobile:false,
        processing:false
    }

    handleChangeAccountName = account_name => this.setState({account_name})
    handleChangeAccountNo = account_no => this.setState({account_no})
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

    handleSubmit = async () => {
        let {bankname, old_partnersid, old_account_no, old_account_name, processing} = this.state

        if(!processing) {
            try {
                const {walletno} = this.props.user

                this.setState({processing:true})

                let validateRes = await Func.validateBillerDetails(this.state)

                if(validateRes.ok) {        
                    let res = await API.updateBankPartner({
                        walletno,
                        bankname,
                        old_partnersid,
                        old_account_no,
                        old_account_name,
                        ...validateRes.data
                    })
    
                    if(res.error) Say.warn(res.message)
                    else {
                        this.props.updateBiller({
                            ...validateRes.data,
                            isBusiness: validateRes.data.isBusiness ? true : false
                        })
                        this.props.refreshAll(true)
                        this.props.refreshFavorites(true)
                        this.props.refreshRecent(true)
                        Say.ok('Biller successfully updated')
                        this.props.navigation.pop()
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

        const {bankname, account_name, account_no, cAccountFname, cAccountLname, business_name, email, error_email, mobileno, error_mobile, isBusiness, processing} = this.state
        let ready = false

        if(((isBusiness && business_name) || (!isBusiness && cAccountFname && cAccountLname)) && (account_no)) ready = true

        return (
            <>
                <Screen>
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
                        keyboardType='email-address'
                        autoCapitalize='none'
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