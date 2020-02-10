import React from 'react'
import {StyleSheet, View} from 'react-native'
import {FlatList, Text, Icon, Spacer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import data from '../services/terms'

class TermsAndConditionsScreen extends React.Component {

    static navigationOptions = {
        title:'Terms and Conditions'
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
                <Spacer />

                <View style={{alignItems:'center'}}>
                    <Icon name='terms' size={70} />
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
        flex:1,
        padding:Metrics.lg
    },
    item: {
        marginVertical:Metrics.md
    }
})

export default TermsAndConditionsScreen