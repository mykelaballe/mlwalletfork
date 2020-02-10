import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {Text, Row, Spacer, FlatList, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'

class Rates extends React.Component {

    static navigationOptions = {
        title:'Kwarta Padala Rates'
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
                    max_amount:'800.00',
                    rate:'12.00'
                },
                {
                    min_amount:'800.01',
                    max_amount:'900.00',
                    rate:'15.00'
                },
                {
                    min_amount:'900.01',
                    max_amount:'1000.00',
                    rate:'20.00'
                },
                {
                    min_amount:'1000.01',
                    max_amount:'1500.00',
                    rate:'30.00'
                },
                {
                    min_amount:'1500.01',
                    max_amount:'2000.00',
                    rate:'40.00'
                },
                {
                    min_amount:'2000.01',
                    max_amount:'2500.00',
                    rate:'50.00'
                },
                {
                    min_amount:'2500.01',
                    max_amount:'3000.00',
                    rate:'60.00'
                },
                {
                    min_amount:'3000.01',
                    max_amount:'3500.00',
                    rate:'70.00'
                },
                {
                    min_amount:'3500.01',
                    max_amount:'4000.00',
                    rate:'80.00'
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

    renderItems = ({item, index}) => (
        <Row style={style.item}>
            <Text center style={{flex:1}}>{item.min_amount} - {item.max_amount}</Text>
            <Text center style={{flex:1}}>{item.rate}</Text>
        </Row>
    )

    render() {

        const {list, loading} = this.state

        return (
            <>
                <TopBuffer sm />
                <Row>
                    <Text center b style={{flex:1}}>Amount</Text>
                    <Text center b style={{flex:1}}>Rates</Text>
                </Row>
                <FlatList
                    data={list}
                    renderItem={this.renderItems}
                    loading={loading}
                    initialNumToRender={list.length}
                    style={{paddingTop:Metrics.xl}}
                />
            </>
        )
    }
}

const style = StyleSheet.create({
    item: {
        paddingVertical:Metrics.sm
    }
})

export default Rates