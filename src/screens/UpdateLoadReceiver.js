import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, TextInput, Button} from '../components'
import {_, Say, Func, Consts} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Edit Receiver'
    }

    state = {
        ...this.props.navigation.state.params.receiver,
        mobileno:`${Consts.mobilePrefixPH} ${this.props.navigation.state.params.receiver.mobileno.slice(1, this.props.navigation.state.params.receiver.mobileno.length)}`,
        processing:false
    }

    handleChangeFullName = fullname => this.setState({fullname})
    handleChangeContactNo = mobileno => this.setState({mobileno})

    handleFocusFullName = () => this.refs.fullname.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            const {receiver} = this.props.navigation.state.params
            let {fullname, mobileno, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            fullname = fullname.trim()
            mobileno = mobileno.trim()

            mobileno = Func.formatToPHMobileNumber(mobileno)

            if(!fullname || !mobileno) Say.some(_('8'))
            else if(!Func.isLettersOnly(fullname)) Say.warn(Consts.error.onlyLettersInName)
            else if(!Func.isPHMobileNumber(mobileno)) Say.warn(Consts.error.mobile)
            else {

                let payload = {
                    _walletno:walletno,
                    _receiverno:receiver.receiverno,
                    _fullname:fullname,
                    _mobileno:mobileno
                }
    
                let res = await API.updateELoadReceiver(payload)

                if(!res.error) {
                    this.props.refreshAll(true)
                    this.props.refreshFavorites(true)
                    this.props.refreshRecent(true)
                    this.props.updateReceiver({
                        ...receiver,
                        fullname,
                        mobileno
                    })
                    Say.ok('Receiver updated')
                    this.props.navigation.pop()
                }
                else Say.warn(res.message)
            }
        }
        catch(err) {
            Say.err(err)
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
                        mask={Consts.mobileMaskPH}
                    />

                    <TextInput
                        ref='fullname'
                        label='Name/Nickname'
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

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updateReceiver:newProp => dispatch(Creators.updateELoadReceiver(newProp)),
    refreshAll:refresh => dispatch(Creators.refreshELoadAllReceivers(refresh)),
    refreshFavorites:refresh => dispatch(Creators.refreshELoadFavorites(refresh)),
    refreshRecent:refresh => dispatch(Creators.refreshELoadRecent(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)