import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {SectionList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {Searchbar} from 'react-native-paper'

class Partners extends React.Component {

    static navigationOptions = {
        title:'Select a Province'
    }

    state = {
        list:[],
        search:'',
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let list = []

        try {
            list = [
                {
                    letter:'A',
                    data:[
                        {
                            name:'Abra',
                        },
                        {
                            name:'Apayao'
                        },
                    ]
                },
                {
                    letter:'C',
                    data:[
                        {
                            name:'Cagayan',
                        },
                        {
                            name:'Camarines Norte'
                        },
                        {
                            name:'Camarines Sur'
                        },
                        {
                            name:'Camiguin'
                        },
                        {
                            name:'Capiz'
                        },
                        {
                            name:'Catanduanes'
                        },
                        {
                            name:'Cebu'
                        }
                    ]
                },
            ]
        }
        catch(err) {

        }

        this.setState({
            list,
            loading:false
        })
    }

    handleSelect = () => this.props.navigation.pop()

    handleChangeSearch = search => this.setState({search})

    renderSectionHeader = ({section}) => (
        <View style={style.itemHeader}>
            <Text mute>{section.letter}</Text>
        </View>
    )

    renderItem = ({item, index}) => (
        <>
            <Ripple onPress={this.handleSelect} style={style.item}>
                <Text md>{item.name}</Text>
            </Ripple>
            <HR />
        </>
    )

    render() {

        const {list, search, loading} = this.state

        return (
            <View style={style.container}>
                <Searchbar
                    placeholder='Search Province'
                    onChangeText={this.handleChangeSearch}
                    value={search}
                />

                <Spacer />

                <SectionList
                    sections={list}
                    renderSectionHeader={this.renderSectionHeader}
                    renderItem={this.renderItem}
                    loading={loading}
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
    itemHeader: {
        backgroundColor:Colors.lightgray,
        padding:Metrics.rg,
        //...StyleSheet.absoluteFill
    },
    item: {
        padding:Metrics.rg
    }
})

export default Partners