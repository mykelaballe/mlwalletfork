import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Text, Row, Spacer, Button, ButtonText, TextInput, Icon, View, HeaderRight, UsePointsCheckbox} from '../components'
import {_, Consts, Func, Say} from '../utils'
import {Colors} from '../themes'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn.stw.short_desc,
        headerRight:(
            <HeaderRight>
                <ButtonText color={Colors.light} t='Rates' onPress={() => navigation.navigate('WalletRates')} />
            </HeaderRight>
        )
    })

    state = {
        walletno:this.props.navigation.state.params.receiver.walletno,
        receiver:this.props.navigation.state.params.receiver,
        amount:'',
        notes:'',
        charges:'25',
        total:'',
        points:'0',
        processing:false
    }

    handleChangeReceiverWalletID = receiver_wallet_id => this.setState({receiver_wallet_id})

    handleChangeAmount = amount => {
        if(Func.isAmount2Decimal(amount)) {
            this.setState({
                amount,
                total:Func.compute(this.state.charges, amount)
            })
        }
    }

    handleChangeNotes = notes => this.setState({notes})

    handleFocusNotes = () => this.refs.notes.focus()

    handleAddNewReceiver = () => this.props.navigation.navigate('SavedWalletReceivers')

    handleChangePoints = points => this.setState({points})

    handleSendMoney = async () => {
        const {amount, total, processing} = this.state
        const {params} = this.props.navigation.state

        if(processing) return false

        try {
            this.setState({processing:true})

            if(Func.formatToCurrency(amount) <= 0) Say.warn(_('89'))
            else {
                let res = await API.sendWalletToWalletValidate({
                    walletno:this.props.user.walletno,
                    amount:total
                })
    
                if(!res.error) {
                    this.props.navigation.navigate('TransactionReview',{
                        ...params,
                        type:Consts.tcn.stw.code,
                        transaction: {
                            ...this.state,
                            sender:Func.formatName(this.props.user)
                        },
                        status:'success'
                    })
                }
                else Say.warn(res.message)
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {walletno, amount, notes, charges, total, processing} = this.state
        let ready = false

        if(walletno && amount) ready = true

        return (
            <>
                <Screen>

                    <TextInput
                        disabled
                        label='Receiver'
                        value={Func.formatWalletNo(walletno)}
                        rightContent={<Icon name='user_plus' size={20} />}
                    />

                    <TextInput
                        editable={!processing}
                        ref='amount'
                        label={`Amount (${Consts.currency.PH})`}
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleFocusNotes}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    <TextInput
                        editable={!processing}
                        ref='notes'
                        label='Notes'
                        placeholder='Type an optional message to your receiver here'
                        value={notes}
                        onChangeText={this.handleChangeNotes}
                        multiline
                    />
                </Screen>

                <Footer>
                    <Row bw>
                        <View>
                            <Text mute>Fixed Charge</Text>
                            <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(charges)}</Text>
                        </View>

                        {/*<UsePointsCheckbox onChange={this.handleChangePoints} />*/}
                    </Row>

                    <Spacer />

                    <Text mute>Total</Text>
                    <Text md>{Consts.currency.PH} {Func.formatToRealCurrency(total)}</Text>

                    <Spacer />
                    
                    <Button disabled={!ready} t={Consts.tcn.stw.submit_text} onPress={this.handleSendMoney} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)