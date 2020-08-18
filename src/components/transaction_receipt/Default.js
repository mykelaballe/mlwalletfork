import React from 'react'
import {Header} from './'
import {Screen, Footer, Text, Spacer, ScrollFix, BackHomeButton} from '../'
import {Colors, Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

export default class Default extends React.Component {

    state = {
        total:Func.formatToRealCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:this.props.data.type,
        receipt:null
    }

    componentDidMount = () => {
        const {kptn, walletno} = this.props.data
        const {total, date, time, type} = this.state

        const receipt = (
            <>
                <Header
                    tcn={kptn}
                    status='success'
                />

                <ScrollFix style={{padding:Metrics.lg,backgroundColor:Colors.light}}>
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
            </>
        )

        this.props.onExport(receipt)

        this.setState({receipt})
    }

    render() {

        const {receipt} = this.state

        return (
            <Screen compact>
                {receipt}
            </Screen>
        )
    }
}