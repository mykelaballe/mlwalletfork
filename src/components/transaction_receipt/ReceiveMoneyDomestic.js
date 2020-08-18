import React from 'react'
import {Header} from './'
import {Screen, Footer, Text, Spacer, ScrollFix, BackHomeButton} from '../'
import {Colors, Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

export default class ReceiveMoneyDomestic extends React.Component {

    state = {
        amount:Func.formatToRealCurrency(this.props.data.amount),
        forex:Func.formatToCurrency(this.props.data.forexRate),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.rmd.long_desc,
        receipt:null
    }

    componentDidMount = () => {
        const {_from, kptn, balance, sender, currency} = this.props.data
        const {amount, date, time, type} = this.state

        const receipt = (
            <>
                <Header
                    tcn={kptn}
                    status='success'
                />

                <ScrollFix style={{padding:Metrics.lg,backgroundColor:Colors.light}}>
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
            </>
        )

        this.props.onExport(receipt)

        this.setState({receipt})

        if(_from != 'history') {
            Say.ok(
                null,
                null,
                {
                    customMessage:(
                        <>
                            <Text mute md>You have successfully received {currency} {amount} from {Func.cleanName(`${sender}`)}.</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>{Consts.currency.PH} {Func.formatToRealCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    render() {

        const {_from} = this.props.data
        const {receipt} = this.state

        return (
            <>
                <Screen compact>
                    {receipt}
                </Screen>

                <Footer>
                    {_from !== 'history' && <BackHomeButton />}
                </Footer>
            </>
        )
    }
}