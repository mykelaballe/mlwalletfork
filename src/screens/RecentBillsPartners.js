import React from 'react'
import {InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, FlatList, Spacer, SearchInput, ListItem} from '../components'
import {_, Say} from '../utils'
import {API} from '../services'

const ItemUI = props => (
    <ListItem
        primaryText={props.data.partner}
        subText={props.data.account_no}
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
        if(this.props.refreshRecent) {
            this.props.refreshScreen(false)
            this.handleRefresh()
        }
    }

    getData = async () => {
        const {walletno} = this.props.user
        let list = []

        try {
            list = await API.getRecentBillers(walletno)

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

    handleViewReceiver = index => {
        let {list} = this.state
        list[index].bankname = list[index].partner
        list[index].old_partnersid = list[index].partnersid
        list[index].old_account_no = list[index].account_no
        list[index].old_account_name = list[index].account_name
        this.props.navigation.navigate('BillerProfile',{index, biller:list[index]})
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    handleAddReceiver = () => this.props.navigation.navigate('AddLoadReceiver')

    handleChangeSearch = search => this.setState({search:this.search(search)})

    search = searchText => {
        const list = this.listHolder.filter(item => item.partner.toUpperCase().indexOf(searchText.toUpperCase()) > -1)
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
    ...state.billsPayment
})

const mapDispatchToProps = dispatch => ({
    refreshScreen:refresh => dispatch(Creators.refreshBillersRecent(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)