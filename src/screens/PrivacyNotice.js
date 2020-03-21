import React from 'react'
import {View, StyleSheet} from 'react-native'
import {FlatList, Text, Spacer, CollapsibleItem} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import list from '../services/privacy'

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Privacy Notice'
    }

    state = {
        list,
        search:''
    }

    renderItem = ({item, index}) => (
        <CollapsibleItem
            style={style.item}
            topContent={<Text mute md>{item.question}</Text>}
            bottomContent={
            <>
                <Spacer />
                {typeof item.answer === 'string' ? <Text>{item.answer}</Text> : item.answer}
            </>
            }
        />
    )

    render() {

        const {list, search} = this.state

        return (
            <View style={style.container}>
                <Text center>M Lhuillier is committed to respect and protect the right to privacy of its data subject in accordance with Republic Act No. 10173 (the Data Privacy Act of 2012 or DPA), its Implementing Rules and Regulations (IRR) and other applicable laws of the Republic of the Philippines governing privacy of individual personal information and of communication.</Text>
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
        padding:Metrics.md
    },
    item: {
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.gray,
        borderRadius:Metrics.sm,
        padding:Metrics.md,
        marginVertical:Metrics.rg
    }
})