import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import {SectionList, Text, Spacer, Button, CollapsibleItem} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import data from '../services/faq'
import {Searchbar} from 'react-native-paper'

class FAQ extends React.Component {

    static navigationOptions = {
        title:'Frequently Asked Questions'
    }

    state = {
        list:data,
        search:''
    }

    handleChangeSearch = search => this.setState({search})

    handleContact = () => this.props.navigation.navigate('ContactUs')

    renderSectionHeader = ({section: {title}}) => <Text b md>{title}</Text>

    renderSectionFooter = () => <Spacer />

    renderItem = ({item}) => (
        <CollapsibleItem
            style={style.item}
            topContent={<Text md>{item.question}</Text>}
            bottomContent={
            <>
                <Spacer />
                <Text md>{item.answer}</Text>
            </>
            }
        />
    )

    render() {

        const {list, search} = this.state

        return (
            <View style={style.container}>
                <Searchbar
                    placeholder='Search'
                    onChangeText={this.handleChangeSearch}
                    value={search}
                    style={{backgroundColor:Colors.lightgray}}
                />

                <Spacer />

                <SectionList
                    sections={list}
                    renderSectionHeader={this.renderSectionHeader}
                    renderSectionFooter={this.renderSectionFooter}
                    renderItem={this.renderItem}
                />

                <Spacer />

                <Text mute center>Can't find the answer to your question or have another concern?</Text>
                <Spacer sm />
                <Button t='Contact Us' onPress={this.handleContact} />
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

export default FAQ