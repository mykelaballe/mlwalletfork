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
        title:'Select a Country'
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
                            name:'Afghanistan',
                        },
                        {
                            name:'Algeria'
                        },
                        {
                            name:'Argentina'
                        },
                        {
                            name:'Australia'
                        },
                        {
                            name:'Austria'
                        }
                    ]
                },
                {
                    letter:'P',
                    data:[
                        {
                            name:'Pakistan',
                        },
                        {
                            name:'Palau'
                        },
                        {
                            name:'Palestine'
                        },
                        {
                            name:'Philippines'
                        }
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

    handleSelect = country => {
        const {sourceRoute} = this.props.navigation.state.params
        this.props.navigation.navigate(sourceRoute,{country})
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
                    placeholder='Search Country'
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