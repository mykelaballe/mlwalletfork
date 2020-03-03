import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Screen, Footer, Headline, Button, TextInput, Prompt} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

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

    handleFocusAccountName = () => this.refs.account_name.focus()

    handleFocusEmail = () => this.refs.email.focus()

    handleSelectReminder = () => this.props.navigation.navigate('Reminders')

    handleSubmit = async () => {
        const {id} = this.props.navigation.state.params.biller
        let {account_no, account_name, email, reminder, processing} = this.state

        if(processing) return false

        try {
            this.setState({processing:true})

            account_no = account_no.trim()
            account_name = account_name.trim()
            email = email.trim()

            if(!account_no || !account_name) Say.some(_('8'))
            else {
                let payload = {
                    id
                }

                let res = await API.addFavoriteBiller(payload)
                
                if(!res.error) {
                    this.setState({showSuccessModal:true})
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
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
            <>

                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message="You've successfully added a Biller to Favorites."
                    onDismiss={this.handleCloseModal}
                />

                <Screen>
                    <Headline title={biller.name} />

                    <TextInput
                        ref='account_no'
                        label='Account Number'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNo}
                        onSubmitEditing={this.handleFocusAccountName}
                        autoCapitalize='none'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='account_name'
                        label='Account Name'
                        value={account_name}
                        onChangeText={this.handleChangeAccountName}
                        onSubmitEditing={this.handleFocusEmail}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='email'
                        label='Email address (Optional)'
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        keyboardType='email-address'
                        autoCapitalize='none'
                    />

                    {/*<TouchableOpacity onPress={this.handleSelectReminder}>
                        <TextInput
                            disabled
                            label='Remind Me Every'
                            value={reminder}
                            rightContent={<Icon name='ios-arrow-forward' color={Colors.gray} size={Metrics.icon.sm} />}
                        />
                    </TouchableOpacity>*/}
                </Screen>
                
                <Footer>
                    <Button disabled={!ready} t='Save' onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

export default Scrn