import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../../actions'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, View, ScrollFix} from '../'
import {Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'
import {API} from '../../services'

class WithdrawCash extends React.Component {
    
    state = {
        amount:Func.formatToCurrency(this.props.data.amount),
        date:this.props.data.date,
        time:this.props.data.time,
        status:this.props.data.status,
        cancellable:this.props.data.cancellable,
        cancelling:false,
        type:Consts.tcn.wdc.long_desc
    }

    componentDidMount = () => {
        const {_from, user, balance} = this.props.data
        const {amount} = this.state

        this.props.onExport(`
            <h4 style="color:#6A6A6A;line-height:0">Full Legal Name</h4>
            <h3>${user.fname} ${user.lname}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Amount</h4>
            <h3 style="margin-top:0">PHP ${amount}</h3>
        `)

        if(_from != 'history') {
            Say.ok(
                null,
                'Success',
                {
                    customMessage:(
                        <>
                            <Text mute md>Your transaction is pending. Go to the nearest M Lhuillier branch to complete your withdraw</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>Php {Func.formatToCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    handleCancelTransaction = () => {
        Say.ask(
            'Are you sure you want to cancel this transaction?',
            'Cancel Transaction',
            {
                onConfirm:this.cancelTransaction
            }
        )
    }

    cancelTransaction = async () => {
        const {cancelling} = this.state
        const {walletno} = this.props.user
        const {kptn} = this.props.data

        if(cancelling) return false

        try {
            this.setState({cancelling:true})

            let res = await API.withdrawCashCancel({
                walletno,
                kptn
            })
            
            if(res.error) Say.warn(res.message)
            else {
                this.props.updateBalance(res.data.balance)
                this.setState({
                    cancellable:false,
                    status:'cancelled'
                })
                Say.ok(`Your transaction ${Consts.tcn.wdc.short_desc} has been cancelled`)
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({cancelling:false})
    }

    handleShowQR = () => this.props.navigation.navigate('TransactionQR',{transaction_no:this.props.data.kptn})

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, kptn, user} = this.props.data
        const {status, cancellable, cancelling, amount, date, time, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        status={status}
                        cancellable={cancellable}
                        tcn={kptn}
                    />

                    <ScrollFix style={{padding:Metrics.lg}}>
                        <Text sm mute>Full Legal Name</Text>
                        <Text>{user.fname} {user.lname}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

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
                    {cancellable &&
                    <>
                        <Button mode='outlined' t='Withdraw using QR Code' onPress={this.handleShowQR} />
                        <Spacer sm />
                        <Button mode='outlined' t='Cancel Transaction' onPress={this.handleCancelTransaction} loading={cancelling} />

                        <Spacer sm />
                    </>
                    }

                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updateBalance: newBalance => dispatch(Creators.updateBalance(newBalance))
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(WithdrawCash))