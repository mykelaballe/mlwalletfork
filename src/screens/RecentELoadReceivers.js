import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, FlatList, Initial, Text, Row, Button, Spacer, HR, Ripple, SearchInput} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.index)} style={style.item}>
            <Row>
                <Initial text={props.data.fullname} />
                <Spacer h sm />
                <View>
                    <Text b>{props.data.walletno}</Text>
                    <Text>{props.data.fullname}</Text>
                </View>
            </Row>
        </Ripple>

        <HR m={Metrics.sm} />
    </>
)

class Scrn extends React.Component {

    static navigationOptions = {
        title:_('84')
    }

    state = {
        list:[],
        search:'',
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    componentDidUpdate = (prevProps, prevState) => {
        const {newReceiver, deletedIndex, addReceiver, deleteReceiver} = this.props
        if(newReceiver) {
            addReceiver(null)
            let list = prevState.list.slice()
            list.push(newReceiver)
            this.setState({list})
        }

        if(deletedIndex !== null) {
            deleteReceiver(null)
            let list = this.state.list.slice()
            list.splice(deletedIndex,1)
            this.setState({list})
        }
    }

    getData = async () => {
        const {walletno} = this.props.user
        let list = []

        try {
            list = await API.getRecentELoadReceivers(walletno)
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

    handleAddNewReceiver = () => this.props.navigation.navigate('AddWalletReceiver')

    handleViewReceiver = index => {
        const {list} = this.state
        this.props.navigation.navigate('ReceiverWalletProfile',{index, receiver:list[index]})
    }

    handleChangeSearch = search => this.setState({search})

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderItem = ({item, index}) => <ItemUI index={index} data={item} onPress={this.handleViewReceiver} />

    render() {

        const {list, search, loading, refreshing} = this.state

        return (
            <>
                <Screen ns>
                    <SearchInput
                        onChangeText={this.handleChangeSearch}
                        value={search}
                    />

                    <Spacer sm />

                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                        loading={loading}
                        refreshing={refreshing}
                        onRefresh={this.handleRefresh}
                        placeholder={{}}
                    />
                </Screen>
            </>
        )
    }
}

const style = StyleSheet.create({
    item: {
        padding:Metrics.rg
    }
})

const mapStateToProps = state => ({
    user: state.user.data,
    ...state.walletToWallet
})

const mapDispatchToProps = dispatch => ({
    addReceiver:newReceiver => dispatch(Creators.addWalletReceiver(newReceiver)),
    deleteReceiver:deletedIndex => dispatch(Creators.deleteWalletReceiver(deletedIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)