import React from 'react'
import {Screen, Headline, ListMenuItem} from '../components'
import {_, Consts} from '../utils'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Send Money'
    }

    handleSendToWallet = () => this.props.navigation.navigate('SendWalletToWallet',{type:Consts.tcn.stw.code})

    handleSendToKP = () => this.props.navigation.navigate('SendKP',{type:Consts.tcn.skp.code})

    handleSendToBank = () => this.props.navigation.navigate('SendBankTransfer',{type:Consts.tcn.stb.code})

    render() {

        return (
            <Screen>
                <Headline subtext='Select Send Money Service' />

                <ListMenuItem t='Wallet to Wallet' onPress={this.handleSendToWallet} />
                <ListMenuItem t='Kwarta Padala' onPress={this.handleSendToKP} />
                <ListMenuItem t='Bank Transfer' onPress={this.handleSendToBank} />
            </Screen>
        )
    }
}