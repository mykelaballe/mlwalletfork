import React from 'react'
import {StyleSheet, View, ScrollView, FlatList} from 'react-native'
import {Text, Card} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import data from '../services/security_questions'

class SecurityQuestionsScreen extends React.Component {

    static navigationOptions = {
        title:_('67')
    }

    state = {
        list:data
    }

    renderItem = ({item}) => (
        <Card onPress={() => {}}>
            <Text>{item}</Text>
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

export default SecurityQuestionsScreen