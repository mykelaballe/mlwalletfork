import React from 'react'
import {View, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, FlatList, Spacer, SearchInput, ListItem, ButtonText} from '../components'
import {_, Say} from '../utils'
import {Colors} from '../themes'
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
        if(this.props.refreshAllBillers) {
            this.props.refreshScreen(false)
            this.handleRefresh()
        }
    }

    getData = async () => {
        const {walletno} = this.props.user
        this.listHolder = []
        let list = []

        try {
            list = await API.getBankPartners({walletno, isRTA:0})

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
        const {list} = this.state
        this.props.navigation.navigate('BillerProfile',{index, biller:list[index]})
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    handleChangeSearch = search => this.setState({search:this.search(search)})

    search = searchText => {
        const list = this.listHolder.filter(item => item.bankname.toUpperCase().indexOf(searchText.toUpperCase()) > -1)
        this.setState({list})
    }

    handleAddBiller = () => this.props.navigation.navigate('Billers')

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

                    <View style={{alignItems:'flex-end'}}>
                        <ButtonText icon='plus' t='Add Biller' onPress={this.handleAddBiller} color={Colors.brand} />
                    </View>

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
    refreshScreen:refresh => dispatch(Creators.refreshBillersAll(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)