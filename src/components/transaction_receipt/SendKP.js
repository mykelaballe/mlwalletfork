import React from 'react'
import {connect} from 'react-redux'
import {Creators} from '../../actions'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Button, View, Row} from '../'
import {Metrics} from '../../themes'
import {Consts, Func, Say} from '../../utils'
import {API} from '../../services'

const moment = require('moment')

class SendKP extends React.Component {
    
    state = {
        status:this.props.data.status,
        statusMessage:'Your money is waiting to be claimed',
        cancellable:this.props.data.cancellable,
        cancelling:false
    }

    componentDidMount = () => {
        const {receiver, balance} = this.props.data

        Say.ok(
            null,
            'Success',
            {
                customMessage:(
                    <>
                        <Text mute md>Share the transaction number to {receiver.firstname} {receiver.middlename} {receiver.lastname} {receiver.suffix} to complete this transaction.</Text>
                        <Spacer lg />
                        <Text mute>Your new balance is</Text>
                        <Text xl b>Php {Func.formatToCurrency(balance)}</Text>
                    </>
                )
            }
        )
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
            
            if(res.err) Say.warn(res.message)
            else {
                this.props.updateBalance(res.data.balance)
                this.setState({
                    cancellable:false,
                    status:'cancelled',
                    statusMessage:''
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

        const {_from, kptn, timestamp, receiver, amount, charges, total} = this.props.data
        const {status, statusMessage, cancellable, cancelling} = this.state

        return (
            <>
                <Screen compact>
                    <Header
                        tcn={kptn}
                        status={status}
                        statusMessage={statusMessage}
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
                                <Text md>{receiver.middlename}</Text>
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
                                <Text md>{receiver.suffix}</Text>
                            </View>
                        </Row>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {Func.formatToCurrency(amount)}</Text>

                        <Spacer />

                        <Text sm mute>Charges</Text>
                        <Text>PHP {Func.formatToCurrency(charges)}</Text>

                        <Spacer />

                        <Text sm mute>Total</Text>
                        <Text>PHP {Func.formatToCurrency(total)}</Text>

                        <Spacer />

                        <Text sm mute>Date</Text>
                        <Text>{moment(timestamp).format('MMMM DD, YYYY')}</Text>

                        <Spacer />

                        <Text sm mute>Time</Text>
                        <Text>{moment(timestamp).format('hh:mm:ss a')}</Text>

                        <Spacer />

                        <Text sm mute>Type</Text>
                        <Text>{Consts.tcn.skp.long_desc}</Text>
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