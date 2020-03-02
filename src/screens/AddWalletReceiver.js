import React from 'react'
import {View} from 'react-native'
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
                
                if(!res.error) {
                    found = true
                }
            }
            else {
                Say.some(_('8'))
            }

            this.setState({
                processing:false,
                found
            })
        }
        catch(err) {
            this.setState({processing:false})
            Say.err(_('500'))
        }
    }

    addReceiver = async () => {
        try {
            const {walletno} = this.state
            let res = await API.addWalletReceiver({walletno})
            if(!res.error) this.props.navigation.pop()
        }
        catch(err) {
            this.setState({processing:false})
            Say.err(_('500'))
        }
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

export default Scrn