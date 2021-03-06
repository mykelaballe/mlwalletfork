import React from 'react'
import {StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, Button, TextInputFlat, Row} from '../components'
import {Metrics} from '../themes'
import {_, Say, Func, Consts} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    state = {
        digit1:'',
        digit2:'',
        digit3:'',
        digit4:'',
        digit5:'',
        digit6:'',
        processing:false
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

    handleChangeDigit6 = digit6 => {
        this.setState({digit6})

        if(!digit6) this.clearAll()
    }

    handleResendOTP = async () => this.setState({reprocessing:true})

    handleFocusDigit2 = () => this.refs.digit2.focus()

    handleFocusDigit3 = () => this.refs.digit3.focus()

    handleFocusDigit4 = () => this.refs.digit4.focus()

    handleFocusDigit5 = () => this.refs.digit5.focus()

    handleFocusDigit6 = () => this.refs.digit6.focus()

    handleSubmit = async () => {
        const {data, isVerificationOnly, func} = this.props.navigation.state.params
        const {digit1, digit2, digit3, digit4, digit5, digit6, processing} = this.state

        if(processing) return false

        try {
            this.setState({processing:true})

            let pin = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`

            if(!pin) Say.some(_('8'))
            else {

                let res = await API.validatePIN({
                    walletno:data.walletno,
                    pin
                })

                if(res.error) {
                    Say.attemptLeft(res.message)
                }
                else {
                    if(isVerificationOnly) await func()
                    else {
                        this.props.navigation.replace('CreatePIN',{
                            old_pin:pin,
                            data
                        })
                    }
                }
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {params = {}} = this.props.navigation.state
        const {digit1, digit2, digit3, digit4, digit5, digit6, processing} = this.state
        const pin = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}`
        let ready = false

        if(Func.isNumbersOnly(pin) && pin.length >= 6) ready = true

        return (
            <>
                <Screen>

                    {!params.isVerificationOnly &&
                    <Headline
                        title='You have reset your PIN'
                        subtext='Please enter the temporary PIN sent to your mobile number or email address'
                    />
                    }

                    {params.isVerificationOnly && <Headline title='Enter your 6-digit PIN' />}

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
                    <Button disabled={!ready} t={params.isVerificationOnly ? 'Validate' : _('62')} onPress={this.handleSubmit} loading={processing} />
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
    localPhotos: state.app.localPhotos
})

const mapDispatchToProps = dispatch => ({
    login:() => dispatch(Creators.login()),
    setUser:user => dispatch(Creators.setUser(user)),
    rememberLoginCredentials:credentials => dispatch(Creators.rememberLoginCredentials(credentials))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)