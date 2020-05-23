import React from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Headline, TextInput, Text, Button, Spacer, Avatar} from '../components'
import {Metrics} from '../themes'
import {_, Say, Consts} from '../utils'
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
        profilepic:null,
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

            walletno = walletno.replace(/ /g, '')

            if(walletno && ((firstname && lastname) || mobile_no)) {
                let payload = {
                    walletno,
                    firstname,
                    lastname,
                    mobile_no
                }
    
                let res = await API.searchWalletReceiver(payload)
                
                if(res.error) Say.warn(res.message)
                else {
                    this.setState({
                        found:true,
                        walletno:res.walletno,
                        firstname:res.firstName,
                        lastname:res.lastName,
                        mobile_no:res.mobileno,
                        profilepic:res.profilepic
                    })

                    Say.ok('Search successful')
                }
            }
            else {
                Say.some(_('8'))
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    addReceiver = async () => {
        try {
            const {walletno} = this.state

            let res = await API.addWalletReceiver({
                senderWalletNum:this.props.user.walletno,
                receiverWalletNum:walletno
            })

            if(res.error) Say.warn(res.message)
            else {
                this.props.refreshAll(true)
                Say.ok('Receiver added successfully')
                this.props.navigation.pop()
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({processing:false})
    }

    render() {

        const {walletno, firstname, lastname, mobile_no, profilepic, processing, found} = this.state
        let ready = false

        if(walletno && ((firstname && lastname) || mobile_no)) ready = true

        return (
            <>
                <Screen>
                    <Headline subtext='Please ensure that the ML Wallet account number entered is correct' />

                    <View style={{alignItems:'center'}}>
                        <Avatar source={profilepic ? `${Consts.baseURL}wallet/image?walletno=${walletno}` : null} size={Metrics.image.lg} />

                        <Spacer />

                        <TextInput
                            label={_('90')}
                            value={walletno}
                            onChangeText={this.handleChangeWalletNo}
                            onSubmitEditing={this.handleFocusFirstName}
                            keyboardType='numeric'
                            returnKeyType='next'
                            mask={Consts.walletNoMask}
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
    addReceiver:newReceiver => dispatch(Creators.addWalletReceiver(newReceiver)),
    refreshAll:refresh => dispatch(Creators.refreshWalletAllReceivers(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)