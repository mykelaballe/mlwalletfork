import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {SectionList, Text, Spacer, Ripple} from '../components'
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
                    letter:'G',
                    data:[
                        {
                            name:'Globe',
                        }
                    ]
                },
                {
                    letter:'M',
                    data:[
                        {
                            name:'MCWD',
                        }
                    ]
                },
                {
                    letter:'V',
                    data:[
                        {
                            name:'Veco',
                        }
                    ]
                },
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

    renderSectionHeader = ({section}) => (
        <View style={style.itemHeader}>
            <Text xl b>{section.letter}</Text>
        </View>
    )

    renderItem = ({item, index}) => (
        <Ripple onPress={this.handleSelect} style={style.item}>
            <Text md>{item.name}</Text>
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
        ...StyleSheet.absoluteFill
    },
    item: {
        marginLeft:50,
        padding:Metrics.rg
    }
})

export default FavoriteBillers