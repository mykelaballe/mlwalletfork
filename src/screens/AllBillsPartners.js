import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, FlatList, Initial, Text, Row, ButtonText, Spacer, HR, Ripple, SearchInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Func} from '../utils'
import {API} from '../services'

const ItemUI = props => (
    <>
        <Ripple onPress={() => props.onPress(props.index)} style={style.item}>
            <Row>
                <Initial text={props.data.bill_partner_name} />
                <Spacer h sm />
                <View>
                    <Text b>{props.data.bill_partner_name}</Text>
                    <Text>{props.data.account_name}</Text>
                </View>
            </Row>
        </Ripple>

        <HR m={Metrics.sm} />
    </>
)

class Scrn extends React.Component {

    static navigationOptions = {
        title:_('87')
    }

    state = {
        list:[],
        search:'',
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    componentDidUpdate = (prevProps, prevState) => {
        /*const {newReceiver, deletedIndex, addReceiver, deleteReceiver} = this.props
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
        }*/
    }

    getData = async () => {
        const {walletno} = this.props.user
        let list = []

        try {
            list = await API.getBillers(walletno)

            this.listHolder = list
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

    handleViewReceiver = index => {
        const {list} = this.state
        this.props.navigation.navigate('BillerProfile',{index, biller:list[index]})
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    //handleAddReceiver = () => this.props.navigation.navigate('AddBiller')

    handleChangeSearch = search => this.setState({search:this.search(search)})

    search = searchText => {
        const list = this.listHolder.filter(item => item.bill_partner_name.toUpperCase().indexOf(searchText.toUpperCase()) > -1)
        this.setState({list})
    }

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

                    {/*<Spacer sm />

                    <View style={{alignItems:'flex-end'}}>
                        <ButtonText icon='plus' t='Add Biller' onPress={this.handleAddReceiver} color={Colors.brand} />
                    </View>*/}

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