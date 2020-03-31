import React from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Button, StaticInput, HeaderRight, Outline, Switch, Row, Text} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'
import {Menu} from 'react-native-paper'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title:'Saved Bank Account',
            headerRight:(
                <Menu
                    visible={params.menuOpen}
                    onDismiss={params.handleToggleMenu}
                    anchor={
                    <HeaderRight>
                        <TouchableOpacity onPress={params.handleToggleMenu}>
                            <Icon name='ios-more' color={Colors.light} size={Metrics.icon.rg} />
                        </TouchableOpacity>
                    </HeaderRight>
                    }
                >
                    <Menu.Item onPress={params.handleEdit} title='Edit Bank Account' />
                    <Menu.Item onPress={params.handleDelete} title="Delete Bank Account" />
                </Menu>
            )
        }
    }

    state = {
        is_favorite:this.props.navigation.state.params.receiver.isFavorite
    }

    componentDidMount = () => {
        this.props.navigation.setParams({
            menuOpen:false,
            handleToggleMenu:this.handleToggleMenu,
            handleEdit:this.handleEdit,
            handleDelete:this.handleDelete
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {newProp} = this.props
        if(newProp) {
            this.props.navigation.setParams({
                bank:{
                    ...this.props.navigation.state.params.receiver,
                    ...newProp
                }
            })
        }
    }

    handleToggleMenu = () => {
        let {menuOpen} = this.props.navigation.state.params
        menuOpen = !menuOpen
        this.props.navigation.setParams({menuOpen})
    }

    handleEdit = () => {
        const {navigate, state} = this.props.navigation
        const {index, receiver} = state.params
        this.handleToggleMenu()
        navigate('UpdateBankPartner',{index, bank:receiver})
    }

    handleDelete = () => {
        this.handleToggleMenu()
        Say.ask(
            'You are about to delete a bank partner. This action cannot be undone',
            null,
            {
                onConfirm:this.handleConfirmDelete
            }
        )
    }

    handleConfirmDelete = async () => {
        const {walletno} = this.props.user
        const {index, receiver} = this.props.navigation.state.params
        try {
            //this.props.deletePartner(index)
            await API.deleteBankPartner({
                walletno,
                partnersid:receiver.old_partnersid,
                accountid:receiver.old_account_no,
                account_name:receiver.old_account_name
            })
            this.props.refreshAll(true)
            this.props.refreshFavorites(true)
            this.props.navigation.pop()
            //this.props.navigation.navigate('SavedBankPartners',{removeAtIndex:index})
            Say.ok('Partner successfully deleted')
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    handleSelect = () => {
        const {navigation: {navigate, state: {params: {receiver}}}} = this.props
        this.props.navigation.navigate('SendBankTransfer',{bank:receiver})
    }

    handleToggleFavorite = async () => {
        const {walletno} = this.props.user
        let {index, receiver} = this.props.navigation.state.params
        const {is_favorite} = this.state
        
        try {
            let payload = {
                walletno,
                partnersname:receiver.bankname,
                partnersid:receiver.old_partnersid,
                accountid:receiver.old_account_no
            }

            /*this.props.updateReceiver(index, {
                ...receiver,
                is_favorite:!is_favorite
            })*/

            if(is_favorite) await API.removeFavoriteBankPartner(payload)
            else await API.addFavoriteBankPartner(payload)

            this.props.refreshAll(true)
            this.props.refreshFavorites(true)
            
            this.setState({is_favorite:!is_favorite})
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    render() {

        const {bankname, old_account_name, old_account_no} = this.props.navigation.state.params.receiver
        const {is_favorite} = this.state

        return (
            <>
                <Screen>
                    <StaticInput
                        label='Bank Name'
                        value={bankname}
                    />

                    <StaticInput
                        label='Account Name'
                        value={old_account_name}
                    />

                    <StaticInput
                        label='Account No.'
                        value={old_account_no}
                    />
                    
                    <Outline>
                        <Row bw>
                            <Text>{is_favorite ? 'Remove from' : 'Add to'} favorite</Text>
                            <Switch value={is_favorite} onValueChange={this.handleToggleFavorite} />
                        </Row>
                    </Outline>
                </Screen>

                <Footer>
                    <Button t='Select Bank Account' onPress={this.handleSelect} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data,
    ...state.bankTransfer
})

const mapDispatchToProps = dispatch => ({
    deletePartner:deletedIndex => dispatch(Creators.deleteBankPartner(deletedIndex)),
    refreshAll:refresh => dispatch(Creators.refreshBankAllPartners(refresh)),
    refreshFavorites:refresh => dispatch(Creators.refreshBankFavorites(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)