import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {FlatList, Text, Spacer, HR, Ripple, SearchInput} from '../components'
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
        title:'Select a Region'
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
                {name:'Region 1'},
                {name:'Region 2'},
                {name:'Region 3'},
                {name:'Region 4'},
                {name:'Region 5'},
                {name:'Region 6'},
                {name:'Region 7'}
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

    handleSelect = region => {
        const {sourceRoute} = this.props.navigation.state.params
        this.props.navigation.navigate(sourceRoute,{region})
    }

    handleChangeSearch = search => this.setState({search})

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleSelect} />

    render() {

        const {list, search, loading} = this.state

        return (
            <View style={style.container}>
                {/*<SearchInput
                    placeholder='Search Nationality'
                    onChangeText={this.handleChangeSearch}
                    value={search}
                />

                <Spacer />*/}

                <FlatList
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