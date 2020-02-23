import React from 'react'
import {View} from 'react-native'
import {Screen, Footer, Headline, TextInput, Text, Button, Spacer, Avatar, Row} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = {
        title:_('80')
    }

    state = {
        avatar:null,
        wallet_no:'',
        firstname:'',
        lastname:'',
        mobile_no:'',
        processing:false,
        found:false
    }

    handleChangeWalletNo = wallet_no => this.setState({wallet_no})

    handleChangeFirstName = firstname => this.setState({firstname})

    handleChangeLastName = lastname => this.setState({lastname})

    handleChangeMobileNo = mobile_no => this.setState({mobile_no})

    handleFocusFirstName = () => this.refs.firstname.focus()

    handleFocusLastName = () => this.refs.lastname.focus()

    handleFocusMobileNo = () => this.refs.mobile_no.focus()

    handleSearch = async () => {
        try {
            let {wallet_no, firstname, lastname, mobile_no, processing, found} = this.state

            if(processing) return false

            this.setState({processing:true})

            if(found) this.addReceiver()

            wallet_no = wallet_no.trim()
            firstname = firstname.trim()
            lastname = lastname.trim()
            mobile_no = mobile_no.trim()

            if((wallet_no && firstname && lastname) || mobile_no) {
                let payload = {
                    wallet_no,
                    firstname,
                    lastname,
                    mobile_no
                }

                found = true
    
                //await API.addNewReceiver(payload)
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

    addReceiver = () => {
        this.props.navigation.pop()
    }

    render() {

        const {wallet_no, firstname, lastname, mobile_no, processing, found} = this.state
        let ready = false

        if((wallet_no && firstname && lastname) || mobile_no) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that the ML Wallet account number entered is correct' />

                    <View style={{alignItems:'center'}}>
                        <Avatar source={null} size={Metrics.image.lg} />

                        <Spacer />

                        <TextInput
                            label='Wallet Account Number'
                            value={wallet_no}
                            onChangeText={this.handleChangeWalletNo}
                            onSubmitEditing={this.handleFocusFirstName}
                            keyboardType='numeric'
                            returnKeyType='next'
                        />

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