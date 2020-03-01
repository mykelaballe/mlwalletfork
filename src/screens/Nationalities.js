import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {FlatList, Text, Spacer, HR, Ripple, SearchInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'

class Scrn extends React.Component {

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
            list = [
                {name:'Filipino'},
                {name:'American'},
                {name:'German'},
                {name:'Russian'},
                {name:'French'},
                {name:'Japanese'},
                {name:'Chinese'},
                {name:'Korean'},
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
                <SearchInput
                    placeholder='Search Nationality'
                    onChangeText={this.handleChangeSearch}
                    value={search}
                />

                <Spacer />

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

export default Scrn