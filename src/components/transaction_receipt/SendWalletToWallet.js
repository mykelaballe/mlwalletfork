import React from 'react'
import {withNavigation} from 'react-navigation'
import {Header} from './'
import {Screen, Footer, View, Text, Spacer, Prompt, Button} from '../'
import {Metrics} from '../../themes'
import {Consts} from '../../utils'

const moment = require('moment')

class SendWalletToWallet extends React.Component {
    
    state = {
        showSuccessModal:true
    }

    handleCloseModal = () => this.setState({showSuccessModal:false})

    handleBackToHome = () => this.props.navigation.navigate('Home')

    render() {

        const {_from, tcn, timestamp} = this.props.data
        const {showSuccessModal} = this.state

        return (
            <>
                <Prompt
                    visible={showSuccessModal}
                    title='Success'
                    customMessage={
                        <>
                            <Text mute md>You successfully sent money worth PHP 1000 to MLW-0011-718-2031-822-1211</Text>
                            <Spacer lg />
                            <Text mute>Your new balance is</Text>
                            <Text xl b>Php 1000</Text>
                        </>
                    }
                    onDismiss={this.handleCloseModal}
                />
                <Screen compact>
                    <Header
                        tcn={tcn}
                        status='success'
                    />

                    <View style={{padding:Metrics.lg}}>
                        <Text sm mute>Wallet Account Number</Text>
                        <Text>121321</Text>

                        <Spacer />

                        <Text sm mute>Receiver</Text>
                        <Text>John Smith</Text>

                        <Spacer />

                        <Text sm mute>Amount</Text>
                        <Text>PHP 1000</Text>

                        <Spacer />

                        <Text sm mute>Notes</Text>
                        <Text>some notes here</Text>

                        <Spacer />

                        <Text sm mute>Charges</Text>
                        <Text>PHP 25.00</Text>

                        <Spacer />

                        <Text sm mute>Total</Text>
                        <Text>PHP 25.00</Text>

                        <Spacer />

                        <Text sm mute>Date</Text>
                        <Text>{moment(timestamp).format('MMMM DD, YYYY')}</Text>

                        <Spacer />

                        <Text sm mute>Time</Text>
                        <Text>{moment(timestamp).format('hh:mm:ss a')}</Text>

                        <Spacer />

                        <Text sm mute>Type</Text>
                        <Text>{Consts.tcn.stw.long_desc}</Text>
                    </View>
                </Screen>

                <Footer>
                    {_from !== 'history' && <Button t='Back to Home' onPress={this.handleBackToHome} />}
                </Footer>
            </>
        )
    }
}

export default withNavigation(SendWalletToWallet)