import React from 'react'
import {StyleSheet, View} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, Row, Button, Spacer, ButtonText, TextInputFlat} from '../components'
import {Metrics} from '../themes'
import {_, Consts, Say, Func} from '../utils'
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
        reprocessing:false,
        done:false
    }

    handleChangeDigit1 = digit1 => {
        this.setState({digit1})
        if(digit1) this.refs.digit2.focus()

        if(!digit1) this.clearAll()
    }
    
    handleChangeDigit2 = digit2 => {
        this.setState({digit2})
        if(digit2) this.refs.digit3.focus()

        if(!digit2) this.clearAll()
    }

    handleChangeDigit3 = digit3 => {
        this.setState({digit3})
        if(digit3) this.refs.digit4.focus()

        if(!digit3) this.clearAll()
    }

    handleChangeDigit4 = digit4 => {
        this.setState({digit4})
        if(digit4) this.refs.digit5.focus()

        if(!digit4) this.clearAll()
    }

    handleChangeDigit5 = digit5 => {
        this.setState({digit5})
        if(digit5) this.refs.digit6.focus()

        if(!digit5) this.clearAll()
    }

    handleChangeDigit6 = digit6 => {
        this.setState({digit6})

        if(!digit6) this.clearAll()
    }

    clearAll = () => {
        this.setState({
            digit1:'',
            digit2:'',
            digit3:'',
            digit4:'',
            digit5:'',
            digit6:''
        })
        this.refs.digit1.focus()
    }

    handleFocusDigit2 = () => this.refs.digit2.focus()
    handleFocusDigit3 = () => this.refs.digit3.focus()
    handleFocusDigit4 = () => this.refs.digit4.focus()
    handleFocusDigit5 = () => this.refs.digit5.focus()
    handleFocusDigit6 = () => this.refs.digit6.focus()

    handleSubmit = async () => {
        const {replace, state} = this.props.navigation
        const {type, transaction} = this.props.navigation.state.params
        const {processing, done} = this.state

        if(processing || done) return false

        try {

            this.props.startTransaction()

            this.setState({processing:true})

            let latitude = Consts.defaultLatitude, longitude = Consts.defaultLongitude

            if(Func.isCheckLocation(type)) {
                const locationRes = await Func.getLocation()
                if(locationRes.error) {
                    this.props.endTransaction()
                    this.setState({processing:false})
                    return false
                }
                else {
                    latitude = locationRes.data.latitude
                    longitude = locationRes.data.longitude
                }
            }

            const {walletno, fname, mname, lname} = this.props.user
            const {digit1, digit2, digit3, digit4, digit5, digit6} = this.state

            let pin = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`

            if(pin.length >= 6) {
                let pinRes = await API.validatePIN({
                    walletno,
                    pin
                })
    
                if(pinRes.error) {
                    Say.attemptLeft(pinRes.message,{
                        frontMsg:Consts.error.wrongInfo
                    })

                    if(pinRes.message == Consts.error.blk1d) this.props.logout()
                }
                else {
                    let res = {}
                    
                    if(type == Consts.tcn.stw.code) {
                        res = await API.sendWalletToWallet({
                            walletno,
                            receiverno:transaction.receiver.receiverno,
                            receiverWalletNo:transaction.receiver.walletno,
                            principal:transaction.amount,
                            charge:transaction.charges,
                            notes:transaction.notes,
                            latitude,
                            longitude
                        })
                    }
                    else if(type == Consts.tcn.skp.code) {
                        res = await API.sendKP({
                            walletno,
                            receiverno:transaction.receiver.receiverno,
                            principal:transaction.amount,
                            mlat:latitude,
                            mlong:longitude
                        })
                    }
                    else if(type == Consts.tcn.stb.code) {
                        res = await API.payBill({
                            walletno,
                            partnersId:transaction.bank.old_partnersid,
                            partnerName:transaction.bank.bankname,
                            accountNo:transaction.account_no,
                            accountName:transaction.account_name,
                            amountpaid:transaction.amount,
                            mobileno:transaction.mobileno,
                            fname:transaction.cAccountFname,
                            lname:transaction.cAccountLname,
                            mname:transaction.cAccountMname,
                            isBusiness:transaction.isBusiness,
                            isRTA:1,
                            latitude,
                            longitude
                        })
                    }
                    else if(type == Consts.tcn.wdc.code) {
                        res = await API.withdrawCash({
                            walletno,
                            amount:transaction.amount,
                            latitude,
                            longitude
                        })
                    }
                    else if(type == Consts.tcn.bpm.code) {
                        res = await API.payBill({
                            walletno,
                            partnersId:transaction.biller.old_partnersid,
                            partnerName:transaction.biller.bankname,
                            accountNo:transaction.account_no,
                            accountName:transaction.account_name,
                            email:transaction.email,
                            mobileno:transaction.mobileno,
                            amountpaid:transaction.amount,
                            fname:transaction.cAccountFname,
                            lname:transaction.cAccountLname,
                            isBusiness:transaction.isBusiness,
                            isRTA:0,
                            latitude,
                            longitude
                        })
                    }
                    else if(type == Consts.tcn.bul.code) {
                        let payload = {
                            walletNo:walletno,
                            amount:transaction.amount,
                            receiverno:transaction.receiverno,
                            receiverFullname:transaction.name,
                            mobileNo:transaction.contact_no,
                            networkId:transaction.network.id,
                            latitude,
                            longitude
                        }

                        if(transaction.promo) {
                            payload.promoCode = transaction.promo.promoCode
                        }
                        res = await API.buyLoad(payload)
                    }

                    if(res.error) {
                        if(!res.message) throw new error()
                        else Say.warn(res.message)
                    }
                    else {

                        this.props.updateBalance(res.data.balance)

                        if(type == Consts.tcn.stw.code) this.props.refreshWalletRecent(true)
                        else if(type == Consts.tcn.skp.code) this.props.refreshKPRecent(true)
                        else if(type == Consts.tcn.stb.code) this.props.refreshBankRecent(true)
                        else if(type == Consts.tcn.bpm.code) this.props.refreshBillersRecent(true)
                        else if(type == Consts.tcn.bul.code) this.props.refreshELoadRecent(true)

                        let transRes = await API.getTransaction(res.data.kptn)

                        this.setState({done:true})

                        replace('TransactionReceipt',{
                            ...res.data,
                            ...state.params,
                            transdate:transRes.data.transdate
                        })
                    }
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.props.endTransaction()

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
        const pin = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`
        let ready = false

        if(Func.isNumbersOnly(pin) && pin.length >= 6) ready = true

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
                            contextMenuHidden
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
                            contextMenuHidden
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
                            contextMenuHidden
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
                            contextMenuHidden
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
                            contextMenuHidden
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
                            contextMenuHidden
                        />
                    </Row>
                </Screen>

                <Footer>
                    <View style={{alignItems:'flex-end'}}>
                        <ButtonText disabled={processing} t='Forgot PIN?' onPress={this.handleForgotPIN} />
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
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    startTransaction: () => dispatch(Creators.startTransaction()),
    endTransaction: () => dispatch(Creators.endTransaction()),
    updateBalance: newBalance => dispatch(Creators.updateBalance(newBalance)),
    logout: () => dispatch(Creators.logout()),
    refreshWalletRecent:refresh => dispatch(Creators.refreshWalletRecent(refresh)),
    refreshKPRecent:refresh => dispatch(Creators.refreshKPRecent(refresh)),
    refreshBankRecent:refresh => dispatch(Creators.refreshBankRecent(refresh)),
    refreshELoadRecent:refresh => dispatch(Creators.refreshELoadRecent(refresh)),
    refreshBillersRecent:refresh => dispatch(Creators.refreshBillersRecent(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)