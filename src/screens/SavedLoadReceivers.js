import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, FlatList, Initial, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {Searchbar} from 'react-native-paper'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.data)} style={style.item}>
            <Row>
                <Initial text={props.data.fullname} />
                <Spacer h sm />
                <View>
                    <Text b>{props.data.fullname}</Text>
                    <Text>{props.data.contact_no}</Text>
                </View>
            </Row>
        </Ripple>

        <HR m={Metrics.sm} />
    </>
)

class SavedLoadReceivers extends React.Component {

    static navigationOptions = {
        title:'Saved Receivers'
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
                {
                    contact_no:'09123456789',
                    fullname:'Ashley Uy',
                },
                {
                    contact_no:'0955398234',
                    fullname:'Lotlot Rubite'
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

    handleAddNewReceiver = () => this.props.navigation.navigate('AddLoadReceiver')

    handleViewReceiver = receiver => this.props.navigation.navigate('BuyLoad',{receiver})

    handleChangeSearch = search => this.setState({search})

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleViewReceiver} />

    render() {

        const {list, search, loading} = this.state

        return (
            <View style={style.container}>
                <Searchbar
                    placeholder='Search'
                    onChangeText={this.handleChangeSearch}
                    value={search}
                    style={{backgroundColor:Colors.lightgray}}
                />

                <Spacer sm />

                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    loading={loading}
                />

                <View style={style.footer}>
                    <Button t='Add New Receiver' onPress={this.handleAddNewReceiver} />
                </View>
            </View>
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
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default SavedLoadReceivers