import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {FlatList, Avatar, Text, Row, Spacer, HR} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'Notification'
    }

    state = {
        list:[],
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {walletno} = this.props.user
        let list = []

        try {
            list = await API.getNotifications({walletno})
        }
        catch(err) {
            Say.err(_('500'))
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
                <Avatar source={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToFBuZc9tvkOlcKAIKFA_D3PCLFc9w0X6wyH_ED8LD3lXNEnib&s'} />
                <Spacer h />
                <View style={{flex:1}}>
                    <Text md>{item.message}</Text>
                    <Text sm mute>{item.date}</Text>
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