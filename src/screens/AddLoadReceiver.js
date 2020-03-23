import React from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {TextInput, Button} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add New Receiver'
    }

    state = {
        contact_no:'',
        fullname:'',
        processing:false
    }

    handleChangeFullName = fullname => this.setState({fullname})

    handleChangeContactNo = contact_no => this.setState({contact_no})

    handleFocusFullName = () => this.refs.fullname.focus()

    handleSubmit = async () => {
        try {
            const {walletno} = this.props.user
            let {fullname, contact_no, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            fullname = fullname.trim()
            contact_no = contact_no.trim()

            if(!fullname || !contact_no) Say.some(_('8'))
            else {

                let payload = {
                    _walletno:walletno,
                    _fullname:fullname,
                    _mobileno:contact_no,
                    _isfavorite:false
                }
    
                let res = await API.addELoadReceiver(payload)

                if(!res.error) {
                    this.props.addReceiver({
                        ...res,
                        fullname,
                        mobileno:contact_no
                    })
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

        const {contact_no, fullname, processing} = this.state
        let ready = false

        if(fullname && contact_no) ready = true

        return (
            <View style={style.container}>
                <TextInput
                    ref='contact_no'
                    label='Contact No.'
                    value={contact_no}
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

                <View style={style.footer}>
                    <Button disabled={!ready} t='Save Receiver' onPress={this.handleSubmit} loading={processing} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    addReceiver:newReceiver => dispatch(Creators.addELoadReceiver(newReceiver))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)