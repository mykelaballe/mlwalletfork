import React from 'react'
import {View} from 'react-native'
import {Screen, Footer, Headline, TextInput, Text, Button} from '../components'
import {_, Say} from '../utils'

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
            let {name, account_name, account_no, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            name = name.trim()
            account_name = account_name.trim()
            account_no = account_no.trim()

            if(name == '' || account_name == '' || account_no == '') Say.some(_('8'))
            else {

                let payload = {
                    name,
                    account_name,
                    account_no
                }
    
                //await API.addNewReceiver(payload)

                this.props.navigation.pop()
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err(_('18'))
        }
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

export default Scrn