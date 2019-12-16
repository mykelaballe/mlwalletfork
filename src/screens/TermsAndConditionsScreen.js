import React from 'react'
import {StyleSheet, View, ScrollView, FlatList} from 'react-native'
import {Text, Card, HR} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import data from '../services/terms'

class TermsAndConditionsScreen extends React.Component {

    static navigationOptions = {
        title:_('69')
    }

    state = {
        list:data
    }

    renderItem = ({item, index}) => (
        <Card>
            <Text>{index + 1}. {item}</Text>
        </Card>
    )

    render() {

        const {list} = this.state

        return (
            <View style={{flex:1,backgroundColor:Colors.gray}}>
                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={{padding:Metrics.md}}
                />
            </View>
        )
    }
}

export default TermsAndConditionsScreen