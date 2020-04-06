import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, View, Text, Spacer, Button} from '../'
import {Metrics} from '../../themes'
import {Consts, Func, Say} from '../../utils'

const moment = require('moment')

class BuyLoad extends React.Component {

    state = {
        amount:Func.formatToCurrency(this.props.data.amount),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.bul.long_desc
    }

    componentDidMount = () => {
        const {_from, contact_no, promo, balance} = this.props.data
        const {amount} = this.state

        this.props.onExport(`
            <h4 style="color:#6A6A6A;line-height:0">Mobile Number</h4>
            <h3>${contact_no}</h3>

            ${promo && `<h4 style="color:#6A6A6A;line-height:0">Promo Code</h4>`}
            ${promo && `<h3 style="margin-top:0">PHP ${promo.promoCode}</h3>`}

            <h4 style="color:#6A6A6A;line-height:0">Amount</h4>
            <h3 style="margin-top:0">PHP ${amount}</h3>
        `)

        if(_from != 'history') {
            Say.ok(
                null,
                'Success',
                {
                    customMessage:(
                        <>
                            <Text mute md>You successfully sent load worth PHP {Func.formatToCurrency(amount)} to {contact_no}</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>Php {Func.formatToRealCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, kptn, contact_no, promo} = this.props.data
        const {amount, date, time, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={kptn}
                        status='success'
                    />

                    <View style={{padding:Metrics.lg}}>
                        <Text sm mute>Mobile Number</Text>
                        <Text>{contact_no}</Text>

                        
                        {promo &&
                        <>
                            <Spacer />

                            <Text sm mute>Promo Code</Text>
                            <Text>{promo.promoCode}</Text>
                        </>
                        }

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

                        <Spacer />

                        <Text sm mute>Date</Text>
                        <Text>{date}</Text>

                        <Spacer />

                        <Text sm mute>Time</Text>
                        <Text>{time}</Text>

                        <Spacer />

                        <Text sm mute>Type</Text>
                        <Text>{type}</Text>
                    </View>
                </Screen>

                <Footer>
                {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(BuyLoad)