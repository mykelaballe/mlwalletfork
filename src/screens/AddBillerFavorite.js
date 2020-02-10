import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Spacer, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput, Prompt} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_, Consts, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class AddBillerFavorite extends React.Component {

    static navigationOptions = {
        title:'Add Biller'
    }

    state = {
        account_no:'',
        account_name:'',
        email:'',
        reminder:"Don't Remind Me",
        processing:false,
        showSuccessModal:false
    }

    handleChangeAccountNo = account_no => this.setState({account_no})

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeEmail = email => this.setState({email})

    handleSelectReminder = () => this.props.navigation.navigate('Reminders')

    handleSave = async () => {
        let {account_no, account_name, email, reminder, processing} = this.state

        if(processing) return false

        try {
            this.setState({processing:true})

            account_no = account_no.trim()
            account_name = account_name.trim()
            email = email.trim()

            if(account_no === '' || account_name === '') Say.some(_('8'))
            else {
                this.setState({showSuccessModal:true})
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err(_('18'))
        }
    }

    handleCloseModal = () => {
        this.setState({showSuccessModal:false},() => this.props.navigation.navigate('BillsCategory'))
    }

    render() {

        const {biller} = this.props.navigation.state.params
        const {account_no, account_name, email, reminder, processing, showSuccessModal} = this.state
        let ready = false

        if(account_no && account_name && reminder) ready = true

        return (
            <View style={style.container}>

                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message="You've successfully added a Biller to Favorites."
                    onDismiss={this.handleCloseModal}
                />

                <View>
                    <Text center b lg>{biller.name}</Text>

                    <Spacer />

                    <TextInput
                        label='Account Number'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                    />

                    <Spacer sm />

                    <TextInput
                        label='Account Name'
                        value={account_name}
                        onChangeText={this.handleChangeAccountName}
                        autoCapitalize='words'
                    />

                    <Spacer sm />

                    <TextInput
                        label='Email address (Optional)'
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        keyboardType='email-address'
                    />

                    <Spacer sm />

                    <TextInput
                        disabled
                        label='Remind Me Every'
                        value={reminder}
                        rightContent={
                            <TouchableOpacity onPress={this.handleSelectReminder}>
                                <Icon name='ios-arrow-forward' color={Colors.gray} size={Metrics.icon.sm} />
                            </TouchableOpacity>
                        }
                    />
                </View>
                
                <View style={style.footer}>
                    <Button disabled={!ready} t='Save' onPress={this.handleSave} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'space-between',
        padding:Metrics.lg
    },
    textarea: {
        height:130
    },
    footer: {
        //flex:1,
        //justifyContent:'flex-end'
    }
})

export default AddBillerFavorite