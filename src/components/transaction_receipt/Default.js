import React from 'react'
import {Header} from './'
import {Screen, Footer, Text, Spacer, ScrollFix, BackHomeButton} from '../'
import {Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

export default class Default extends React.Component {

    state = {
        total:Func.formatToRealCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:this.props.data.type
    }

    componentDidMount = () => {
        const {_from, walletno, balance} = this.props.data
        const {total} = this.state

        this.props.onExport(
            Func.buildReceiptBody({
                [_('90')]: Func.formatWalletNo(walletno),
                Total: `${Consts.currency.PH} ${total}`
            })
        )

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
                        <Text>{Consts.currency.PH} {total}</Text>

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
                    {_from !== 'history' && <BackHomeButton />}
                </Footer>
            </>
        )
    }
}