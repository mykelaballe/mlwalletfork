import React from 'react'
import {Screen, Footer, Headline, Text, Spacer, Button, TextInput} from '../components'
import {_, Consts} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Pay Bill'
    }

    state = {
        amount:'100',
        email:'',
        add_to_favorites:false,
        processing:false
    }

    handleChangeAmount = amount => this.setState({amount})

    handleChangeEmail = email => this.setState({email})

    handleToggleAddToFavorites = () => this.setState(prevState => ({add_to_favorites:!prevState.add_to_favorites}))

    handlePay = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            ...params,
            ...this.state,
            type:Consts.tcn.bpm.code,
            status:'success'
        })
    }

    render() {

        const {type, biller} = this.props.navigation.state.params
        const {amount, email} = this.state
        let ready = false

        if(amount) ready = true

        return (
            <>
                <Screen>
                    <Headline title={biller.name} />

                    <TextInput
                        disabled
                        label='Account Number'
                        value={'123456789'}
                    />

                    <Spacer sm />

                    <TextInput
                        disabled
                        label='Account Name'
                        value={'John Smith'}
                    />

                    <Spacer sm />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />

                    <Spacer sm />

                    <TextInput
                        label='Email address (Optional)'
                        value={email}
                        onChangeText={this.handleChangeEmail}
                        keyboardType='email-address'
                    />
                </Screen>
                
                <Footer>
                    <Text mute>Note: Fees and charges may apply.</Text>
                    <Spacer />
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handlePay} />
                </Footer>
            </>
        )
    }
}

export default Scrn