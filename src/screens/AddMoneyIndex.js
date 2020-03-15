import React from 'react'
import {Screen, ListMenuItem} from '../components'
import {_} from '../utils'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Money'
    }

    handleViewMLBranch = () => this.props.navigation.navigate('AddMoneyBranch')

    handleViewBankToWallet = () => this.props.navigation.navigate('ComingSoon',{title:'Add Money'})

    render() {

        return (
            <Screen>
                <ListMenuItem t='M Lhuillier Branch' onPress={this.handleViewMLBranch} />
                <ListMenuItem t='Bank to Wallet' onPress={this.handleViewBankToWallet} />
            </Screen>
        )
    }
}