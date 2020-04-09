import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, View, Text, Spacer, Button, ScrollFix} from '../'
import {Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

class ReceiveMoneyDomestic extends React.Component {

    state = {
        amount:Func.formatToCurrency(this.props.data.amount),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.rmd.long_desc
    }

    componentDidMount = () => {
        const {_from, balance, sender} = this.props.data
        const {amount} = this.state

        this.props.onExport(`
            <h4 style="color:#6A6A6A;line-height:0">Sender</h4>
            <h3>${Func.cleanName(sender)}</h3>

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
                            <Text mute md>You have successfully received Php {Func.formatToCurrency(amount)} from {Func.cleanName(`${sender}`)}.</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>Php {Func.formatToCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, kptn, sender} = this.props.data
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