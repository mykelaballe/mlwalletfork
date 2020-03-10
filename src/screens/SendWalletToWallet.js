import React from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text, Spacer, Button, ButtonText, TextInput, Icon, View, HeaderRight} from '../components'
import {_, Consts, Func, Say} from '../utils'
import {Colors} from '../themes'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:'Wallet to Wallet',
        headerRight:(
            <HeaderRight>
                <ButtonText color={Colors.light} t='Rates' onPress={() => navigation.navigate('Rates')} />
            </HeaderRight>
        )
    })

    state = {
        walletno:'',
        receiver:'',
        amount:'',
        notes:'',
        charges:'25',
        total:'',
        processing:false
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.receiver && params.receiver.walletno !== prevState.walletno) {
            this.props.navigation.setParams({receiver:null})
            this.setState({
                walletno:params.receiver.walletno,
                receiver:params.receiver.fullname
            })
        }
    }

    handleChangeReceiverWalletID = receiver_wallet_id => this.setState({receiver_wallet_id})

    handleChangeAmount = amount => {
        this.setState({
            amount,
            total:Func.compute(this.state.charges, amount)
        })
    }

    handleChangeNotes = notes => this.setState({notes})

    handleFocusNotes = () => this.refs.notes.focus()

    handleAddNewReceiver = () => this.props.navigation.navigate('SavedWalletReceivers')

    handleSendMoney = async () => {
        const {amount, total, processing} = this.state
        const {params} = this.props.navigation.state

        if(processing) return false

        try {
            this.setState({processing:true})

            let res = await API.sendWalletToWalletValidate({
                walletno:this.props.user.walletno,
                amount:total
            })

            if(!res.error) {
                this.props.navigation.navigate('TransactionReview',{
                    ...params,
                    transaction: {
                        ...this.state
                    },
                    status:'success'
                })
            }
            else {
                Say.some(res.message)
            }
        }
        catch(err) {
            alert(err)
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {walletno, receiver, amount, notes, charges, total, processing} = this.state
        let ready = false

        if(walletno && amount) ready = true

        return (
            <>
                <Screen>
                    {/*<Headline subtext='Send Money to an ML Wallet Account' />*/}
                    <View style={{alignItems:'flex-end'}}>
                        <ButtonText color={Colors.brand} icon='plus' t='Add Receiver' onPress={this.handleAddNewReceiver} />
                    </View>

                    {/*<TouchableOpacity onPress={this.handleAddNewReceiver}>*/}
                        <TextInput
                            disabled
                            label='Receiver'
                            value={walletno}
                            rightContent={<Icon name='user_plus' size={20} />}
                        />
                    {/*</TouchableOpacity>*/}

                    <TextInput
                        ref='amount'
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleFocusNotes}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='notes'
                        label='Notes'
                        placeholder='Type an optional message to your receiver here'
                        value={notes}
                        onChangeText={this.handleChangeNotes}
                        multiline
                    />
                </Screen>

                <Footer>
                    <Text mute>Charges</Text>
                    <Text md>PHP {Func.formatToCurrency(charges)}</Text>

                    <Spacer />

                    <Text mute>Total</Text>
                    <Text md>PHP {Func.formatToCurrency(total)}</Text>

                    <Spacer />
                    
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSendMoney} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)