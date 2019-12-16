import React from 'react'
import {View, StyleSheet, FlatList, InteractionManager} from 'react-native'
import {Row, Text, Spacer, HR, ListItem} from '../components'
import {Colors, Metrics} from '../themes'
import {Searchbar} from 'react-native-paper'

class AccountsScreen extends React.Component {

    static navigationOptions = {
        title:'Accounts'
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
                'ABLE SERVICES',
                'ACF INTERNATIONAL (ACTION CONTRA FAMINE)',
                'AF INTEGRATED RELIABLE MANPOWER SERVICING INC',
                'AGENCY FOR TECHNICAL COOPERATION AND DEVELOPMENT (ACTED)',
                'AGRI PHIL CORPORATION',
                'AMANA SECURITY AGENCY',
                'ASIA TRAVEL',
                'ASIA UNITED BANK',
                'ATIN ITO REMITTANCE LTD.',
                'AUSPHIL FOREX',
                'AYANNAH BUSINESS SOLUTIONS INC',
                'BANK ALBILAD',
                'BANK OF COMMERCE',
                'BC REMIT'
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

export default AccountsScreen