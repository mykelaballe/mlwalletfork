import React from 'react'
import {connect} from 'react-redux'
import {Screen, Footer, Text, Spacer, Button, TextInput} from '../components'
import {_, Consts, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn[navigation.state.params.type].short_desc
    })

    state = {
        transaction_no:'',
        amount:'',
        sender:'',
        firstname:'',
        lastname:'',
        processing:false
    }

    handleChangeTransactionNo = transaction_no => this.setState({transaction_no})

    handleChangeAmount = amount => this.setState({amount})

    handleChangeSender = sender => this.setState({sender})

    handleChangeFirstName = firstname => this.setState({firstname})

    handleChangeLastName = lastname => this.setState({lastname})

    handleFocusAmount = () => this.refs.amount.focus()

    handleFocusSender = () => this.refs.sender.focus()

    handleFocusFirstName = () => this.refs.firstname.focus()

    handleFocusLastName = () => this.refs.lastname.focus()

    handleSubmit = async () => {
        const {walletno} = this.props.user
        const {params} = this.props.navigation.state
        let {transaction_no, amount, sender, firstname, lastname, processing} = this.state

        if(processing) return false
        
        try {
            transaction_no = transaction_no.trim()
            amount = amount.trim()
            //sender = sender.trim()
            firstname = firstname.trim()
            lastname = lastname.trim()

            if(!transaction_no || !amount || !firstname || !lastname) Say.some(_('8'))
            else {
                let res = await API.receiveMoneyDomestic({
                    walletno,
                    kptn:transaction_no,
                    principal:amount,
                    //sender,
                    firstname,
                    lastname
                })

                if(res.error) Say.warn(res.message)
                else {
                    this.props.navigation.navigate('TransactionReceipt',{
                        ...params,
                        transaction: {
                            ...this.state,
                            ...res.data
                        },
                        status:'success'
                    })
                }
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {transaction_no, amount, sender, firstname, lastname, processing} = this.state
        let ready = false

        if(transaction_no && amount && firstname && lastname) ready = true

        return (
            <>
                <Screen>
                    <TextInput
                        ref='transaction_no'
                        label='Transaction No.'
                        value={transaction_no}
                        onChangeText={this.handleChangeTransactionNo}
                        onSubmitEditing={this.handleFocusAmount}
                        autoCapitalize='characters'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='amount'
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleFocusFirstName}
                        keyboardType='numeric'
                        returnKeyType='next'
                    />

                    {/*<TextInput
                        ref='sender'
                        label="Sender's Name"
                        value={sender}
                        onChangeText={this.handleChangeSender}
                        autoCapitalize='words'
                    />*/}

                    <TextInput
                        ref='firstname'
                        label="First Name"
                        value={firstname}
                        onChangeText={this.handleChangeFirstName}
                        onSubmitEditing={this.handleFocusLastName}
                        autoCapitalize='words'
                        returnKeyType='next'
                    />

                    <TextInput
                        ref='lastname'
                        label="Last Name"
                        value={lastname}
                        onChangeText={this.handleChangeLastName}
                        autoCapitalize='words'
                    />
                </Screen>
                
                <Footer>
                    <Text center>Make sure to enter the correct Transaction No. Five attempts will block your account for 24 hrs.</Text>
                    <Spacer sm />
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSubmit} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)