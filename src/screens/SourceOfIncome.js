import React from 'react'
import {InteractionManager} from 'react-native'
import {FlatList, ListItem} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'

const ItemUI = props => (
    <ListItem
        initial={false}
        primaryText={props.data.name}
        onPress={() => props.onPress(props.data.name)}
    />
)

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Source of Income'
    }

    state = {
        list:[],
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

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleSelect} />

    render() {

        const {list, loading} = this.state

        return (
            <FlatList
                data={list}
                renderItem={this.renderItem}
                loading={loading}
                style={{padding:Metrics.md}}
            />
        )
    }
}