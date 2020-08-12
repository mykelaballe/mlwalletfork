import React from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Text, Button, HeaderRight, Outline, StaticInput, Switch, Row} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say, Func} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/Ionicons'
import {Menu} from 'react-native-paper'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title:'Saved Receiver',
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
                    <Menu.Item onPress={params.handleDelete} title="Delete Receiver" />
                </Menu>
            )
        }
    }

    state = {
        is_favorite:this.props.navigation.state.params.receiver.isFavorite,
        deleting:false,
        favoriting:false
    }

    componentDidMount = () => {
        this.props.navigation.setParams({
            menuOpen:false,
            handleToggleMenu:this.handleToggleMenu,
            handleDelete:this.handleDelete
        })
    }

    handleToggleMenu = () => {
        const {deleting} = this.state
        let {menuOpen} = this.props.navigation.state.params

        if(deleting) return false

        menuOpen = !menuOpen
        this.props.navigation.setParams({menuOpen})
    }

    handleDelete = () => {
        this.handleToggleMenu()
        Say.ask(
            'You are about to delete a receiver. This action cannot be undone',
            null,
            {
                onConfirm:this.handleConfirmDelete
            }
        )
    }

    handleConfirmDelete = async () => {
        const {index, receiver, deleting} = this.props.navigation.state.params

        if(deleting) return false

        try {
            this.setState({deleting:true})

            await API.deleteWalletReceiver({receiverno:receiver.receiverno})
            this.props.refreshAll(true)
            this.props.refreshFavorites(true)
            this.props.refreshRecent(true)
            this.props.navigation.pop()
            Say.ok('Receiver successfully deleted')
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({deleting:false})
    }

    handleSelect = () => {
        const {navigation: {navigate, state: {params: {receiver}}}} = this.props
        navigate('SendWalletToWallet',{receiver})
    }

    handleToggleFavorite = async () => {
        const {walletno} = this.props.user
        let {index, receiver} = this.props.navigation.state.params
        const {is_favorite, favoriting} = this.state

        if(favoriting) return false
        
        try {
            this.setState({favoriting:true})

            let payload = {
                walletno,
                receiverno:receiver.receiverno,
            }

            if(is_favorite) await API.removeFavoriteWalletReceiver(payload)
            else await API.addFavoriteWalletReceiver(payload)

            this.props.refreshAll(true)
            this.props.refreshFavorites(true)
            
            this.setState({is_favorite:!is_favorite})
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({favoriting:false})
    }

    render() {

        const {walletno, fullname} = this.props.navigation.state.params.receiver
        const {is_favorite, deleting, favoriting} = this.state

        return (
            <>
                <Screen>
                    <StaticInput
                        label={_('90')}
                        value={Func.formatWalletNo(walletno)}
                    />

                    <StaticInput
                        label='Full Name'
                        value={Func.cleanName(fullname)}
                    />

                    <Outline>
                        <Row bw>
                            <Text>{is_favorite ? 'Remove from' : 'Add to'} favorite</Text>
                            <Switch disabled={deleting} value={is_favorite} onValueChange={this.handleToggleFavorite} loading={favoriting} />
                        </Row>
                    </Outline>
                </Screen>

                <Footer>
                    <Button disabled={deleting} t={deleting ? _('91') : _('82')} onPress={this.handleSelect} loading={deleting} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updateReceiver:(receiverIndex, newProp) => dispatch(Creators.updateWalletReceiver(receiverIndex, newProp)),
    deleteReceiver:deletedIndex => dispatch(Creators.deleteWalletReceiver(deletedIndex)),
    refreshAll:refresh => dispatch(Creators.refreshWalletAllReceivers(refresh)),
    refreshFavorites:refresh => dispatch(Creators.refreshWalletFavorites(refresh)),
    refreshRecent:refresh => dispatch(Creators.refreshWalletRecent(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)