import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {FlatList, Icon, Text, Row, Spacer, HR} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'Notification'
    }

    state = {
        list:[],
        loading:true,
        refreshing:false,
        start:0
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {walletno} = this.props.user
        const {start} = this.state
        let list = []

        try {
            list = await API.getNotifications({
                walletno,
                start
            })
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            list,
            loading:false,
            refreshing:false
        })
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderItem = ({item}) => (
        <>
            <Row style={style.item}>
                <Icon name='send_money' size={50} />
                
                <Spacer h />
                
                <View style={{flex:1}}>
                    <Text md>{item.message}</Text>
                    <Text sm mute>{moment(item.date).format('D MMM YYYY h:mma')}</Text>
                </View>
            </Row>
            
            <HR />
        </>
    )

    render() {

        const {list, loading, refreshing} = this.state

        return (
            <FlatList
                data={list}
                renderItem={this.renderItem}
                loading={loading}
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
                placeholder={{}}
            />
        )
    }
}

const style = StyleSheet.create({
    item: {
        padding:Metrics.rg
    }
})

mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)