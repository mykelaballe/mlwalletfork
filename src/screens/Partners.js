import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {SectionList, Text, Spacer, HR, Ripple, SearchInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.data)} style={style.item}>
            <Text md>{props.data.name}</Text>
        </Ripple>
        <HR />
    </>
)

class Scrn extends React.Component {

    static navigationOptions = {
        title:"Partner's Name"
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
                            id:1,
                            name:'Able Services',
                        },
                        {
                            id:2,
                            name:'ACF International'
                        },
                        {
                            id:3,
                            name:'Asia United Bank'
                        }
                    ]
                },
                {
                    letter:'B',
                    data:[
                        {
                            id:4,
                            name:'Bank Albilad',
                        },
                        {
                            id:5,
                            name:'Bank of Commerce'
                        },
                        {
                            id:6,
                            name:'BC Remit'
                        },
                        {
                            id:7,
                            name:'BDO'
                        },
                        {
                            id:8,
                            name:'BIBO Global Inc.'
                        }
                    ]
                },
            ]
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            list,
            loading:false
        })
    }

    handleSelect = partner => this.props.navigation.navigate('ReceiveMoneyInternational',{partner})

    handleChangeSearch = search => this.setState({search})

    renderSectionHeader = ({section}) => (
        <View style={style.itemHeader}>
            <Text mute>{section.letter}</Text>
        </View>
    )

    renderItem = ({item, index}) => <ItemUI index={index} data={item} onPress={this.handleSelect} />

    render() {

        const {list, search, loading} = this.state

        return (
            <View style={style.container}>
                <SearchInput
                    placeholder="Search Partner's Name"
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
        backgroundColor:Colors.lightgray,
        padding:Metrics.rg,
    },
    item: {
        padding:Metrics.rg
    }
})

export default Scrn