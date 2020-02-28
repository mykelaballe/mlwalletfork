import React from 'react'
import {StyleSheet, View, InteractionManager} from 'react-native'
import {FlatList, Text, Ripple, HR} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'

import registered_questions from '../services/registered_security_questions'
import personal_questions from '../services/personal_security_questions'
import transactional_questions from '../services/transactional_security_questions'

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Select a Security Question'
    }

    state = {
        list:[],
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {type} = this.props.navigation.state.params
        let list = []

        try {
            if(type === 'personal') list = personal_questions
            else if(type === 'transactional') list = transactional_questions
            else list = registered_questions
        }
        catch(err) {

        }

        this.setState({
            list,
            loading:false
        })
    }

    handleSelect = question => {
        this.props.navigation.pop()
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

export default Scrn