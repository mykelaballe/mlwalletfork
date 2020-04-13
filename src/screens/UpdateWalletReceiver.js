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
        title:'Edit Receiver'
    }

    state = {
        wallet_id:this.props.navigation.state.params.receiver.wallet_id,
        fullname:this.props.navigation.state.params.receiver.fullname,
        processing:false
    }

    handleChangeWalletNo = wallet_id => this.setState({wallet_id})

    handleChangeFullName = fullname => this.setState({fullname})

    handleSubmit = async () => {
        let {wallet_id, fullname, processing} = this.state

        if(processing) return false

        try {
            wallet_id = wallet_id.trim()
            fullname = fullname.trim()

            if(!wallet_id || !fullname) Say.some(_('8'))
            else {
                Say.ok('Receiver updated')
            }
        }
        catch(err) {
            Say.err(err)
        }
    }

    render() {

        const {wallet_id, fullname, processing} = this.state
        let ready = false

        if(wallet_id && fullname) ready = true

        return (
            <>
                <Screen>

                    <TextInput
                        label={'Wallet Account Number'}
                        value={wallet_id}
                        onChangeText={this.handleChangeWalletNo}
                        keyboardType='numeric'
                    />

                    <TextInput
                        label={'Full Name'}
                        value={fullname}
                        onChangeText={this.handleChangeFullName}
                        autoCapitalize='words'
                    />
                </Screen>
            
                <Footer>
                    <Button disabled={!ready} t='Save Receiver' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

export default Scrn