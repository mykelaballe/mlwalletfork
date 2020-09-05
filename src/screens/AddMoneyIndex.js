import React from 'react'
import {Screen, ListMenuItem} from '../components'
import {_} from '../utils'
import {Colors} from '../themes'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Add Money'
    }

    handleViewMLBranch = () => this.props.navigation.navigate('AddMoneyBranch')

    handleViewBankToWallet = () => this.props.navigation.navigate('ComingSoon',{
        title:'Add Money',
        icon:<Icon name='bank' size={150} color={Colors.brand} style={{opacity:.5}} />
    })

    render() {

        return (
            <Screen>
                <ListMenuItem t='M Lhuillier Branch' onPress={this.handleViewMLBranch} />
                <ListMenuItem t='Bank to Wallet' onPress={this.handleViewBankToWallet} />
            </Screen>
        )
    }
}