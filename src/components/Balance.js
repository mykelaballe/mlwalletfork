import React from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Row, Text, Spacer} from './'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Entypo'

class Balance extends React.Component {

    state = {
        balance:'910.50',
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
                    <Text b h3 light>{show ? balance : '****.**'}</Text>
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

export default Balance