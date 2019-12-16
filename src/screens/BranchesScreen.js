import React from 'react'
import {View, StyleSheet, FlatList, InteractionManager} from 'react-native'
import {Row, Text, Spacer, HR, ListItem} from '../components'
import {Colors, Metrics} from '../themes'
import {Searchbar} from 'react-native-paper'

class BranchesScreen extends React.Component {

    static navigationOptions = {
        title:'Branches'
    }

    state = {
        list:[],
        loading:true,
        searchText:''
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let list = []

        try {
            list = [
                'AYALA CEBU SHOWROOM',
                'BARAS, RIZAL',
                'BOLINAO, PANGASINAN',
                'CALAPANDAYAN',
                'GMALL DIGOS SHOWROOM',
                'KCC MALL SHOWROOM (GENSAN)',
                'MIS DIVISION',
                'ML 1ST CRUMB',
                'ML 888 MALL',
                'ML A. SORIANO, TANZA',
                'ML A.S. FORTUNA',
                'ML ABATAN',
                'ML ABREEZA MALL',
                'ML ABUCAY'
            ]
        }
        catch(err) {

        }

        this.setState({
            list,
            loading:false
        })
    }

    handleSearch = searchText => {
        searchText = searchText.trim()
        this.setState({
            searchText
        })
    }

    renderItem = ({item}) => (
        <ListItem onPress={() => {}}>
            <Text md>{item}</Text>
        </ListItem>
    )

    render() {

        const {list, loading, searchText} = this.state

        return (
            <View style={{flex:1}}>
                <Searchbar
                    placeholder='Search'
                    onChangeText={this.handleSearch}
                    value={searchText}
                />
                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    style={{paddingHorizontal:Metrics.md}}
                />
            </View>
        )
    }
}

export default BranchesScreen