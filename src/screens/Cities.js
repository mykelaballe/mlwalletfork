import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {SectionList, Text, Spacer, HR, Ripple, SearchInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.data.name)} style={style.item}>
            <Text md>{props.data.name}</Text>
        </Ripple>
        <HR />
    </>
)

export default class Scrn extends React.Component {

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
            Say.err(_('500'))
        }

        this.setState({
            list,
            loading:false
        })
    }

    handleSelect = city => {
        const {sourceRoute} = this.props.navigation.state.params
        this.props.navigation.navigate(sourceRoute,{city})
    }

    handleChangeSearch = search => this.setState({search})

    renderSectionHeader = ({section}) => (
        <View style={style.itemHeader}>
            <Text mute>{section.letter}</Text>
        </View>
    )

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleSelect} />

    render() {

        const {list, search, loading} = this.state

        return (
            <View style={style.container}>
                <SearchInput
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
    },
    item: {
        padding:Metrics.rg
    }
})