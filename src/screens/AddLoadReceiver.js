import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, FlatList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

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
            let {fullname, contact_no, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            fullname = fullname.trim()
            contact_no = contact_no.trim()

            if(fullname == '' || contact_no == '') Say.some(_('8'))
            else {

                let payload = {
                    fullname,
                    contact_no
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

export default AddLoadReceiver