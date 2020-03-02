import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, Text, Spacer, Prompt, Button, View} from '../'
import {Metrics} from '../../themes'
import {Consts, Func} from '../../utils'

const moment = require('moment')

class SendBankTransfer extends React.Component {
    
    state = {
        showSuccessModal:true
    }

    handleCloseModal = () => this.setState({showSuccessModal:false})

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, tcn, timestamp, bank, account_name, account_number, amount, fixed_charge, convenience_fee, total} = this.props.data
        const {showSuccessModal} = this.state

        return (
            <>
                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    customMessage={
                        <>
                            <Text mute md>You successfully transferred money to bank. Expect 2-3 banking days for your new balance to reflect.</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>Php 1000</Text>
                        </>
                    }
                    onDismiss={this.handleCloseModal}
                />
                <Screen compact>
                    <Header tcn={tcn} />
                    
                    <View style={{padding:Metrics.lg}}>
                        <Text sm mute>Partner's Name</Text>
                        <Text>{bank}</Text>

                        <Spacer />

                        <Text sm mute>Account Name</Text>
                        <Text>{account_name}</Text>

                        <Spacer />

                        <Text sm mute>Account No.</Text>
                        <Text>{account_number}</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP {Func.formatToCurrency(amount)}</Text>

                        <Spacer />

                        <Text sm mute>Fixed Charge</Text>
                        <Text>PHP {Func.formatToCurrency(fixed_charge)}</Text>

                        <Spacer />

                        <Text sm mute>Convenience Fee</Text>
                        <Text>PHP {Func.formatToCurrency(convenience_fee)}</Text>

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
                        <Text>{Consts.tcn.stb.long_desc}</Text>
                    </View>
                </Screen>

                <Footer>
                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(SendBankTransfer)