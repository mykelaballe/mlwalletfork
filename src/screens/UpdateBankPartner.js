import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Button, TextInput, Footer, Checkbox, Text} from '../components'
import {_, Say, Consts, Func} from '../utils'
import {Metrics} from '../themes'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Bank Account'
    }

    state = {
        ...this.props.navigation.state.params.bank,
        account_name:this.props.navigation.state.params.bank.old_account_name,
        account_no:this.props.navigation.state.params.bank.old_account_no,
        cAccountFname:!this.props.navigation.state.params.bank.isBusiness ? this.props.navigation.state.params.bank.cAccountFname : '',
        cAccountLname:!this.props.navigation.state.params.bank.isBusiness ? this.props.navigation.state.params.bank.cAccountLname : '',
        business_name:this.props.navigation.state.params.bank.isBusiness ? this.props.navigation.state.params.bank.old_account_name : '',
        error_mobile:false,
        processing:false
    }

    handleChangeName = bankname => this.setState({bankname})
    handleChangeAccountName = account_name => this.setState({account_name})
    handleChangeAccountNo = account_no => this.setState({account_no})
    handleChangeFName = cAccountFname => this.setState({cAccountFname})
    handleChangeLName = cAccountLname => this.setState({cAccountLname})
    handleChangeBusinessName = business_name => this.setState({business_name})
    handleChangeMobile = mobileno => this.setState({mobileno, error_mobile:false})

    handleFocusAccountName = () => this.refs.account_name.focus()
    handleFocusAccountNo = () => this.refs.account_no.focus()
    handleFocusFName = () => this.refs.cAccountFname.focus()
    handleFocusLName = () => this.refs.cAccountLname.focus()
    handleFocusMobile = () => this.refs.mobileno.focus()

    handleToggleIsBusiness = () => this.setState(prevState => ({isBusiness:!prevState.isBusiness}))

    handleSubmit = async () => {
        let {bankname, old_partnersid, old_account_no, old_account_name, processing} = this.state

        if(!processing) {
            try {
                const {walletno} = this.props.user
    
                this.setState({processing:true})

                let validateRes = await Func.validateBankDetails({
                    ...this.state,
                    name:bankname
                })

                if(validateRes.ok) {        
                    let res = await API.updateBankPartner({
                        walletno,
                        ...validateRes.data,
                        bankname:validateRes.data.name,
                        old_partnersid,
                        old_account_no,
                        old_account_name
                    })
    
                    if(res.error) Say.warn(res.message)
                    else {
                        this.props.updatePartner({
                            ...validateRes.data,
                            bankname:validateRes.data.name,
                            old_account_name:validateRes.data.account_name,
                            old_account_no:validateRes.data.account_no,
                            isBusiness: validateRes.data.isBusiness ? true : false
                        })
                        this.props.refreshAll(true)
                        this.props.refreshFavorites(true)
                        this.props.refreshRecent(true)
                        Say.ok('Bank Partner successfully updated')
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

        const {bankname, account_name, account_no, cAccountFname, cAccountLname, business_name, mobileno, error_mobile, isBusiness, processing} = this.state
        let ready = false

        if(((isBusiness && business_name) || (!isBusiness && cAccountFname && cAccountLname)) && (bankname && account_no)) ready = true

        return (
            <>
                <Screen>
                    <TextInput
                        disabled
                        label='Bank Name'
                        value={bankname}
                    />

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
                        label='Account No.'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                        onSubmitEditing={this.handleFocusMobile}
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
                    <Button disabled={!ready} t='Save Bank Account' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updatePartner:newProp => dispatch(Creators.updateBankPartner(newProp)),
    refreshAll:refresh => dispatch(Creators.refreshBankAllPartners(refresh)),
    refreshFavorites:refresh => dispatch(Creators.refreshBankFavorites(refresh)),
    refreshRecent:refresh => dispatch(Creators.refreshBankRecent(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)