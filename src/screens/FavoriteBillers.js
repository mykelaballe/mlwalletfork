import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {FlatList, Text, Spacer, Ripple} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {Searchbar} from 'react-native-paper'

class FavoriteBillers extends React.Component {

    static navigationOptions = {
        title:'Favorite Billers'
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
                    id:1,
                    name:'A2M Global Distribution Inc.',
                    account_no:'123456',
                    account_name:'A2M',
                    email:'a2m@gmail.com',
                    add_to_favorites:true
                },
                {
                    id:2,
                    name:'A2M Global',
                    account_no:'123456',
                    account_name:'A2M',
                    email:'a2m@gmail.com',
                    add_to_favorites:true
                },
                {
                    id:3,
                    name:'A2M',
                    account_no:'123456',
                    account_name:'A2M',
                    email:'a2m@gmail.com',
                    add_to_favorites:true
                },
                {
                    id:4,
                    name:'A2M Global',
                    account_no:'123456',
                    account_name:'A2M',
                    email:'a2m@gmail.com',
                    add_to_favorites:true
                },
                {
                    id:5,
                    name:'A2M',
                    account_no:'123456',
                    account_name:'A2M',
                    email:'a2m@gmail.com',
                    add_to_favorites:true
                }
            ]
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            list,
            loading:false
        })
    }

    handleSelect = () => this.props.navigation.pop()

    handleChangeSearch = search => this.setState({search})

    renderItem = ({item, index}) => (
        <Ripple onPress={this.handleSelect} style={style.item}>
            <Text md>{item.partner}</Text>
        </Ripple>
    )

    render() {

        const {list, search, loading} = this.state

        return (
            <View style={style.container}>
                <Searchbar
                    placeholder='Search'
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
        ...StyleSheet.absoluteFill
    },
    item: {
        marginLeft:50,
        padding:Metrics.rg
    }
})

export default FavoriteBillers