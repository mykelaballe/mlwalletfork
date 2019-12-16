import React from 'react'
import {StyleSheet, View, ScrollView, FlatList} from 'react-native'
import {Text, Card, HR, Spacer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import data from '../services/faq'

class FAQScreen extends React.Component {

    static navigationOptions = {
        title:_('24')
    }

    state = {
        list:data
    }

    renderItem = ({item}) => (
        <Card>
            <Text b md>{item.question}</Text>
            <HR />
            <Text>{item.answer}</Text>
        </Card>
    )

    render() {

        const {list} = this.state

        return (
            <View style={{paddingTop:Metrics.rg,backgroundColor:Colors.gray}}>
                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={{marginHorizontal:Metrics.rg}}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

export default FAQScreen