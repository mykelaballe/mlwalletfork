import React from 'react'
import {InteractionManager} from 'react-native'
import {FlatList, ListItem} from '../components'
import {Metrics} from '../themes'
import {_} from '../utils'

import registered_questions from '../services/registered_security_questions'
import personal_questions from '../services/personal_security_questions'
import transactional_questions from '../services/transactional_security_questions'

const ItemUI = props => (
    <ListItem
        initial={false}
        primaryText={props.data.text || props.data}
        onPress={() => props.onPress(props.data)}
    />
)

export default class Scrn extends React.Component {

    static navigationOptions = {
        title:'Select a Security Question'
    }

    state = {
        list:[],
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {params = {}} = this.props.navigation.state
        let list = registered_questions.slice()

        try {
            if(params.type === 'personal') list = personal_questions
            else if(params.type === 'transactional') list = transactional_questions

            if(params.selected && params.selected.length > 0) {
                for(let s in params.selected) {
                    let index = list.indexOf(params.selected[s])
                    if(index >= 0) {
                        list.splice(index, 1)
                    }
                }
            }
        }
        catch(err) {

        }

        this.setState({
            list,
            loading:false
        })
    }

    handleSelect = question => {
        const {sourceRoute, _for} = this.props.navigation.state.params
        this.props.navigation.navigate(sourceRoute,{question, _for})
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