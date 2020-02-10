import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {SectionList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {Searchbar} from 'react-native-paper'

class Partners extends React.Component {

    static navigationOptions = {
        title:'Select a City/Municipality'
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
                    letter:'C',
                    data:[
                        {
                            name:'Carcar',
                        },
                        {
                            name:'Cebu'
                        },
                        {
                            name:'Composetela'
                        },
                        {
                            name:'Consolacion'
                        },
                        {
                            name:'Cordova'
                        }
                    ]
                },
                {
                    letter:'D',
                    data:[
                        {
                            name:'Danao',
                        },
                    ]
                },
                {
                    letter:'L',
                    data:[
                        {
                            name:'Lapu-Lapu',
                        },
                        {
                            name:'Liloan'
                        }
                    ]
                },
                {
                    letter:'M',
                    data:[
                        {
                            name:'Mandaue',
                        },
                        {
                            name:'Minglanilla'
                        }
                    ]
                },
                {
                    letter:'N',
                    data:[
                        {
                            name:'Naga',
                        },
                    ]
                },
                {
                    letter:'S',
                    data:[
                        {
                            name:'San Fernando',
                        },
                    ]
                },
                {
                    letter:'T',
                    data:[
                        {
                            name:'Talisay',
                        },
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
                    placeholder='Search City/Municipality'
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