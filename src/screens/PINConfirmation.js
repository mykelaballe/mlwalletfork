import React from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, Row, Button, Spacer, ButtonText, TextInputFlat} from '../components'
import {Metrics} from '../themes'
import {_, Consts, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Transaction PIN'
    }

    state = {
        digit1:'',
        digit2:'',
        digit3:'',
        digit4:'',
        digit5:'',
        digit6:'',
        processing:false,
        has_requested:false,
        reprocessing:false
    }

    handleChangeDigit1 = digit1 => {
        this.setState({digit1})
        if(digit1) this.refs.digit2.focus()
    }
    
    handleChangeDigit2 = digit2 => {
        this.setState({digit2})
        if(digit2) this.refs.digit3.focus()
    }

    handleChangeDigit3 = digit3 => {
        this.setState({digit3})
        if(digit3) this.refs.digit4.focus()
    }

    handleChangeDigit4 = digit4 => {
        this.setState({digit4})
        if(digit4) this.refs.digit5.focus()
    }

    handleChangeDigit5 = digit5 => {
        this.setState({digit5})
        if(digit5) this.refs.digit6.focus()
    }

    handleChangeDigit6 = digit6 => this.setState({digit6})

    handleFocusDigit2 = () => this.refs.digit2.focus()

    handleFocusDigit3 = () => this.refs.digit3.focus()

    handleFocusDigit4 = () => this.refs.digit4.focus()

    handleFocusDigit5 = () => this.refs.digit5.focus()

    handleFocusDigit6 = () => this.refs.digit6.focus()

    handleSubmit = async () => {
        const {replace, state, processing} = this.props.navigation

        if(processing) return false

        try {

            this.setState({processing:true})

            const {walletno, firstname, lastname} = this.props.user
            const {type, transaction} = this.props.navigation.state.params
            const {digit1, digit2, digit3, digit4, digit5, digit6} = this.state

            let pin = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`

            if(pin.length >= 6) {
                let pinRes = await API.validatePIN({
                    walletno,
                    pin
                })
    
                if(pinRes.error) {
                    Say.attemptLeft(pinRes.message)

                    if(this.props.isLoggedIn) this.props.logout()
                }
                else {
                    let res = {}
                    
                    if(type == Consts.tcn.stw.code) {
                        let stwRes = await API.sendWalletToWallet({
                            senderWalletNo:walletno,
                            senderName:`${firstname} ${lastname}`,
                            receivernoVal:transaction.receiver.receiverno,
                            receiverName:transaction.receiver.fullname,
                            receiverWalletNo:transaction.receiver.walletno,
                            receiverMobileNo:transaction.receiver.contact_no,
                            principal:transaction.amount,
                            charge:transaction.charges,
                            notes:transaction.notes
                        })

                        res = {
                            error:stwRes.respcode == 1 ? false : true,
                            message:stwRes.respmessage,
                            data:{
                                kptn:stwRes.kptnVal,
                                balance:stwRes.BalanceVal
                            }
                        }
                    }
                    else if(type == Consts.tcn.skp.code) {
                        res = await API.sendKP({
                            walletno,
                            receiverno:transaction.receiver.receiverno,
                            principal:transaction.amount
                        })
                    }
                    else if(type == Consts.tcn.stb.code) {
                        res = await API.sendBankTransfer({
                        
                        })
                    }
                    else if(type == Consts.tcn.wdc.code) {
                        res = await API.withdrawCash({
                            walletno,
                            amount:transaction.amount
                        })
                    }
                    else if(type == Consts.tcn.bpm.code) {
                        res = await API.payBill({
                        
                        })
                    }
                    else if(type == Consts.tcn.bul.code) {
                        let payload = {
                            walletNo:walletno,
                            amount:transaction.amount,
                            mobileNo:transaction.contact_no
                        }

                        if(transaction.promo) {
                            payload.promoCode = transaction.promo.promoCode,
                            payload.networkId = transaction.promo.networkID
                        }
                        res = await API.buyLoad(payload)
                    }

                    if(res.error) Say.warn(res.message)
                    else {
                        this.props.updateBalance(res.data.balance)
                        replace('TransactionReceipt',{
                            ...state.params,
                            ...res.data
                        })
                    }
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            processing:false,
            has_requested:true,
            reprocessing:false
        })
    }

    handleForgotPIN = () => {
        const {walletno, secquestion1, secquestion2, secquestion3} = this.props.user

        this.props.navigation.navigate('SecurityQuestion',{
            walletno,
            questions:[
                secquestion1,
                secquestion2,
                secquestion3
            ],
            steps:[
                'registered',
                'registered',
                'registered'
            ],
            func:async () => this.props.navigation.navigate('SendPIN')
        })
    }

    render() {

        const {digit1, digit2, digit3, digit4, digit5, digit6, processing} = this.state
        let ready = false

        if(`${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`.length >= 6) {
            ready = true
        }

        return (
            <>
                <Screen>
                    <Headline title='Enter your 6-digit PIN' />

                    <Row ar style={{paddingHorizontal:Metrics.lg}}>
                        <TextInputFlat
                            ref='digit1'
                            style={style.input}
                            value={digit1}
                            onChangeText={this.handleChangeDigit1}
                            onSubmitEditing={this.handleFocusDigit2}
                            keyboardType='numeric'
                            maxLength={1}
                            returnKeyType='next'
                            selectTextOnFocus
                            secureTextEntry
                        />

                        <TextInputFlat
                            ref='digit2'
                            style={style.input}
                            value={digit2}
                            onChangeText={this.handleChangeDigit2}
                            onSubmitEditing={this.handleFocusDigit3}
                            keyboardType='numeric'
                            maxLength={1}
                            returnKeyType='next'
                            selectTextOnFocus
                            secureTextEntry
                        />

                        <TextInputFlat
                            ref='digit3'
                            style={style.input}
                            value={digit3}
                            onChangeText={this.handleChangeDigit3}
                            onSubmitEditing={this.handleFocusDigit4}
                            keyboardType='numeric'
                            maxLength={1}
                            returnKeyType='next'
                            selectTextOnFocus
                            secureTextEntry
                        />

                        <TextInputFlat
                            ref='digit4'
                            style={style.input}
                            value={digit4}
                            onChangeText={this.handleChangeDigit4}
                            onSubmitEditing={this.handleFocusDigit5}
                            keyboardType='numeric'
                            maxLength={1}
                            returnKeyType='next'
                            selectTextOnFocus
                            secureTextEntry
                        />

                        <TextInputFlat
                            ref='digit5'
                            style={style.input}
                            value={digit5}
                            onChangeText={this.handleChangeDigit5}
                            onSubmitEditing={this.handleFocusDigit6}
                            keyboardType='numeric'
                            maxLength={1}
                            returnKeyType='next'
                            selectTextOnFocus
                            secureTextEntry
                        />

                        <TextInputFlat
                            ref='digit6'
                            style={style.input}
                            value={digit6}
                            onChangeText={this.handleChangeDigit6}
                            keyboardType='numeric'
                            maxLength={1}
                            selectTextOnFocus
                            secureTextEntry
                        />
                    </Row>
                </Screen>

                <Footer>
                    <View style={{alignItems:'flex-end'}}>
                        <ButtonText t='Forgot PIN?' onPress={this.handleForgotPIN} />
                    </View>

                    <Spacer />

                    <Button
                        disabled={!ready}
                        t='Validate'
                        onPress={this.handleSubmit}
                        loading={processing}
                    />
                </Footer>
            </>
        )
    }
}

const style = StyleSheet.create({
    input: {
        marginHorizontal:Metrics.xs,
        textAlign:'center',
        fontWeight:'bold'
    }
})

const mapStateToProps = state => ({
    user: state.user.data,
    isLoggedIn: state.auth.isLoggedIn
})

const mapDispatchToProps = dispatch => ({
    updateBalance: newBalance => dispatch(Creators.updateBalance(newBalance)),
    logout: () => dispatch(Creators.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)