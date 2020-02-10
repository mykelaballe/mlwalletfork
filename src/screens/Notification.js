import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {FlatList, Avatar, Text, Row, Spacer, HR} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'

class Notification extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'Notification'
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
                    description:'You received a payment of PHP200.00 from Ashley',
                    date:'02:58PM'
                },
                {
                    description:'You received a payment of PHP100.00 from Ashley',
                    date:'Yesterday'
                },
                {
                    description:'Congratulations! You are now fully verified',
                    date:'January 10, 2020'
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

    renderItem = ({item}) => (
        <>
            <Row style={style.item}>
                <Avatar source={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToFBuZc9tvkOlcKAIKFA_D3PCLFc9w0X6wyH_ED8LD3lXNEnib&s'} />
                <Spacer h />
                <View style={{flex:1}}>
                    <Text md>{item.description}</Text>
                    <Text sm mute>{item.date}</Text>
                </View>
            </Row>
            
            <HR />
        </>
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

const style = StyleSheet.create({
    item: {
        padding:Metrics.rg
    }
})

export default Notification