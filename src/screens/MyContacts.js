import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {SectionList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, Avatar, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {Searchbar} from 'react-native-paper'

const ItemUI = props => (
    <Ripple onPress={() => props.onPress(props.data)} style={style.item}>
        <Row>
            <Avatar source={null} />
            <Spacer h sm />
            <Text md>{props.data.name}</Text>
        </Row>
    </Ripple>
)

class MyContacts extends React.Component {

    static navigationOptions = {
        title:'My Contacts'
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
                    letter:'J',
                    data:[
                        {
                            name:'John Doe',
                        },
                        {
                            name:'Jane Smith'
                        }
                    ]
                },
                {
                    letter:'M',
                    data:[
                        {
                            name:'Mary Thomas',
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

    handleSelect = contact => this.props.navigation.navigate('MyContactProfile',{contact})

    handleChangeSearch = search => this.setState({search})

    renderSectionHeader = ({section}) => (
        <View style={style.itemHeader}>
            <Text xl b>{section.letter}</Text>
        </View>
    )

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleSelect} />

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

export default MyContacts