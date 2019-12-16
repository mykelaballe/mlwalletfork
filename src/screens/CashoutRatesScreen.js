import React from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import {Text, Button, Row, Card} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'

class CashoutRatesScreen extends React.Component {

    static navigationOptions = {
        title:'cashout'
    }

    state = {
        list:[],
        loading:true,
        refreshing:false,
        error:false,
        showMenu:false
    }

    componentDidMount = () => this.getData()

    getData = async () => {
        let list = []

        try {
            list = [
                {
                    min_amount:'0.01',
                    max_amount:'250,000.00',
                    rate:'0.00'
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

    renderItem = ({item, index}) => (
        <Card>
            <Row ar>
                <Text center md>{item.min_amount} - {item.max_amount}</Text>
                <Text center md>{item.rate}</Text>
            </Row>
        </Card>
    )

    render() {

        const {list, loading, refreshing, error, showMenu} = this.state

        return (
            <View style={{flex:1,backgroundColor:Colors.gray}}>
                <View style={style.bar}>
                    <Text b light center>{_('40')}</Text>
                    <Text b light center>{_('27')}</Text>
                </View>
            
                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    style={{paddingHorizontal:Metrics.md}}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    bar: {
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:Colors.black,
        paddingVertical:Metrics.md,
        paddingHorizontal:Metrics.md + Metrics.rg
    }
})

export default CashoutRatesScreen