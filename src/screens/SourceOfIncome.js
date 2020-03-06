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
        title:'Select Source of Income'
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
                {name:'Salary/Wage/Page'},
                {name:'Commission'},
                {name:'Pension'},
                {name:'Allowance'},
                {name:'Remittance Abroad'},
                {name:'Gift'},
                {name:'Business'},
                {name:'Rentals'},
                {name:'Loan Proceeds'},
                {name:'Interest from Deposits'},
                {name:'Sale of Property'},
                {name:'Goverment aid'},
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

    handleSelect = source_of_income => {
        const {sourceRoute} = this.props.navigation.state.params
        this.props.navigation.navigate(sourceRoute,{source_of_income})
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