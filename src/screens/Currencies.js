import React from 'react'
import {StyleSheet, InteractionManager} from 'react-native'
import {FlatList, Text, Row, HR, Ripple} from '../components'
import {Metrics} from '../themes'
import {_, Say, Consts} from '../utils'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.data)} style={style.item}>
            <Row bw>
                <Text mute md>{props.data.name}</Text>
                <Text b md>{props.data.abbr}</Text>
            </Row>
        </Ripple>

        <HR m={Metrics.sm} />
    </>
)

class Currencies extends React.Component {

    static navigationOptions = {
        title:'Currency'
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
                    name:'Philippine Peso',
                    abbr:Consts.currency.PH,
                },
                {
                    name:'Australian Dollar',
                    abbr:'AUD',
                },
                {
                    name:'Bahraini Dinar',
                    abbr:'BHD'
                },
                {
                    name:'Europian Euro',
                    abbr:'EUR'
                },
                {
                    name:'Pound Sterling',
                    abbr:'GBP'
                },
                {
                    name:'United States Dollar',
                    abbr:'USD'
                }
            ]
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            list,
            loading:false
        })
    }

    handleSelect = currency => this.props.navigation.navigate('ReceiveMoneyInternational',{currency})

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

export default Currencies