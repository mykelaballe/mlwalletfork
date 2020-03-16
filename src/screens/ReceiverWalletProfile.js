import React from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Screen, Footer, Text, Button, Spacer, HeaderRight, Outline} from '../components'
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
                    <Menu.Item onPress={params.handleDelete} title="Delete Receiver" />
                </Menu>
            )
        }
    }

    componentDidMount = () => {
        this.props.navigation.setParams({
            menuOpen:false,
            handleToggleMenu:this.handleToggleMenu,
            handleEdit:this.handleEdit,
            handleDelete:this.handleDelete
        })
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
        const {index, receiver} = this.props.navigation.state.params
        try {
            this.props.deleteReceiver(index)
            API.deleteWalletReceiver({
                walletno:receiver.receiverno
            })
            this.props.navigation.navigate('SavedWalletReceivers')
            Say.some('Receiver successfully deleted')
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    handleEdit = () => {
        const {navigate, state} = this.props.navigation
        const {receiver} = state.params
        this.handleToggleMenu()
        navigate('UpdateWalletReceiver',{receiver})
    }

    handleSelect = () => {
        const {navigation: {navigate, state: {params: {receiver}}}} = this.props
        navigate('SendWalletToWallet',{receiver})
    }

    render() {

        const {walletno, fullname} = this.props.navigation.state.params.receiver

        return (
            <>
                <Screen>
                    <Outline>
                        <Text mute sm>Wallet Account Number</Text>
                        <Text md>{walletno}</Text>
                    </Outline>

                    <Spacer sm />

                    <Outline>
                        <Text mute sm>Full Name</Text>
                        <Text>{fullname}</Text>
                    </Outline>
                </Screen>

                <Footer>
                    <Button t={_('82')} onPress={this.handleSelect} />
                </Footer>
            </>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    deleteReceiver:deletedIndex => dispatch(Creators.deleteWalletReceiver(deletedIndex))
})

export default connect(null, mapDispatchToProps)(Scrn)