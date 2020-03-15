import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Prompt, Button, View, Row} from '../'
import {Metrics} from '../../themes'
import {Consts, Func, Say} from '../../utils'

const moment = require('moment')

class SendKP extends React.Component {
    
    state = {
        status:this.props.data.status,
        statusMessage:'Your money is waiting to be claimed',
        cancellable:this.props.data.cancellable,
        //showSuccessModal:true,
        //showCancelModal:false,
        //showOkModal:false
    }

    componentDidMount = () => {
        const {receiver} = this.props.data

        Say.ok(
            null,
            'Success',
            {
                customMessage:(
                    <>
                        <Text mute md>Share the transaction number to {receiver.firstname} {receiver.middlename} {receiver.lastname} {receiver.suffix} to complete this transaction.</Text>
                        <Spacer lg />
                        <Text mute>Your new balance is</Text>
                        <Text xl b>Php 1000</Text>
                    </>
                )
            }
        )
    }

    /*handleCloseModal = () => {
        this.setState({
            showSuccessModal:false,
            showCancelModal:false,
            showOkModal:false
        })
    }*/

    handleCancelTransaction = () => {
        //this.setState({showCancelModal:true})
        Say.ask(
            'Are you sure you want to cancel this transaction?',
            'Cancel Transaction',
            {
                onConfirm:this.cancelTransaction
            }
        )
    }

    /*handleOnCancel = () => {
        this.cancelTransaction()
        this.setState({showCancelModal:false})
    }*/

    cancelTransaction = async () => {
        this.setState({
            //showOkModal:true,
            cancellable:false,
            status:'cancelled',
            statusMessage:''
        })
        Say.ok(`Your transaction ${Consts.tcn.skp.short_desc} has been cancelled`)
    }

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, tcn, timestamp, receiver, amount, charges, total} = this.props.data
        const {status, statusMessage, cancellable, showSuccessModal, showCancelModal, showOkModal} = this.state

        return (
            <>
                {/*<Prompt
                    visible={showSuccessModal}
                    title='Success'
                    customMessage={
                        <>
                            <Text mute md>Share the transaction number to {receiver.firstname} {receiver.middlename} {receiver.lastname} {receiver.suffix} to complete this transaction.</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>Php 1000</Text>
                        </>
                    }
                    onDismiss={this.handleCloseModal}
                />*/}

                {/*<Prompt
                    type='yes_no'
                    visible={showCancelModal}
                    title='Cancel Transaction'
                    message='Are you sure you want to cancel this transaction?'
                    onDismiss={this.handleCloseModal}
                    onConfirm={this.handleOnCancel}
                />*/}

                {/*<Prompt
                    visible={showOkModal}
                    title='Success'
                    message={`Your transaction ${Consts.tcn.skp.short_desc} has been cancelled`}
                    onDismiss={this.handleCloseModal}
                />*/}

                <Screen compact>
                    <Header
                        tcn={tcn}
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
                    {cancellable && <Button mode='outlined' t='Cancel Transaction' onPress={this.handleCancelTransaction} />}
                    <Spacer sm />
                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(SendKP)