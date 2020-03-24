import React from 'react'
import {StyleSheet, InteractionManager} from 'react-native'
import {FlatList, Text, Ripple, HR} from '../components'
import {Metrics} from '../themes'
import {_} from '../utils'

import registered_questions from '../services/registered_security_questions'
import personal_questions from '../services/personal_security_questions'
import transactional_questions from '../services/transactional_security_questions'

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

    renderItem = ({item, index}) => (
        <>
            <Ripple onPress={() => this.handleSelect(item)} style={style.item}>
                <Text md>{item}</Text>
            </Ripple>

            <HR />
        </>
    )

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

const style = StyleSheet.create({
    item: {
        paddingVertical:Metrics.rg
    }
})