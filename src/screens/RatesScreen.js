import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Button, Row, Card, FlatList} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class RatesScreen extends React.Component {

    static navigationOptions = {
        title:'send kp'
    }

    state = {
        list:[],
        loading:true,
        refreshing:false
    }

    componentDidMount = () => this.getData()

    getData = async () => {
        let list = []

        try {
            list = await API.getKPRates()
        }
        catch(err) {
            Say.err(_('18'))
        }

        this.setState({
            list,
            loading:false,
            refreshing:false
        })
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderItem = ({item, index}) => (
        <Card>
            <Row ar>
                <Text center md>{item.minAmount} - {item.maxAmount}</Text>
                <Text center md>{item.chargeValue}</Text>
            </Row>
        </Card>
    )

    render() {

        const {list, loading, refreshing} = this.state

        return (
            <View style={style.container}>
                <View style={style.bar}>
                    <Text b light center>{_('40')}</Text>
                    <Text b light center>{_('27')}</Text>
                </View>
            
                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    style={{paddingHorizontal:Metrics.md}}
                    loading={loading}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:Colors.gray
    },
    bar: {
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:Colors.black,
        paddingVertical:Metrics.md,
        paddingHorizontal:Metrics.md + Metrics.rg
    }
})

export default RatesScreen