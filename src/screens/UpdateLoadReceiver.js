import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, TextInput, Button} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Receiver'
    }

    state = {
        ...this.props.navigation.state.params.receiver,
        processing:false
    }

    handleChangeFullName = fullname => this.setState({fullname})

    handleChangeContactNo = mobileno => this.setState({mobileno})

    handleFocusFullName = () => this.refs.fullname.focus()

    handleSubmit = async () => {
        try {
            const {index, receiver} = this.props.navigation.state.params
            let {fullname, mobileno, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            fullname = fullname.trim()
            mobileno = mobileno.trim()

            if(!fullname || !mobileno) Say.some(_('8'))
            else {

                let payload = {
                    receiverno:receiver.receiverno,
                    fullname,
                    mobileno
                }
    
                let res = await API.updateELoadReceiver(payload)

                if(!res.error) {
                    this.props.updateReceiver(index, {
                        ...receiver,
                        fullname,
                        mobileno
                    })
                    Say.some('Receiver updated!')
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {fullname, mobileno, processing} = this.state
        let ready = false

        if(fullname && mobileno) ready = true

        return (
            <>
                <Screen>
                    <TextInput
                        ref='contact_no'
                        label='Contact No.'
                        value={mobileno}
                        onChangeText={this.handleChangeContactNo}
                        onSubmitEditing={this.handleFocusFullName}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='fullname'
                        label='Full Name'
                        value={fullname}
                        onChangeText={this.handleChangeFullName}
                        autoCapitalize='words'
                    />
                </Screen>

                <Footer>
                    <Button disabled={!ready} t={_('83')} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateReceiver:(receiverIndex, newProp) => dispatch(Creators.updateLoadReceiver(receiverIndex, newProp))
})

export default connect(null, mapDispatchToProps)(Scrn)