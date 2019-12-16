import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {Text, Row, Spacer, HR, FlatList} from '../components'
import {Colors, Metrics} from '../themes'

class ShopViewCartScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:'My Cart'
    })

    state = {
        list:[],
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let list = []
        
        try {
            list = [1,2]
        }
        catch(err) {

        }

        this.setState({
            list,
            loading:false
        })
    }

    renderItem = ({item, index}) => (
        <Text>Product</Text>
    )

    render() {

        const {list, loading} = this.state

        return (
            <FlatList
                data={list}
                renderItem={this.renderItem}
                loading={loading}
            />
        )
    }
}

export default ShopViewCartScreen