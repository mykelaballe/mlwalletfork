import React from 'react'
import {Header} from './'
import {Screen, Footer, Text, Spacer, ScrollFix, BackHomeButton} from '../'
import {Colors, Metrics} from '../../themes'
import {Consts, Func, Say} from '../../utils'

export default class BuyLoad extends React.Component {

    state = {
        amount:Func.formatToCurrency(this.props.data.amount),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.bul.long_desc,
        receipt:null
    }

    componentDidMount = () => {
        const {_from, kptn, contact_no, promo, balance} = this.props.data
        const {amount, date, time, type} = this.state

        const receipt = (
            <>
                <Header
                    tcn={kptn}
                    status='success'
                />

                <ScrollFix style={{padding:Metrics.lg,backgroundColor:Colors.light}}>
                    <Text sm mute>Mobile Number</Text>
                    <Text>{Func.formatToPHMobileNumberFull(contact_no)}</Text>

                    
                    {promo &&
                    <>
                        <Spacer />

                        <Text sm mute>Promo Code</Text>
                        <Text>{promo.promoCode}</Text>
                    </>
                    }

                    <Spacer />

                    <Text sm mute>Amount</Text>
                    <Text>{Consts.currency.PH} {amount}</Text>

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
                'Success',
                {
                    customMessage:(
                        <>
                            <Text mute md>You successfully sent load worth {Consts.currency.PH} {Func.formatToCurrency(amount)} to {Func.formatToPHMobileNumberFull(contact_no)}</Text>
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