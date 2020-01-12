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
        name:'',
        contact:'',
        processing:false
    }

    handleChangeName = name => this.setState({name})

    handleChangeContact = contact => this.setState({contact})

    handleSubmit = async () => {
        try {
            let {name, contact, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            name = name.trim()
            contact = contact.trim()

            if(name == '' || contact == '') Say.some(_('8'))
            else {

                let payload = {
                    name,
                    contact
                }
    
                //await API.addNewReceiver(payload)

                Say.ok('success')
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

        const {name, contact, processing} = this.state

        return (
            <View style={style.container}>
                <Text center>Please ensure that the name of the receiver is the same as it appears in their valid ID.</Text>

                <TextInput
                    label='Full Name'
                    placeholder='Enter Full Name'
                    value={name}
                    onChangeText={this.handleChangeName}
                />

                <TextInput
                    label='Contact No.'
                    placeholder='Enter Contact No.'
                    value={contact}
                    onChangeText={this.handleChangeContact}
                    keyboardType='numeric'
                />

                <View style={style.footer}>
                    <Button t='Save Receiver' onPress={this.handleSubmit} />
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