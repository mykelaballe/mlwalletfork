import React from 'react'
import {View, InteractionManager} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, FlatList, ButtonText, Spacer, SearchInput, ListItem} from '../components'
import {Colors} from '../themes'
import {_, Say, Func} from '../utils'
import {API} from '../services'

const ItemUI = props => (
    <ListItem
        primaryText={Func.cleanName(props.data.fullname)}
        subText={Func.formatToPHMobileNumberFull(props.data.mobileno)}
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
        if(this.props.refreshAllReceivers) {
            this.props.refreshScreen(false)
            this.handleRefresh()
        }
    }

    getData = async () => {
        const {walletno} = this.props.user
        this.listHolder = []
        let list = []

        try {
            list = await API.getELoadReceivers(walletno)

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

    handleAddNewReceiver = () => this.props.navigation.navigate('AddLoadReceiver')

    handleViewReceiver = index => {
        const {list} = this.state
        this.props.navigation.navigate('ReceiverLoadProfile',{index, receiver:list[index]})
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    handleAddReceiver = () => this.props.navigation.navigate('AddLoadReceiver')

    handleChangeSearch = search => this.setState({search:this.search(search)})

    search = searchText => {
        const list = this.listHolder.filter(item => item.fullname.toUpperCase().indexOf(searchText.toUpperCase()) > -1)
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

                    <View style={{alignItems:'flex-end'}}>
                        <ButtonText icon='plus' t='Add Receiver' onPress={this.handleAddReceiver} color={Colors.brand} />
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
    ...state.eLoad
})

const mapDispatchToProps = dispatch => ({
    refreshScreen:refresh => dispatch(Creators.refreshELoadAllReceivers(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)