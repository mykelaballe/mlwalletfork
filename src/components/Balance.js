import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Row, Text, Spacer} from './'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Entypo'
import { Func } from '../utils'

class Balance extends React.Component {

    state = {
        balance: this.props.user.balance,
        show: false
    }

    handleToggle = () => this.setState(prevState => ({show:!prevState.show}))

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

export default connect(mapStateToProps)(Balance)