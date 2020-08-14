import React from 'react'
import {InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, FlatList, Spacer, SearchInput, ListItem} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

const ItemUI = props => (
    <ListItem
        primaryText={props.data.bankname}
        subText={props.data.old_account_no}
        onPress={() => props.onPress(props.index)}
    />
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
        if(this.props.refreshFavorites) {
            this.props.refreshScreen(false)
            this.handleRefresh()
        }
    }

    getData = async () => {
        const {walletno} = this.props.user
        let list = []

        try {
            list = await API.getFavoriteBankPartners({walletno, isRTA:1})

            this.listHolder = list
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

    handleAddNewReceiver = () => this.props.navigation.navigate('AddWalletReceiver')

    handleViewReceiver = index => {
        const {list} = this.state
        this.props.navigation.navigate('BankPartnerProfile',{index, receiver:list[index]})
    }

    handleChangeSearch = search => this.setState({search:this.search(search)})

    search = searchText => {
        const list = this.listHolder.filter(item => item.bankname.toUpperCase().indexOf(searchText.toUpperCase()) > -1)
        this.setState({list})
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    handleAddReceiver = () => this.props.navigation.navigate('AddWalletReceiver')

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
                        skeleton='a'
                    />
                </Screen>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data,
    ...state.bankTransfer
})

const mapDispatchToProps = dispatch => ({
    refreshScreen:refresh => dispatch(Creators.refreshBankFavorites(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)