import React from 'react'
import {StyleSheet, View} from 'react-native'
import {FlatList, Text, Spacer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import data from '../services/terms'

class PrivacyNotice extends React.Component {

    static navigationOptions = {
        title:'Privacy Notice'
    }

    state = {
        list:data
    }

    renderItem = ({item, index}) => (
        <View style={style.item}>
            <Text md>{index + 1}. {item}</Text>
        </View>
    )

    render() {

        const {list} = this.state

        return (
            <View style={style.container}>
                <View style={{alignItems:'center'}}>
                    <Text>M Lhuillier is committed to respect and protect the right to privacy of its data subject in accordance with Republic Act No. 10173 (the Data Privacy Act of 2012 or DPA), its Implementing Rules and Regulations (IRR) and other applicable laws of the Republic of the Philippines governing privacy of individual personal information and of communication</Text>
                </View>

                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        padding:Metrics.lg
    },
    item: {
        marginVertical:Metrics.md
    }
})

export default PrivacyNotice