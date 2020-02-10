import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, FlatList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class AddKPReceiver extends React.Component {

    static navigationOptions = {
        title:'Add Bank'
    }

    state = {
        name:'',
        account_name:'',
        account_no:'',
        processing:false
    }

    handleChangeName = name => this.setState({name})

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAccountNo = account_no => this.setState({account_no})

    handleSubmit = async () => {
        try {
            let {name, account_name, account_no, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            name = name.trim()
            account_name = account_name.trim()
            account_no = account_no.trim()

            if(name == '' || account_name == '' || account_no == '') Say.some(_('8'))
            else {

                let payload = {
                    name,
                    account_name,
                    account_no
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

        const {name, account_name, account_no, processing} = this.state
        let ready = false

        if(name && account_name && account_no) ready = true

        return (
            <View style={style.container}>
                <Text center>Please ensure that all of the information inputted is correct.</Text>

                <Spacer />

                <TextInput
                    label='Bank Name'
                    value={name}
                    onChangeText={this.handleChangeName}
                    autoCapitalize='words'
                />

                <TextInput
                    label='Account Name'
                    value={account_name}
                    onChangeText={this.handleChangeAccountName}
                    autoCapitalize='words'
                />

                <TextInput
                    label='Account No.'
                    value={account_no}
                    onChangeText={this.handleChangeAccountNo}
                    keyboardType='numeric'
                />

                <View style={style.footer}>
                    <Button disabled={!ready} t='Save Bank' onPress={this.handleSubmit} loading={processing} />
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