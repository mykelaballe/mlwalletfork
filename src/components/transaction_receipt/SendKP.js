import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../../actions'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, View, Row} from '../'
import {Metrics} from '../../themes'
import {_, Consts, Func, Say} from '../../utils'
import {API} from '../../services'

class SendKP extends React.Component {
    
    state = {
        amount:Func.formatToCurrency(this.props.data.amount),
        charges:Func.formatToCurrency(this.props.data.charges),
        total:Func.formatToCurrency(this.props.data.total),
        date:this.props.data.date,
        time:this.props.data.time,
        status:this.props.data.status,
        cancellable:this.props.data.cancellable,
        cancelling:false,
        type:Consts.tcn.skp.long_desc
    }

    componentDidMount = () => {
        const {_from, receiver, balance} = this.props.data
        const {amount, charges, total} = this.state

        this.props.onExport(`
            <h4 style="color:#6A6A6A;line-height:0">First Name</h4>
            <h3>${receiver.firstname}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Middle Name</h4>
            <h3>${receiver.middlename}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Last Name</h4>
            <h3>${receiver.lastname}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Suffix</h4>
            <h3>${receiver.suffix}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Amount</h4>
            <h3 style="margin-top:0">PHP ${amount}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Charges</h4>
            <h3 style="margin-top:0">PHP ${charges}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Total</h4>
            <h3 style="margin-top:0">PHP ${total}</h3>
        `)

        if(_from != 'history') {
            Say.ok(
                null,
                'Success',
                {
                    customMessage:(
                        <>
                            <Text mute md>Share the transaction number to {Func.formatName(receiver)} to complete this transaction.</Text>
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
        const {kptn, controlno} = this.props.data

        if(cancelling) return false

        try {
            this.setState({cancelling:true})

            let res = await API.sendKPCancel({
                walletno,
                kptn,
                controlno
            })
            
            if(res.error) Say.warn(res.message)
            else {
                this.props.updateBalance(res.data.balance)
                this.setState({
                    cancellable:false,
                    status:'cancelled'
                })
                Say.ok(`Your transaction ${Consts.tcn.skp.short_desc} has been cancelled`)
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({cancelling:false})
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, kptn, receiver} = this.props.data
        const {amount, charges, total, date, time, status, cancellable, cancelling, type} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={kptn}
                        status={status}
                        cancellable={cancellable}
                    />

                    <View style={{padding:Metrics.lg}}>
                        <Row>
                            <View style={{flex:1}}>
                                <Text mute sm>First Name</Text>
                                <Text md>{receiver.firstname}</Text>
                            </View>

                            <Spacer h xl />

                            <View style={{flex:1}}>
                                <Text mute sm>Middle Name</Text>
                                <Text md>{receiver.middlename || _('50')}</Text>
                            </View>
                        </Row>

                        <Spacer />

                        <Row>
                            <View style={{flex:1}}>
                                <Text mute sm>Last Name</Text>
                                <Text md>{receiver.lastname}</Text>
                            </View>

                            <Spacer h xl />

                            <View style={{flex:1}}>
                                <Text mute sm>Suffix</Text>
                                <Text md>{receiver.suffix || _('51')}</Text>
                            </View>
                        </Row>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {amount}</Text>

                        <Spacer />

                        <Text sm mute>Charges</Text>
                        <Text>PHP {charges}</Text>

                        <Spacer />

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
                    </View>
                </Screen>

                <Footer>
                    {cancellable && <Button mode='outlined' t='Cancel Transaction' onPress={this.handleCancelTransaction} loading={cancelling} />}
                    <Spacer sm />
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

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(SendKP))