import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, TextInput, Button} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add New Receiver'
    }

    state = {
        mobileno:'',
        fullname:'',
        processing:false
    }

    handleChangeFullName = fullname => this.setState({fullname})

    handleChangeContactNo = mobileno => this.setState({mobileno})

    handleFocusFullName = () => this.refs.fullname.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {fullname, mobileno, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            fullname = fullname.trim()
            mobileno = mobileno.trim()

            if(!fullname || !mobileno) Say.some(_('8'))
            else {

                let payload = {
                    _walletno:walletno,
                    _fullname:fullname,
                    _mobileno:mobileno,
                    _isfavorite:false
                }
    
                let res = await API.addELoadReceiver(payload)

                if(!res.error) {
                    /*this.props.addReceiver({
                        ...res,
                        fullname,
                        mobileno
                    })*/
                    this.props.refreshAll(true)
                    this.props.navigation.pop()
                    Say.ok('New ELoad receiver successfully added')
                }
                else {
                    Say.warn(res.message)
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {mobileno, fullname, processing} = this.state
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
                    <Button disabled={!ready} t='Save Receiver' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    //addReceiver:newReceiver => dispatch(Creators.addELoadReceiver(newReceiver)),
    refreshAll:refresh => dispatch(Creators.refreshELoadAllReceivers(refresh)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)