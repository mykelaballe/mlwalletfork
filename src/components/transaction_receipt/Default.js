import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, ScrollFix} from '../'
import {Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

class Default extends React.Component {

    state = {
        total:Func.formatToCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:this.props.data.type
    }

    componentDidMount = () => {
        const {_from, walletno, balance} = this.props.data
        const {total} = this.state

        this.props.onExport(`
            <h4 style="color:#6A6A6A;line-height:0">${_('90')}</h4>
            <h3>${Func.formatWalletNo(walletno)}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Total</h4>
            <h3 style="margin-top:0">${Consts.currency.PH} ${total}</h3>
        `)

        if(_from != 'history') {
            Say.ok(
                null,
                'Success',
                {
                    customMessage:(
                        <>
                            <Text mute>Your new balance is</Text>
                            <Text xl b>{Consts.currency.PH} {Func.formatToCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, kptn, walletno} = this.props.data
        const {total, date, time, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={kptn}
                        status='success'
                    />

                    <ScrollFix style={{padding:Metrics.lg}}>
                        <Text sm mute>{_('90')}</Text>
                        <Text>{Func.formatWalletNo(walletno)}</Text>

                        <Spacer />

                        <Text sm mute>Total</Text>
                        <Text>{Consts.currency.PH} {Func.checkTransAmount(this.props.data)}</Text>

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

export default withNavigation(Default)