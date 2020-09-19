import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Button, Picker, Checkbox, Text} from '../components'
import {_, Consts, Say, Func} from '../utils'
import {Metrics} from '../themes'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Bank'
    }

    state = {
        partners:[
            {label:'CHINABANK RTA',value:'MLBPP170374'},
            {label:'METROBANK REMIT TO ACCOUNT',value:'MLBPP160278'}
        ],
        name:'',
        partnerid:'',
        cAccountFname:'',
        cAccountLname:'',
        business_name:'',
        account_name:'',
        account_no:'',
        mobileno:'',
        isBusiness:false,
        error_mobile:false,
        processing:false
    }

    handleChangeName = (bank = {}) => this.setState({name:bank.label, partnerid:bank.value})
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
        let {partnerid, processing} = this.state

        if(!processing) {
            try {
                const {walletno} = this.props.user

                this.setState({processing:true})

                let validateRes = await Func.validateBankDetails(this.state)
    
                if(validateRes.ok) {
                    let res = await API.addBankPartner({
                        walletno,
                        partnersid:partnerid,
                        ...validateRes.data,
                        isRTA:1
                    })
    
                    if(res.error) Say.warn(res.message)
                    else {
                        this.props.refreshAll(true)
                        Say.ok('Bank Partner successfully added')
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

        const {partners, name, account_name, account_no, cAccountFname, cAccountLname, business_name, mobileno, error_mobile, isBusiness, processing} = this.state
        let ready = false

        if(((isBusiness && business_name) || (!isBusiness && cAccountFname && cAccountLname)) && (name && account_no)) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that all of the information inputted is correct.' />

                    <Picker
                        selected={name}
                        items={partners}
                        placeholder='Bank Name'
                        onChoose={this.handleChangeName}
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
                    <Button disabled={!ready} t='Save Bank' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    refreshAll:refresh => dispatch(Creators.refreshBankAllPartners(refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)