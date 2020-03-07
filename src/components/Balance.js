import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {withNavigation} from 'react-navigation'
import {Row, Text, Spacer, ButtonText} from './'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Entypo'
import {Func} from '../utils'

class Balance extends React.Component {

    state = {
        balance: this.props.user.balance,
        show: false
    }

    handleToggle = () => this.setState(prevState => ({show:!prevState.show}))

    handleDeposit = () => this.props.navigation.navigate('DepositMoneyIndex')

    render() {

        const {balance, show} = this.state

        return (
            <View style={style.jumbo}>
                <Text center light md>Available Balance</Text>
                <Row>
                    <Text rg light>Php</Text>
                    <Spacer h xs />
                    <Text b h3 light>{show ? Func.formatToCurrency(balance) : '******.**'}</Text>
                    <Spacer h sm />
                    <TouchableOpacity onPress={this.handleToggle}>
                        <Icon name={`eye${!show ? '-with-line' : ''}`} size={Metrics.icon.rg} color={Colors.light} />
                    </TouchableOpacity>
                </Row>
                <ButtonText
                    style={{borderColor:Colors.light}}
                    mode='outlined'
                    color={Colors.light}
                    icon='plus'
                    t='Deposit'
                    onPress={this.handleDeposit}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    jumbo: {
        alignItems:'center',
        backgroundColor:Colors.dark,
        paddingVertical:Metrics.xl
    },
})

mapStateToProps = state => ({
    user: state.user.data
})

export default withNavigation(connect(mapStateToProps)(Balance))