import React from 'react'
import {StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Row, Button, Spacer, ButtonText, TextInputFlat} from '../components'
import {Metrics} from '../themes'
import {_, Consts, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Verification'
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

    handleResendOTP = async () => {
        const {walletno} = this.props.user
        const {processing, reprocessing} = this.state

        if(processing || reprocessing) return false

        try {
            this.setState({reprocessing:true})

            let res = await API.requestOTP({
                walletno
            })

            if(res.error) Say.some(res.message)
            else {
                Say.some('OTP request sent')
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({reprocessing:false})
    }

    handleFocusDigit2 = () => this.refs.digit2.focus()

    handleFocusDigit3 = () => this.refs.digit3.focus()

    handleFocusDigit4 = () => this.refs.digit4.focus()

    handleFocusDigit5 = () => this.refs.digit5.focus()

    handleFocusDigit6 = () => this.refs.digit6.focus()

    handleRequest = () => this.setState({processing:true},this.submit)

    handleRequestAgain = () => this.setState({reprocessing:true},this.submit)

    submit = async () => {
        const {walletno, mobile_no} = this.props.user
        const {replace, state, processing, reprocessing} = this.props.navigation
        const {type, transaction} = this.props.navigation.state.params
        
        const {digit1, digit2, digit3, digit4, digit5, digit6} = this.state

        let otp = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`

        if(processing || reprocessing) return false

        try {

            if(otp.length >= 6) {
                let otpRes = await API.validateOTP({
                    _mobile_no:mobile_no,
                    _pin:otp
                })
    
                if(otpRes.error) Say.some(otpRes.message)
                else {
                    let res = {}
                    
                    if(type == Consts.tcn.stw.code) await API.sendWalletToWallet({

                    })
                    else if(type == Consts.tcn.skp.code) {
                        res = await API.sendKP({
                            walletno,
                            receiverno:transaction.receiver.receiverno,
                            principal:transaction.amount
                        })
                    }
                    else if(type == Consts.tcn.stb.code) await API.sendBankTransfer({

                    })
                    else if(type == Consts.tcn.wdc.code) await API.withdrawCash({
                        walletno,
                        amount:transaction.amount
                    })
                    else if(type == Consts.tcn.bpm.code) await API.payBill({

                    })
                    else if(type == Consts.tcn.bul.code) {
                        let payload = {
                            walletNo:walletno,
                            amount:transaction.amount,
                            mobileNo:transaction.contact_no
                        }

                        if(transaction.promo) {
                            payload.promoCode = transaction.promo.promoCode,
                            payload.networkId = transactin.promo.networkID
                        }
                        res = await API.buyLoad(payload)
                    }

                    if(res.error) Say.warn('Error')
                    else {
                        replace('TransactionReceipt',{...state.params})
                    }
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            processing:false,
            has_requested:true,
            reprocessing:false
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {digit1, digit2, digit3, digit4, digit5, digit6, processing, has_requested, reprocessing} = this.state
        let ready = false

        if(`${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`.length >= 6) {
            ready = true
        }

        return (
            <>
                <Screen>
                    <Headline
                        title='One Time Pin'
                        subtext='Enter the 6-digit code sent to your mobile number.'
                    />

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
                        />

                        <TextInputFlat
                            ref='digit6'
                            style={style.input}
                            value={digit6}
                            onChangeText={this.handleChangeDigit6}
                            keyboardType='numeric'
                            maxLength={1}
                            selectTextOnFocus
                        />
                    </Row>

                    <Spacer lg />

                    {/*has_requested &&
                    <ButtonText t='Resend Verification Code' onPress={this.handleRequestAgain} loading={reprocessing} />
                    */}
                </Screen>

                <Footer>
                    <Button
                        disabled={!ready}
                        t={Consts.tcn[type] ? Consts.tcn[type].otp : 'Submit'}
                        onPress={this.handleRequest}
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
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)