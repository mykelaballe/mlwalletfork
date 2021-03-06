import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../../actions'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, BackHomeButton, Button, ScrollFix} from '../'
import {Colors, Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'
import {API} from '../../services'

class WithdrawCash extends React.Component {
    
    state = {
        amount:Func.formatToRealCurrency(this.props.data.amount),
        date:this.props.data.date,
        time:this.props.data.time,
        status:this.props.data.status,
        cancellable:this.props.data.cancellable,
        cancelling:false,
        type:Consts.tcn.wdc.long_desc,
        receipt:null
    }

    componentDidMount = () => {
        const {_from, kptn, user, balance} = this.props.data
        const {amount, status, cancellable, isclaimed, date, time, type} = this.state

        const receipt = (
            <>
                <Header
                    status={status}
                    cancellable={cancellable}
                    tcn={kptn}
                />

                <ScrollFix style={{padding:Metrics.lg,backgroundColor:Colors.light}}>
                    <Text sm mute>Full Legal Name</Text>
                    <Text>{user.fname} {user.lname}</Text>

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
                            <Text mute md>Your transaction is pending. Go to the nearest M Lhuillier branch to complete your withdrawal</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>{Consts.currency.PH} {Func.formatToRealCurrency(balance)}</Text>
                        </>
                    )
                }
            )
        }
    }

    handleCancelTransaction = async () => {
        const {walletno} = this.props.user
        const {kptn} = this.props.data
        let latitude = Consts.defaultLatitude, longitude = Consts.defaultLongitude

        if(Func.isCheckLocation('cwdc')) {
            const locationRes = await Func.getLocation()
            if(!locationRes.error) {
                latitude = locationRes.data.latitude
                longitude = locationRes.data.longitude

                API.attemptWithdrawCashCancel({
                    walletno,
                    kptn
                })

                Say.ask(
                    'Are you sure you want to cancel this transaction?',
                    'Cancel Transaction',
                    {
                        onConfirm:() => this.cancelTransaction({
                            latitude,
                            longitude
                        })
                    }
                )
            }
        }
    }

    cancelTransaction = async payload => {
        const {cancelling} = this.state
        const {walletno} = this.props.user
        const {_from, kptn} = this.props.data

        if(cancelling) return false

        try {
            this.setState({cancelling:true})

            let res = await API.withdrawCashCancel({
                walletno,
                kptn,
                ...payload
            })
            
            if(res.error) Say.warn(res.message)
            else {
                this.props.updateBalance(res.data.balance)
                this.setState({
                    cancellable:false,
                    status:'cancelled'
                })
                Say.ok(`Your transaction ${Consts.tcn.wdc.short_desc} has been cancelled`)
                
                if(_from == 'history') this.props.navigation.pop()
            }
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({cancelling:false})
    }

    handleShowQR = () => this.props.navigation.navigate('TransactionQR',{transaction_no:this.props.data.kptn})

    render() {

        const {_from} = this.props.data
        const {receipt, cancellable, cancelling} = this.state

        return (
            <>
                <Screen compact>
                    {receipt}
                </Screen>

                <Footer>
                    {cancellable &&
                    <>
                        <Button mode='outlined' t='Withdraw using QR Code' onPress={this.handleShowQR} />
                        {/*<Spacer sm />
                        <Button mode='outlined' t='Cancel Transaction' onPress={this.handleCancelTransaction} loading={cancelling} />*/}

                        <Spacer sm />
                    </>
                    }

                    {_from !== 'history' && <BackHomeButton />}
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