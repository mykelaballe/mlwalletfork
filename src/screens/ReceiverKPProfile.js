import React from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Text, Row, Button, HeaderRight, StaticInput, Outline, Switch} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
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
                    <Menu.Item onPress={params.handleEdit} title='Edit Receiver' />
                    <Menu.Item onPress={params.handleDelete} title="Delete Receiver" />
                </Menu>
            )
        }
    }

    state = {
        is_favorite:false
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
                receiver:{
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

    handleConfirmDelete = () => {
        const {walletno} = this.props.user
        const {index, receiver} = this.props.navigation.state.params
        try {
            this.props.deleteReceiver(index)
            API.deleteKPReceiver({
                walletno,
                receiverNumVal:receiver.receiverno
            })
            this.props.navigation.navigate('SavedKPReceivers',{removeAtIndex:index})
            Say.ok('Receiver successfully deleted')
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    handleEdit = () => {
        const {navigate, state} = this.props.navigation
        const {index, receiver} = state.params
        this.handleToggleMenu()
        navigate('UpdateKPReceiver',{index, receiver})
    }

    handleSelect = () => {
        let {navigation: {navigate, state: {params: {receiver}}}} = this.props
        receiver.middlename = receiver.middlename || 'WAIVED'
        receiver.suffix = receiver.suffix || 'NONE'
        navigate('SendKP',{receiver})
    }

    handleToggleFavorite = () => {
        const {walletno} = this.props.user
        let {index, receiver} = this.props.navigation.state.params
        const {is_favorite} = this.state
        
        try {
            let payload = {
                walletno,
                receiverno:receiver.receiverno
            }

            this.props.updateReceiver(index, {
                ...receiver,
                is_favorite:!is_favorite
            })

            if(is_favorite) API.removeFavoriteKPReceiver(payload)
            else API.addFavoriteKPReceiver(payload)
            
            this.setState({is_favorite:!is_favorite})
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    render() {

        const {firstname, middlename, lastname, suffix, ContactNo} = this.props.navigation.state.params.receiver
        const {is_favorite} = this.state

        return (
            <>
                <Screen>
                    <StaticInput
                        label='First Name'
                        value={firstname}
                    />

                    <StaticInput
                        label='Middle Name'
                        value={middlename || _('50')}
                    />

                    <StaticInput
                        label='Last Name'
                        value={lastname}
                    />

                    <StaticInput
                        label='Suffix'
                        value={suffix || _('51')}
                    />

                    <StaticInput
                        label='Contact No.'
                        value={ContactNo}
                    />

                    <Outline>
                        <Row bw>
                            <Text>{is_favorite ? 'Remove from' : 'Add to'} favorite</Text>
                            <Switch value={is_favorite} onValueChange={this.handleToggleFavorite} />
                        </Row>
                    </Outline>
                </Screen>

                <Footer>
                    <Button t={_('82')} onPress={this.handleSelect} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user:state.user.data,
    ...state.kp
})

const mapDispatchToProps = dispatch => ({
    deleteReceiver:deletedIndex => dispatch(Creators.deleteKPReceiver(deletedIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)