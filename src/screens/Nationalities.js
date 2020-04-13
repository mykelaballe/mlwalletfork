import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {FlatList, Spacer, SearchInput, ListItem} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import nationalities from '../services/nationalities'

const ItemUI = props => (
    <ListItem
        big
        initial={false}
        primaryText={props.data.name}
        onPress={() => props.onPress(props.data.name)}
    />
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
            Say.err(err)
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
    }
})