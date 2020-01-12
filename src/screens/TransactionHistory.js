import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Spacer, HeaderRight} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class TransactionHistory extends React.Component {

    static navigationOptions = {
        title:'Transaction History',
        headerRight: (
            <HeaderRight>
                <Icon name='ios-download' color={Colors.light} size={Metrics.icon.rg} />
            </HeaderRight>
        )
    }

    render() {

        return (
            <View>
                
            </View>
        )
    }
}

export default TransactionHistory