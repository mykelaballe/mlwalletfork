import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Text, Button, Spacer, Avatar, Row} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        title:_('80')
    }

    state = {
        avatar:null,
        walletno:'',
        firstname:'',
        lastname:'',
        mobile_no:'',
        processing:false,
        found:false
    }

    handleChangeWalletNo = walletno => this.setState({walletno})

    handleChangeFirstName = firstname => this.setState({firstname})

    handleChangeLastName = lastname => this.setState({lastname})

    handleChangeMobileNo = mobile_no => this.setState({mobile_no})

    handleFocusFirstName = () => this.refs.firstname.focus()

    handleFocusLastName = () => this.refs.lastname.focus()

    handleFocusMobileNo = () => this.refs.mobile_no.focus()

    handleSearch = async () => {
        try {
            let {walletno, firstname, lastname, mobile_no, processing, found} = this.state

            if(processing) return false

            this.setState({processing:true})

            if(found) {
                this.addReceiver()
                return false
            }

            walletno = walletno.trim()
            firstname = firstname.trim()
            lastname = lastname.trim()
            mobile_no = mobile_no.trim()

            if(walletno && ((firstname && lastname) || mobile_no)) {
                let payload = {
                    walletno,
                    firstname,
                    lastname,
                    mobile_no
                }
    
                let res = await API.searchWalletReceiver(payload)
                
                if(res.respcode === 1) {
                    Say.some('Search successful')

                    this.setState({
                        found:true,
                        walletno:res.walletno,
                        firstname:res.firstName,
                        lastname:res.lastName,
                        mobile_no:res.mobileno
                    })
                }
                else {
                    Say.warn(res.respmessage)
                }
            }
            else {
                Say.some(_('8'))
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    addReceiver = async () => {
        try {
            const {walletno, firstname, lastname, mobile_no} = this.state
            let res = await API.addWalletReceiver({
                senderwalletno:this.props.user.walletno,
                receiverwalletno:walletno
            })
            if(!res.error) {
                this.props.addReceiver({
                    receiverno:res.data,
                    walletno,
                    fullname:`${firstname} ${lastname}`
                })
                Say.ok('Receiver added successfully')
                this.props.navigation.pop()
            }
            else {
                Say.warn(res.message)
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {walletno, firstname, lastname, mobile_no, processing, found} = this.state
        let ready = false

        if(walletno && ((firstname && lastname) || mobile_no)) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that the ML Wallet account number entered is correct' />

                    <View style={{alignItems:'center'}}>
                        <Avatar source={null} size={Metrics.image.lg} />

                        <Spacer />

                        <TextInput
                            label='Wallet Account Number'
                            value={walletno}
                            onChangeText={this.handleChangeWalletNo}
                            onSubmitEditing={this.handleFocusFirstName}
                            keyboardType='numeric'
                            returnKeyType='next'
                        />

                        <Spacer />

                        <TextInput
                            ref='firstname'
                            label='First Name'
                            value={firstname}
                            onChangeText={this.handleChangeFirstName}
                            onSubmitEditing={this.handleFocusLastName}
                            autoCapitalize='words'
                            returnKeyType='next'
                        />

                        <Spacer h xs />

                        <TextInput
                            ref='lastname'
                            label='Last Name'
                            value={lastname}
                            onChangeText={this.handleChangeLastName}
                            onSubmitEditing={this.handleFocusMobileNo}
                            autoCapitalize='words'
                            returnKeyType='next'
                        />

                        <Text center>or</Text>

                        <TextInput
                            ref='mobile_no'
                            label='Registered mobile number'
                            value={mobile_no}
                            onChangeText={this.handleChangeMobileNo}
                            keyboardType='numeric'
                        />
                    </View>
                </Screen>

                <Footer>
                    <Button disabled={!ready} t={found ? 'Save Receiver' : 'Search Receiver'} onPress={this.handleSearch} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    addReceiver:newReceiver => dispatch(Creators.addWalletReceiver(newReceiver))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)