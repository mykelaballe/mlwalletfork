import React from 'react'
import {InteractionManager} from 'react-native'
import {FlatList, ListItem} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'

const ItemUI = props => (
    <ListItem
        big
        initial={false}
        primaryText={props.data.name}
        onPress={() => props.onPress(props.data.name)}
    />
)

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Nature of Work'
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
                {name:'Others'},
                {name:'Accounting'},
                {name:'Banking'},
                {name:'Call Center'},
                {name:'Clerk'},
                {name:'Collector'},
                {name:'Construction'},
                {name:'Consultancy'},
                {name:'Education or Teaching'},
                {name:'Engineering'},
                {name:'Finance'},
                {name:'Food'},
                {name:'Government Ofc/Dept'},
                {name:'Hotel and Restaurant'},
                {name:'Insurance'},
                {name:'Investment'},
                {name:'IT/Programming'},
                {name:'Law Enforcement - Police or Military'},
                {name:'Legal'},
                {name:'Logistics'},
                {name:'Manufacturing'},
                {name:'Media'},
                {name:'Medical/Medicine'},
                {name:'Non-Bank Financial Services'},
                {name:'Realty'},
                {name:'Research'},
                {name:'Sales'},
                {name:'Security'},
                {name:'Agency'},
                {name:'Tellering or Cashering'},
                {name:'Travels'}
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

    handleSelect = natureofwork => {
        const {sourceRoute} = this.props.navigation.state.params
        this.props.navigation.navigate(sourceRoute,{natureofwork})
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