import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {SectionList, Spacer, SearchInput, SectionHeader, ListItem} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

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
        title:'Select a Country'
    }

    state = {
        list:[],
        search:'',
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        this.listHolder = []
        let list = []

        try {
            list = await API.getCountries()

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

    handleSelect = country => {
        const {sourceRoute} = this.props.navigation.state.params
        this.props.navigation.navigate(sourceRoute,{country})
    }

    handleChangeSearch = search => this.setState({search:this.search(search)})

    search = searchText => {
        let list = []

        this.listHolder.map(section => {
            let data = section.data.filter(item => item.name.toUpperCase().indexOf(searchText.toUpperCase()) > -1)
            
            if(data.length > 0) {
                list = list.concat({
                    letter:section.letter,
                    data
                })
            }
        })

        this.setState({list})
    }

    renderSectionHeader = ({section}) => <SectionHeader text={section.letter} />

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleSelect} />

    render() {

        const {list, search, loading} = this.state

        return (
            <View style={style.container}>
                <SearchInput
                    editable={!loading}
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
                    skeleton
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    }
})