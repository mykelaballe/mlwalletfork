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
        primaryText={props.data.bill_partner_name}
        onPress={() => props.onPress(props.data)}
    />
)

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Billers'
    }

    state = {
        list:[],
        search:'',
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {params = {}} = this.props.navigation.state
        let list = []

        try {
            list = await API.getAllBillers(params.category ? params.category.value : '')

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

    handleSelectBiller = biller => this.props.navigation.navigate('AddBiller',{biller})

    handleChangeSearch = search => this.setState({search:this.search(search)})

    search = searchText => {
        let list = []

        this.listHolder.map(section => {
            let data = section.data.filter(item => item.bill_partner_name.toUpperCase().indexOf(searchText.toUpperCase()) > -1)
            
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

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleSelectBiller} />

    render() {

        const {list, search, loading, refreshing} = this.state

        return (
            <View style={style.container}>
                <SearchInput
                    placeholder='Search Biller'
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
                    placeholder={{text:'No Billers found'}}
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
    },
})