import React from 'react'
import {connect} from 'react-redux'
import {Header} from './'
import {Screen, Footer, Text, Spacer, ScrollFix, BackHomeButton} from '../'
import {Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

class SendWalletToWallet extends React.Component {

    state = {
        amount:Func.formatToRealCurrency(this.props.data.amount),
        charges:Func.formatToRealCurrency(this.props.data.charges),
        total:Func.formatToRealCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.stw.long_desc
    }

    componentDidMount = () => {
        const {user} = this.props
        const {_from, walletno, receiver, sender, notes, balance} = this.props.data
        const {amount, charges, total} = this.state

        this.props.onExport(
            Func.buildReceiptBody({
                Sender: sender,
                [_('90')]:Func.formatWalletNo(walletno),
                Receiver:receiver.fullname,
                Amount:amount,
                Notes:notes,
                Charges:user.walletno != walletno ? charges : false,
                Total:total
            })
        )

        if(_from != 'history') {
            Say.ok(
                null,
                'Success',
                {
                    customMessage:(
                        <>
                            <Text mute md>You successfully sent money worth {Consts.currency.PH} {amount} to {Func.formatWalletNo(walletno)}</Text>
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

        const {user} = this.props
        const {_from, kptn, walletno, receiver, sender, notes} = this.props.data
        const {amount, charges, total, date, time, type} = this.state

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

                        <Text sm mute>Sender</Text>
                        <Text>{sender}</Text>

                        <Spacer />

                        <Text sm mute>Receiver</Text>
                        <Text>{receiver.fullname}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>{Consts.currency.PH} {amount}</Text>

                        <Spacer />

                        <Text sm mute>Notes</Text>
                        <Text>{notes}</Text>

                        <Spacer />

                        {user.walletno != walletno &&
                        <>
                            <Text sm mute>Charges</Text>
                            <Text>{Consts.currency.PH} {charges}</Text>

                            <Spacer />
                        </>
                        }

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

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(SendWalletToWallet)