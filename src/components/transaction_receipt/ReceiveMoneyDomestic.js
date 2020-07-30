import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, View, Text, Spacer, Button, ScrollFix} from '../'
import {Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

class ReceiveMoneyDomestic extends React.Component {

    state = {
        amount:Func.formatToRealCurrency(this.props.data.amount),
        forex:Func.formatToCurrency(this.props.data.forexRate),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.rmd.long_desc
    }

    componentDidMount = () => {
        const {_from, balance, sender, currency} = this.props.data
        const {amount, forex} = this.state

        this.props.onExport(
            Func.buildReceiptBody({
                Sender:Func.cleanName(sender),
                Amount:`${currency} ${amount}`
            })
        )

        if(_from != 'history') {
            let receivedAmount = amount

            if(Func.formatToCurrency(forex) > 0) receivedAmount = amount * Func.formatToCurrency(forex)

            Say.ok(
                null,
                null,
                {
                    customMessage:(
                        <>
                            <Text mute md>You have successfully received {currency} {Func.formatToRealCurrency(receivedAmount)} from {Func.cleanName(`${sender}`)}.</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>{Consts.currency.PH} {Func.formatToRealCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, kptn, sender, currency} = this.props.data
        const {amount, date, time, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={kptn}
                        status='success'
                    />

                    <ScrollFix style={{padding:Metrics.lg}}>
                        <Text sm mute>Sender</Text>
                        <Text>{Func.cleanName(`${sender}`)}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>{currency} {amount}</Text>

                        <Spacer />

                        <Text sm mute>Date</Text>
                        <Text>{date}</Text>

                        <Spacer />

                        <Text sm mute>Time</Text>
                        <Text>{time}</Text>

                        <Spacer />

                        <Text sm mute>Type</Text>
                        <Text>{type}</Text>
                    </ScrollFix>
                </Screen>

                <Footer>
                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(ReceiveMoneyDomestic)