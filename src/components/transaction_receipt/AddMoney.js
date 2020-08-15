import React from 'react'
import {Header} from './'
import {Screen, Text, Spacer, ScrollFix} from '../'
import {Metrics} from '../../themes'
import {_, Func, Consts} from '../../utils'

export default class AddMoney extends React.Component {

    state = {
        total:Func.formatToCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.adm.long_desc
    }

    componentDidMount = () => {
        const {sender, branchname} = this.props.data
        const {total} = this.state

        this.props.onExport(
            Func.buildReceiptBody({
                Sender: sender,
                Branch: branchname,
                Total: `${Consts.currency.PH} ${total}`
            })
        )
    }

    render() {

        const {kptn, sender, branchname} = this.props.data
        const {total, date, time, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={kptn}
                        status='success'
                    />

                    <ScrollFix style={{padding:Metrics.lg}}>
                        {/*<Text sm mute>Sender</Text>
                        <Text>{sender}</Text>

                        <Spacer />

                        <Text sm mute>Branch</Text>
                        <Text>{branchname}</Text>

                        <Spacer />*/}

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
            </>
        )
    }
}