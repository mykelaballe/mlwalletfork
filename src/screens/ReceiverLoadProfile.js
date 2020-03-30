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
                    <Menu.Item onPress={params.handleEdit} title='Edit Receiver' />
                    <Menu.Item onPress={params.handleDelete} title="Delete Receiver" />
                </Menu>
            )
        }
    }

    state = {
        is_favorite:this.props.navigation.state.params.receiver.is_favorite
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
            API.deleteELoadReceiver({receiverno:receiver.receiverno})
            this.props.navigation.pop()
            Say.ok('Receiver successfully deleted')
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    handleEdit = () => {
        const {navigate, state} = this.props.navigation
        const {receiver} = state.params
        this.handleToggleMenu()
        navigate('UpdateLoadReceiver',{receiver})
    }

    handleSelect = () => {
        const {navigation: {navigate, state: {params: {receiver}}}} = this.props
        navigate('BuyLoad',{receiver})
    }

    handleToggleFavorite = () => {
        let {index, receiver} = this.props.navigation.state.params
        const {is_favorite} = this.state
        
        try {
            let payload = {
                receiverno:receiver.receiverno
            }

            /*this.props.updateReceiver(index, {
                ...receiver,
                is_favorite:!is_favorite
            })*/

            if(is_favorite) API.removeFavoriteELoadReceiver(payload)
            else API.addFavoriteELoadReceiver(payload)
            
            this.setState({is_favorite:!is_favorite})
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    render() {

        const {mobileno, fullname} = this.props.navigation.state.params.receiver
        const {is_favorite} = this.state

        return (
            <>
                <Screen>

                    <StaticInput
                        label='Contact No.'
                        value={mobileno}
                    />

                    <StaticInput
                        label='Full Name'
                        value={Func.cleanName(fullname)}
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
    user: state.user.data
})

const mapDispatchToProps = dispatch => ({
    updateReceiver:(receiverIndex, newProp) => dispatch(Creators.updateELoadReceiver(receiverIndex, newProp)),
    deleteReceiver:deletedIndex => dispatch(Creators.deleteELoadReceiver(deletedIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)