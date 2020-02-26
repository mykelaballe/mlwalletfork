import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Screen, Footer, Headline, Text, Row, Spacer, Button, TextInput, Prompt, Switch} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Pay Bill'
    }

    state = {
        account_no:'123456789',
        account_name:'John Smith',
        email:'',
        reminder:"Don't Remind Me",
        add_to_favorites:false,
        processing:false,
        showSuccessModal:false,
        modalMessage:''
    }

    handleChangeAccountNo = account_no => this.setState({account_no})

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeEmail = email => this.setState({email})

    handleSelectReminder = () => this.props.navigation.navigate('Reminders')

    handleToggleAddToFavorites = () => {
        const {add_to_favorites} = this.state
        let modalMessage = ''

        if(add_to_favorites) modalMessage = "You've successfully removed a Biller from Favorites"
        else modalMessage = "You've successfully added a Biller to Favorites"

        this.setState({
            add_to_favorites:!add_to_favorites,
            modalMessage,
            showSuccessModal:true
        })
    }

    handleUpdate = async () => {
        let {account_no, account_name, email, reminder, processing} = this.state

        if(processing) return false

        try {
            this.setState({processing:true})

            account_no = account_no.trim()
            account_name = account_name.trim()
            email = email.trim()

            if(account_no === '' || account_name === '') Say.some(_('8'))
            else {
                this.setState({
                    showSuccessModal:true,
                    modalMessage:"You've successfully updated Biller details."
                })
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err(_('18'))
        }
    }

    handlePay = () => {
        const {navigate, state: {params: {biller}}} = this.props.navigation
        navigate('PayBill',{
            type:Consts.tcn.bpm.code,
            biller
        })
    }

    handleCloseModal = () => {
        this.setState({showSuccessModal:false})
    }

    render() {

        const {biller} = this.props.navigation.state.params
        const {account_no, account_name, email, reminder, add_to_favorites, processing, showSuccessModal, modalMessage} = this.state
        let ready = false

        if(account_no && account_name) ready = true

        return (
            <>
                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    message={modalMessage}
                    onDismiss={this.handleCloseModal}
                />

                <Screen>
                    <Headline title={biller.name} />

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

                    <TouchableOpacity onPress={this.handleSelectReminder}>
                        <TextInput
                            disabled
                            label='Remind Me Every'
                            value={reminder}
                            rightContent={
                                <Icon name='ios-arrow-forward' color={Colors.gray} size={Metrics.icon.sm} />
                            }
                        />
                    </TouchableOpacity>

                    <Spacer sm />

                    <Row bw>
                        <Text mute md>{add_to_favorites ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
                        <Switch value={add_to_favorites} onValueChange={this.handleToggleAddToFavorites} />
                    </Row>
                </Screen>
                
                <Footer>
                    <Button disabled={!ready} mode='outlined' t='Update' onPress={this.handleUpdate} />
                    <Spacer sm />
                    <Button t='Pay' onPress={this.handlePay} />
                </Footer>
            </>
        )
    }
}

export default Scrn