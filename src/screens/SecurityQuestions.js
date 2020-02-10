import React from 'react'
import {StyleSheet, View, InteractionManager} from 'react-native'
import {FlatList, Text, Ripple, HR} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'

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
            list = [
                {
                    question:"What is your mother's maiden name?"
                },
                {
                    question:"In what city did you live on your third grade?"
                },
                {
                    question:"What is your nickname?"
                },
                {
                    question:"In what city did you meet your spouse?"
                },
                {
                    question:"What is your favorite restaurant?"
                },
                {
                    question:"Who was your childhood bestfriend?"
                },
                {
                    question:"What was the name of your first pet?"
                },
                {
                    question:"Who is your favorite teacher?"
                },
                {
                    question:"Who is your favorite teacher?"
                },
                {
                    question:"In what city your father was born?"
                },
                {
                    question:"What was your first teacher's name?"
                },
                {
                    question:"What was your first phone number?"
                },
                {
                    question:"What is your oldest sibling's nickname?"
                }
            ]
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
                <Text>{item.question}</Text>
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