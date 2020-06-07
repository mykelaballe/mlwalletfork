import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, ScrollFix} from '../'
import {Metrics} from '../../themes'
import {_, Func, Say} from '../../utils'

class AddMoney extends React.Component {

    state = {
        total:Func.formatToCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.adm.long_desc
    }

    componentDidMount = () => {
        const {_from, walletno, receiver, balance} = this.props.data
        const {total} = this.state

        this.props.onExport(`
            <h4 style="color:#6A6A6A;line-height:0">Sender</h4>
            <h3>${receiver.fullname}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Receiver</h4>
            <h3>${receiver.fullname}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Total</h4>
            <h3 style="margin-top:0">PHP ${total}</h3>
        `)

        if(_from != 'history') {
            Say.ok(
                null,
                'Success',
                {
                    customMessage:(
                        <>
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

        const {_from, kptn, walletno, receiver} = this.props.data
        const {total, date, time, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={kptn}
                        status='success'
                    />

                    <ScrollFix style={{padding:Metrics.lg}}>
                        <Text sm mute>Sender</Text>
                        <Text>{receiver.fullname}</Text>

                        <Spacer />

                        <Text sm mute>Receiver</Text>
                        <Text>{receiver.fullname}</Text>

                        <Spacer />

                        <Text sm mute>Total</Text>
                        <Text>PHP {total}</Text>

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

export default withNavigation(AddMoney)