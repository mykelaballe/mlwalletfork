import React from 'react'
import {Screen, Headline, ListMenuItem} from '../components'
import {_, Consts, Say} from '../utils'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Receive Money'
    }

    handlePressDomestic = () => this.props.navigation.navigate('ReceiveMoneyDomestic',{type:Consts.tcn.rmd.code})

    handlePressInternational = () => Say.warn(Consts.error.featureNotAvailable)//this.props.navigation.navigate('ReceiveMoneyInternational',{type:Consts.tcn.rmi.code})

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