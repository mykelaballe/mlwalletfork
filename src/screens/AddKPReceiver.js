import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, FlatList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class AddKPReceiver extends React.Component {

    static navigationOptions = {
        title:'Add New Receiver'
    }

    state = {
        fullname:'',
        contact_no:'',
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
                <Text center>Please ensure that the name of the receiver is the same as it appears in their valid ID.</Text>

                <Spacer />

                <TextInput
                    label='Full Legal Name'
                    value={fullname}
                    onChangeText={this.handleChangeFullName}
                    autoCapitalize='words'
                />

                <TextInput
                    label='Contact No.'
                    value={contact_no}
                    onChangeText={this.handleChangeContactNo}
                    keyboardType='numeric'
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

export default AddKPReceiver