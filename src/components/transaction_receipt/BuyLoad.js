import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, View, Text, Spacer, Button, ScrollFix} from '../'
import {Metrics} from '../../themes'
import {Consts, Func, Say} from '../../utils'

class BuyLoad extends React.Component {

    state = {
        amount:Func.formatToCurrency(this.props.data.amount),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.bul.long_desc
    }

    componentDidMount = () => {
        const {_from, contact_no, promo, balance} = this.props.data
        const {amount} = this.state

        this.props.onExport(
            Func.buildReceiptBody({
                'Mobile Number': Func.formatToPHMobileNumberFull(contact_no),
                'Promo Code': promo ? promo.promoCode : false,
                Amount: `${Consts.currency.PH} ${amount}`
            })
        )

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

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, kptn, contact_no, promo} = this.props.data
        const {amount, date, time, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={kptn}
                        status='success'
                    />

                    <ScrollFix style={{padding:Metrics.lg}}>
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
                </Screen>

                <Footer>
                {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(BuyLoad)