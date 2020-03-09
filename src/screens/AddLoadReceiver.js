import React from 'react'
import {View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {TextInput, Button} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class AddLoadReceiver extends React.Component {

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

                alert(walletno + '\n' + fullname + '\n' + contact_no)

                let payload = {
                    _walletno:walletno,
                    _fullname:fullname,
                    _mobileno:contact_no
                }
    
                let res = await API.addELoadReceiver(payload)

                alert(res.message)

                this.props.navigation.pop()
            }
        }
        catch(err) {
            alert(err)
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
                    label='Contact No.'
                    value={contact_no}
                    onChangeText={this.handleChangeContactNo}
                    keyboardType='numeric'
                />

                <TextInput
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

export default connect(mapStateToProps)(AddLoadReceiver)