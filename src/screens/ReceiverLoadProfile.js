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
            headerRight:params.from !== 'recent' ? (
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
            ) : null
        }
    }

    state = {
        ...this.props.navigation.state.params.receiver,
        deleting:false,
        favoriting:false
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
            this.props.updateReceiver(null)
            this.setState({...newProp})
        }
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
        const {receiverno, deleting} = this.state

        if(deleting) return false

        try {
            this.setState({deleting:true})

            await API.deleteELoadReceiver({receiverno})
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

    handleEdit = () => {
        this.handleToggleMenu()
        this.props.navigation.navigate('UpdateLoadReceiver',{receiver:this.state})
    }

    handleSelect = () => this.props.navigation.navigate('BuyLoad',{receiver:this.state})

    handleToggleFavorite = async () => {
        const {receiverno, isFavorite, favoriting} = this.state

        if(favoriting) return false
        
        try {
            this.setState({favoriting:true})

            let payload = {
                receiverno
            }

            if(isFavorite) await API.removeFavoriteELoadReceiver(payload)
            else await API.addFavoriteELoadReceiver(payload)

            this.props.refreshAll(true)
            this.props.refreshFavorites(true)
            this.props.refreshRecent(true)
            
            this.setState({isFavorite:!isFavorite})
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({favoriting:false})
    }

    render() {

        const {params = {}} = this.props.navigation.state
        const {mobileno, fullname, isFavorite, deleting, favoriting} = this.state

        return (
            <>
                <Screen>

                    <StaticInput
                        label='Contact No.'
                        value={Func.formatToPHMobileNumberFull(mobileno)}
                    />

                    <StaticInput
                        label='Name/Nickname'
                        value={Func.cleanName(fullname)}
                    />

                    {params.from !== 'recent' &&
                    <Outline>
                        <Row bw>
                            <Text>{isFavorite ? 'Remove from' : 'Add to'} favorite</Text>
                            <Switch disabled={deleting} value={isFavorite} onValueChange={this.handleToggleFavorite} loading={favoriting} />
                        </Row>
                    </Outline>
                    }
                </Screen>

                <Footer>
                    <Button disabled={deleting} t={deleting ? _('91') : _('82')} onPress={this.handleSelect} loading={deleting} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data,
    ...state.eLoad
})

const mapDispatchToProps = dispatch => ({
    updateReceiver:newProp => dispatch(Creators.updateELoadReceiver(newProp)),
    refreshAll:refresh => dispatch(Creators.refreshELoadAllReceivers(refresh)),
    refreshFavorites:refresh => dispatch(Creators.refreshELoadFavorites(refresh)),
    refreshRecent:refresh => dispatch(Creators.refreshELoadRecent(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)