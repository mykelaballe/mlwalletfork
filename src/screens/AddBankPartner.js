import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Button} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Bank'
    }

    state = {
        name:'',
        account_name:'',
        account_no:'',
        processing:false
    }

    handleChangeName = name => this.setState({name})

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAccountNo = account_no => this.setState({account_no})

    handleFocusAccountName = () => this.refs.account_name.focus()

    handleFocusAccountNo = () => this.refs.account_no.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {name, account_name, account_no, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            name = name.trim()
            account_name = account_name.trim()
            account_no = account_no.trim()

            if(!name || !account_name || !account_no) Say.some(_('8'))
            else {

                let payload = {
                    walletno,
                    bankname:name,
                    account_name,
                    account_no
                }
    
                let res = await API.addBankPartner(payload)

                if(res.error) Say.some(res.message)
                else {
                    this.props.addPartner({
                        ...res,
                        ...payload,
                        old_account_no:account_no,
                        old_account_name:account_name
                    })
                    Say.some('Bank Partner successfully added')
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

        const {name, account_name, account_no, processing} = this.state
        let ready = false

        if(name && account_name && account_no) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that all of the information inputted is correct.' />

                    <TextInput
                        ref='name'
                        label='Bank Name'
                        value={name}
                        onChangeText={this.handleChangeName}
                        onSubmitEditing={this.handleFocusAccountName}
                        autoCapitalize='words'
                        returnKeyType='next'
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
    addPartner:newPartner => dispatch(Creators.addBankPartner(newPartner))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)