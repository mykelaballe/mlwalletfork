import React from 'react'
import {View} from 'react-native'
import {Screen, Footer, Headline, Text, Spacer, Button, TextInput, Icon} from '../components'
import {Metrics} from '../themes'
import {_, Consts} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Withdraw Cash'
    }

    state = {
        type:Consts.tcn.wdc.code,
        amount:'1000',
        charges:'',
        total:''
    }

    handleChangeAmount = amount => this.setState({amount})

    handleWithdraw = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            type:this.state.type,
            ...params,
            transaction: {
                ...this.state
            },
            cancellable:true
        })
    }

    render() {

        const {type, amount, charges, total} = this.state
        let ready = false

        if(amount) ready = true

        return (
            <>
                <Screen>

                    <View style={{alignItems:'center'}}>
                        <Icon name='withdraw_cash' size={Metrics.icon.xl} />
                    </View>

                    <Spacer md />

                    <Headline subtext='Enter amount to be withdrawn' />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />
                </Screen>
                
                <Footer>
                    <Text mute>Charges</Text>
                    <Text md>PHP 25.00</Text>

                    <Spacer />

                    <Text mute>Total</Text>
                    <Text md>PHP 25.00</Text>

                    <Spacer />
                    
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleWithdraw} />
                </Footer>
            </>
        )
    }
}

export default Scrn