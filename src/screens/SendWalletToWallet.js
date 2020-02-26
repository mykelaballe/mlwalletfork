import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Screen, Footer, Headline, Text, Spacer, Button, TextInput, Icon} from '../components'
import {_, Consts} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Wallet to Wallet'
    }

    state = {
        wallet_account_number:'',
        receiver:'',
        amount:'',
        notes:'',
        charges:'',
        total:''
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.receiver && params.receiver.wallet_account_number !== prevState.wallet_account_number) {
            this.props.navigation.setParams({receiver:null})
            this.setState({
                wallet_account_number:params.receiver.wallet_account_number,
                fullname:params.receiver.fullname
            })
        }
    }

    handleChangeReceiverWalletID = receiver_wallet_id => this.setState({receiver_wallet_id})

    handleChangeAmount = amount => this.setState({amount})

    handleChangeNotes = notes => this.setState({notes})

    handleAddNewReceiver = () => this.props.navigation.navigate('SavedWalletReceivers')

    handleSendMoney = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            ...params,
            ...this.state,
            status:'success'
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {wallet_account_number, receiver, amount, notes, charges, total} = this.state
        let ready = false

        if(wallet_account_number && amount) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Send Money to an ML Wallet Account' />

                    <TouchableOpacity onPress={this.handleAddNewReceiver}>
                        <TextInput
                            disabled
                            label='Receiver'
                            value={wallet_account_number}
                            rightContent={<Icon name='user_plus' size={20} />}
                        />
                    </TouchableOpacity>

                    <Spacer />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />

                    <Spacer />

                    <TextInput
                        label='Notes'
                        placeholder='Type an optional message to your receiver here'
                        value={notes}
                        onChangeText={this.handleChangeNotes}
                        multiline
                    />
                </Screen>

                <Footer>
                    <Text mute>Charges</Text>
                    <Text md>PHP 25.00</Text>

                    <Spacer />

                    <Text mute>Total</Text>
                    <Text md>PHP 25.00</Text>

                    <Spacer />
                    
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSendMoney} />
                </Footer>
            </>
        )
    }
}

export default Scrn