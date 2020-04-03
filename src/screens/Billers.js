import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {SectionList, Text, Spacer, HR, Ripple, SearchInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Consts} from '../utils'
import {API} from '../services'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.data)} style={style.item}>
            <Text md>{props.data.bill_partner_name}</Text>
        </Ripple>
        <HR />
    </>
)

class Scrn extends React.Component {

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
            Say.err(_('500'))
        }

        this.setState({
            list,
            loading:false,
            refreshing:false
        })
    }

    handleSelectBiller = biller => {
        //const {state, navigate, pop} = this.props.navigation
        //const {params = {}} = state

        this.props.navigation.navigate('AddBiller',{biller})

        //if(params.category) navigate('PayBill',{type:Consts.tcn.bpm.code, biller})
        //else navigate('AddBillerFavorite',{biller})
    }

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

    renderSectionHeader = ({section}) => (
        <View style={style.itemHeader}>
            <Text b>{section.letter}</Text>
        </View>
    )

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

export default Scrn