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
        primaryText={props.data.PartnersName}
        onPress={() => props.onPress(props.data)}
    />
)

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:"Partner's Name"
    }

    state = {
        list:[],
        search:'',
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let list = []

        try {
            list = await API.getPartners()

            this.listHolder = list
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            list,
            loading:false,
            refreshing:false
        })
    }

    handleSelect = partner => this.props.navigation.navigate('ReceiveMoneyInternational',{partner})

    handleChangeSearch = search => this.setState({search:this.search(search)})

    search = searchText => {
        let list = []

        this.listHolder.map(section => {
            let data = section.data.filter(item => item.PartnersName.toUpperCase().indexOf(searchText.toUpperCase()) > -1)
            
            if(data.length > 0) {
                list = list.concat({
                    letter:section.letter,
                    data
                })
            }
        })

        this.setState({list})
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderSectionHeader = ({section}) => <SectionHeader text={section.letter} />

    renderItem = ({item, index}) => <ItemUI index={index} data={item} onPress={this.handleSelect} />

    render() {

        const {list, search, loading, refreshing} = this.state

        return (
            <View style={style.container}>
                <SearchInput
                    placeholder="Search Partner's Name"
                    onChangeText={this.handleChangeSearch}
                    value={search}
                />

                <Spacer />

                <SectionList
                    sections={list}
                    renderSectionHeader={this.renderSectionHeader}
                    renderItem={this.renderItem}
                    loading={loading}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    placeholder={{text:'No partners found'}}
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