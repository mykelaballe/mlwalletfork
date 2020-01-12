import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, FlatList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class UpdateKPReceiver extends React.Component {

    static navigationOptions = {
        title:'Update Receiver'
    }

    state = {
        ...this.props.navigation.state.params.receiver,
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
    
                //await API.updateReceiver(payload)

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
                />

                <View style={style.footer}>
                    <Button t='Update Receiver' onPress={this.handleSubmit} />
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

export default UpdateKPReceiver