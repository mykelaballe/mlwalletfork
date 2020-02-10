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
        fullname:this.props.navigation.state.params.receiver.fullname,
        contact_no:this.props.navigation.state.params.receiver.contact_no,
        processing:false
    }

    handleChangeFullName = fullname => this.setState({fullname})

    handleChangeContactNo = contact_no => this.setState({contact_no})

    handleSubmit = async () => {
        let {fullname, contact_no, processing} = this.state

        if(processing) return false

        try {
            fullname = fullname.trim()
            contact_no = contact_no.trim()

            if(fullname == '' || contact_no == '') Say.some(_('8'))
            else {
                Say.some('Receiver updated')
            }
        }
        catch(err) {
            Say.err(_('18'))
        }
    }

    render() {

        const {fullname, contact_no, processing} = this.state
        let ready = false

        if(fullname && contact_no) ready = true

        return (
            <>
                <Screen>

                    <TextInput
                        label={'Full Legal Name'}
                        value={fullname}
                        onChangeText={this.handleChangeFullName}
                        autoCapitalize='words'
                    />

                    <TextInput
                        label={'Contact No.'}
                        value={contact_no}
                        onChangeText={this.handleChangeContactNo}
                        keyboardType='numeric'
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