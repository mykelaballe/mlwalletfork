import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Screen, Text, Button, Spacer, TextInput, Row, Footer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Bank Account'
    }

    state = {
        name:this.props.navigation.state.params.bank.name,
        account_name:this.props.navigation.state.params.bank.account_name,
        account_no:this.props.navigation.state.params.bank.account_no,
        processing:false
    }

    handleChangeName = name => this.setState({name})

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAccountNo = account_no => this.setState({account_no})

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

                    <TextInput
                        label='Bank Name'
                        value={name}
                        onChangeText={this.handleChangeName}
                        autoCapitalize='words'
                    />

                    <TextInput
                        label='Account Name'
                        value={account_name}
                        onChangeText={this.handleChangeAccountName}
                        autoCapitalize='words'
                    />

                    <TextInput
                        label='Account No.'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
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

export default Scrn