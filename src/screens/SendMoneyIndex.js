import React from 'react'
import {Screen, Headline, ListMenuItem, Icon} from '../components'
import {_, Consts, Say} from '../utils'
import {Colors} from '../themes'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Send Money'
    }

    handleSendToWallet = () => this.props.navigation.navigate('SendWalletToWalletIndex',{type:Consts.tcn.stw.code})

    handleSendToKP = () => this.props.navigation.navigate('SendKPIndex',{type:Consts.tcn.skp.code})

    handleSendToBank = () => this.props.navigation.navigate('ComingSoon',{title:'Wallet To Bank',icon:<Icon name='send_money' style={{width:120,height:120}} />})//Say.warn(Consts.error.featureNotAvailable)//this.props.navigation.navigate('SendBankTransferIndex',{type:Consts.tcn.stb.code})

    render() {

        return (
            <Screen>
                <Headline subtext='Select Send Money Service' />

                <ListMenuItem t={Consts.tcn.stw.short_desc} onPress={this.handleSendToWallet} />
                <ListMenuItem t={Consts.tcn.skp.short_desc} onPress={this.handleSendToKP} />
                <ListMenuItem t={Consts.tcn.stb.short_desc} onPress={this.handleSendToBank} />
            </Screen>
        )
    }
}