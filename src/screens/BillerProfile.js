import React from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text, Row, Spacer, Button, TextInput, Switch} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts, Say} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Pay Bill'
    }

    state = {
        account_no:this.props.navigation.state.params.biller.bill_partner_accountid,
        account_name:this.props.navigation.state.params.biller.bill_partner_name,
        email:this.props.navigation.state.params.biller.email,
        reminder:"Don't Remind Me",
        add_to_favorites:this.props.navigation.state.params.biller.add_to_favorites,
        processing:false
    }

    handleChangeAccountNo = account_no => this.setState({account_no})

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeEmail = email => this.setState({email})

    handleFocusAccountName = () => this.refs.account_name.focus()

    handleFocusEmail = () => this.refs.email.focus()

    handleSelectReminder = () => this.props.navigation.navigate('Reminders')

    handleToggleAddToFavorites = async () => {
        const {walletno} = this.props.user
        const {id, partnersid} = this.props.navigation.state.params.biller
        const {account_no, account_name, email, add_to_favorites} = this.state

        try {
            if(add_to_favorites) {
                let res = await API.removeFavoriteBiller({
                    id,
                    walletno
                })
                if(!res.error) Say.ok("You've successfully removed a Biller from Favorites")
            }
            else {
                let res = await API.addFavoriteBiller({
                    walletno,
                    partnersid,
                    id,
                    account_no,
                    account_name,
                    email
                })
                if(!res.error) Say.ok("You've successfully added a Biller to Favorites")
            }
    
            this.setState({add_to_favorites:!add_to_favorites})
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    handleUpdate = async () => {
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
                let res = await API.updateFavoriteBiller({
                    id,
                    account_no,
                    account_name,
                    email
                })
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    handlePay = () => {
        const {navigate} = this.props.navigation
        const {biller} = this.props.navigation.state.params
        const {account_no, account_name, email, add_to_favorites} = this.state

        navigate('PayBill',{
            type:Consts.tcn.bpm.code,
            biller: {
                ...biller,
                account_no,
                account_name,
                email,
                add_to_favorites
            }
        })
    }

    render() {

        const {biller} = this.props.navigation.state.params
        const {account_no, account_name, email, reminder, add_to_favorites, processing} = this.state
        let ready = false

        if(account_no && account_name) ready = true

        return (
            <>
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
                            rightContent={
                                <Icon name='ios-arrow-forward' color={Colors.gray} size={Metrics.icon.sm} />
                            }
                        />
                    </TouchableOpacity>*/}

                    <Spacer sm />

                    <Row bw>
                        <Text mute md>{add_to_favorites ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
                        <Switch value={add_to_favorites} onValueChange={this.handleToggleAddToFavorites} />
                    </Row>
                </Screen>
                
                <Footer>
                    <Button disabled={!ready} mode='outlined' t='Update' onPress={this.handleUpdate} loading={processing} />
                    <Spacer sm />
                    <Button disabled={!ready} t='Pay' onPress={this.handlePay} />
                </Footer>
            </>
        )
    }
}

const mapStateToprops = state => ({
    user: state.user.data
})

export default connect(mapStateToprops)(Scrn)