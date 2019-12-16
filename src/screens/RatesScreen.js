import React from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import {Text, Button, Row, Card} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'

class RatesScreen extends React.Component {

    static navigationOptions = {
        title:'send kp'
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
                    max_amount:'50.00',
                    rate:'0.50'
                },
                {
                    min_amount:'50.01',
                    max_amount:'100.00',
                    rate:'1.00'
                },
                {
                    min_amount:'100.01',
                    max_amount:'300.00',
                    rate:'2.00'
                },
                {
                    min_amount:'300.01',
                    max_amount:'400.00',
                    rate:'3.00'
                },
                {
                    min_amount:'400.01',
                    max_amount:'500.00',
                    rate:'5.00'
                },
                {
                    min_amount:'500.01',
                    max_amount:'600.00',
                    rate:'8.00'
                },
                {
                    min_amount:'600.01',
                    max_amount:'700.00',
                    rate:'10.00'
                },
                {
                    min_amount:'700.01',
                    max_amount:'900.00',
                    rate:'12.00'
                },
                {
                    min_amount:'900.01',
                    max_amount:'1,000.00',
                    rate:'15.00'
                },
                {
                    min_amount:'1,000.01',
                    max_amount:'1,500.00',
                    rate:'20.00'
                },
                {
                    min_amount:'1,500.01',
                    max_amount:'2,000.00',
                    rate:'30.00'
                },
                {
                    min_amount:'2,000.01',
                    max_amount:'2,500.00',
                    rate:'40.00'
                },
                {
                    min_amount:'2,500.01',
                    max_amount:'2,800.00',
                    rate:'50.00'
                },
                {
                    min_amount:'2,800.01',
                    max_amount:'3,000.00',
                    rate:'55.00'
                },
                {
                    min_amount:'3,000.01',
                    max_amount:'3,500.00',
                    rate:'65.00'
                },
                {
                    min_amount:'3,500.01',
                    max_amount:'4,000.00',
                    rate:'75.00'
                },
                {
                    min_amount:'4,000.01',
                    max_amount:'5,000.00',
                    rate:'95.00'
                },
                {
                    min_amount:'5,000.01',
                    max_amount:'6,000.00',
                    rate:'120.00'
                },
                {
                    min_amount:'6,000.01',
                    max_amount:'7,000.00',
                    rate:'130.00'
                },
                {
                    min_amount:'7,000.01',
                    max_amount:'8,000.00',
                    rate:'140.00'
                },
                {
                    min_amount:'8,000.01',
                    max_amount:'9,500.00',
                    rate:'150.00'
                },
                {
                    min_amount:'9,500.01',
                    max_amount:'10,000.00',
                    rate:'225.00'
                },
                {
                    min_amount:'10,000.01',
                    max_amount:'14,000.00',
                    rate:'250.00'
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

export default RatesScreen