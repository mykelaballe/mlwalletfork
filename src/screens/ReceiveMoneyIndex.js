import React from 'react'
import {Screen, Headline, ListMenuItem, Icon} from '../components'
import {_, Consts, Say} from '../utils'
import {Colors} from '../themes'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Receive Money'
    }

    handlePressDomestic = () => this.props.navigation.navigate('ReceiveMoneyDomestic',{type:Consts.tcn.rmd.code})

    //handlePressInternational = () => this.props.navigation.navigate('ReceiveMoneyInternational',{type:Consts.tcn.rmi.code})
    handlePressInternational = () => this.props.navigation.navigate('ComingSoon',{title:'Receive Money International',icon:<Icon name='receive_money' style={{width:120,height:120}} />})

    render() {

        return (
            <Screen>
                <Headline subtext='Select Remittance' />

                <ListMenuItem t='Domestic' onPress={this.handlePressDomestic} />
                <ListMenuItem t='International' onPress={this.handlePressInternational} />
            </Screen>
        )
    }
}