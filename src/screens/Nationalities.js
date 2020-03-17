import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {FlatList, Text, Spacer, HR, Ripple, SearchInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import nationalities from '../services/nationalities'

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
        title:'Select a Nationality'
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
            list = nationalities

            this.listHolder = list
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            list,
            loading:false
        })
    }

    handleSelect = nationality => {
        const {sourceRoute} = this.props.navigation.state.params
        this.props.navigation.navigate(sourceRoute,{nationality})
    }

    handleChangeSearch = search => this.setState({search:this.search(search)})

    search = searchText => {
        const list = this.listHolder.filter(item => item.name.toUpperCase().indexOf(searchText.toUpperCase()) > -1)
        this.setState({list})
    }

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleSelect} />

    render() {

        const {list, search, loading} = this.state

        return (
            <View style={style.container}>
                <SearchInput
                    placeholder='Search Nationality'
                    onChangeText={this.handleChangeSearch}
                    value={search}
                />

                <Spacer />

                <FlatList
                    search={search}
                    data={list}
                    renderItem={this.renderItem}
                    loading={loading}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
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