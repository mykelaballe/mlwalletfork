import React from 'react'
import {withNavigation} from 'react-navigation'
import {connect} from 'react-redux'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, ScrollFix} from '../'
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
        const {_from, walletno, receiver, notes, balance} = this.props.data
        const {amount, charges, total} = this.state

        this.props.onExport(
            Func.buildReceiptBody({
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
                            <Text mute md>You successfully sent money worth PHP {amount} to {Func.formatWalletNo(walletno)}</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>Php {Func.formatToRealCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {user} = this.props
        const {_from, kptn, walletno, receiver, notes} = this.props.data
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

                        <Text sm mute>Receiver</Text>
                        <Text>{receiver.fullname}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

                        <Spacer />

                        <Text sm mute>Notes</Text>
                        <Text>{notes}</Text>

                        <Spacer />

                        {user.walletno != walletno &&
                        <>
                            <Text sm mute>Charges</Text>
                            <Text>PHP {charges}</Text>

                            <Spacer />
                        </>
                        }

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

const mapStateToProps = state => ({
    user: state.user.data
})

export default withNavigation(connect(mapStateToProps)(SendWalletToWallet))