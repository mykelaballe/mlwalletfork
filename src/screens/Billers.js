import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {SectionList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {Searchbar} from 'react-native-paper'

const ItemUI = props => (
    <Ripple onPress={() => props.onPress(props.data)} style={style.item}>
        <Text md>{props.data.name}</Text>
    </Ripple>
)

class Billers extends React.Component {

    static navigationOptions = {
        title:'Billers'
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
                    letter:'A',
                    data:[
                        {
                            name:'A2M Global Distribution Inc.',
                        },
                        {
                            name:'ABOEX Travel and Tours'
                        },
                        {
                            name:'AT Service Limited'
                        }
                    ]
                },
                {
                    letter:'B',
                    data:[
                        {
                            name:'BDMPC',
                        },
                        {
                            name:'BIGSTART Travel and VISA Assistance'
                        },
                        {
                            name:'Bohol Lights Inc.'
                        },
                        {
                            name:'BPI'
                        },
                        {
                            name:'Buenavista CATV Inc.'
                        }
                    ]
                },
            ]
        }
        catch(err) {

        }

        this.setState({
            list,
            loading:false
        })
    }

    handleSelectBiller = biller => {
        const {state, navigate, pop} = this.props.navigation
        const {category} = state.params

        if(category) navigate('PayBill',{biller})
        else pop()
    }

    handleChangeSearch = search => this.setState({search})

    renderSectionHeader = ({section}) => (
        <View style={style.itemHeader}>
            <Text xl b>{section.letter}</Text>
        </View>
    )

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleSelectBiller} />

    render() {

        const {list, search, loading} = this.state

        return (
            <View style={style.container}>
                <Searchbar
                    placeholder='Search'
                    onChangeText={this.handleChangeSearch}
                    value={search}
                />

                <Spacer />

                <SectionList
                    sections={list}
                    renderSectionHeader={this.renderSectionHeader}
                    renderItem={this.renderItem}
                    loading={loading}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    },
    itemHeader: {
        ...StyleSheet.absoluteFill
    },
    item: {
        marginLeft:50,
        padding:Metrics.rg
    }
})

export default Billers