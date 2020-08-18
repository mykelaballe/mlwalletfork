import React from 'react'
import {connect} from 'react-redux'
import {Header} from './'
import {Screen, Footer, Text, Spacer, ScrollFix, BackHomeButton} from '../'
import {Colors, Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'

class SendWalletToWallet extends React.Component {

    state = {
        amount:Func.formatToRealCurrency(this.props.data.amount),
        charges:Func.formatToRealCurrency(this.props.data.charges),
        total:Func.formatToRealCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        type:Consts.tcn.stw.long_desc,
        receipt:null
    }

    componentDidMount = () => {
        const {user} = this.props
        const {_from, kptn, walletno, receiver, sender, notes, balance} = this.props.data
        const {amount, charges, total, date, time, type} = this.state

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

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(SendWalletToWallet)