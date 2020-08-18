import React from 'react'
import {Header} from './'
import {Screen, Text, Spacer, ScrollFix} from '../'
import {Colors, Metrics} from '../../themes'
import {_, Func, Consts} from '../../utils'

export default class AddMoney extends React.Component {

    state = {
        total:Func.formatToCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.adm.long_desc,
        receipt:null
    }

    componentDidMount = () => {
        const {kptn, sender, branchname} = this.props.data
        const {total, date, time, type} = this.state

        const receipt = (
            <>
                <Header
                    tcn={kptn}
                    status='success'
                />

                <ScrollFix style={{padding:Metrics.lg,backgroundColor:Colors.light}}>
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