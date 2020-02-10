import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, FlatList, Initial, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.data)} style={style.item}>
            <Text mute md>{props.data.name}</Text>
        </Ripple>

        <HR m={Metrics.sm} />
    </>
)

class Reminders extends React.Component {

    static navigationOptions = {
        title:'Select Remind Me Every'
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
                    name:'1st of the Month',
                },
                {
                    name:'2nd of the Month',
                },
                {
                    name:'3rd of the Month',
                },
                {
                    name:'4th of the Month',
                },
                {
                    name:"Don't Remind Me"
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

    handleSelect = () => {
        this.props.navigation.pop()
    }

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleSelect} />

    render() {

        const {list, loading} = this.state

        return (
            <FlatList
                data={list}
                renderItem={this.renderItem}
                loading={loading}
                style={style.container}
            />
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    },
    item: {
        padding:Metrics.rg
    }
})

export default Reminders