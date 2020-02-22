import React from 'react'
import {StyleSheet, View, InteractionManager} from 'react-native'
import {FlatList, Text, Ripple, HR} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'

import questions from '../services/security_questions'

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
        let list = []

        try {
            list = questions
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