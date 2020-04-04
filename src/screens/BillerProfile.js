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
            title:'Saved Biller',
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
                    <Menu.Item onPress={params.handleEdit} title='Edit Biller' />
                    <Menu.Item onPress={params.handleDelete} title="Delete Biller" />
                </Menu>
            )
        }
    }

    state = {
        ...this.props.navigation.state.params.biller
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
            this.props.updateBiller(null)
            this.setState({...newProp})
        }
    }

    handleToggleMenu = () => {
        let {menuOpen} = this.props.navigation.state.params
        menuOpen = !menuOpen
        this.props.navigation.setParams({menuOpen})
    }

    handleEdit = () => {
        const {navigate, state} = this.props.navigation
        const {biller} = state.params
        this.handleToggleMenu()
        navigate('UpdateBiller',{biller})
    }

    handleDelete = () => {
        this.handleToggleMenu()
        Say.ask(
            'You are about to delete a biller. This action cannot be undone',
            null,
            {
                onConfirm:this.handleConfirmDelete
            }
        )
    }

    handleConfirmDelete = async () => {
        const {walletno} = this.props.user
        const {id} = this.state
        try {
            await API.deleteBiller({
                walletno,
                id
            })
            this.props.refreshAll(true)
            this.props.refreshFavorites(true)
            this.props.refreshRecent(true)
            this.props.navigation.pop()
            Say.ok('Biller successfully deleted')
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    handleSelect = () => this.props.navigation.navigate('PayBill',{biller:this.state})

    handleToggleFavorite = async () => {
        const {walletno} = this.props.user
        const {id, isFavorite} = this.state
        
        try {
            let payload = {
                walletno,
                id
            }

            if(isFavorite) await API.removeFavoriteBiller(payload)
            else await API.addFavoriteBiller(payload)

            this.props.refreshAll(true)
            this.props.refreshFavorites(true)
            this.props.refreshRecent(true)
            
            this.setState({isFavorite:!isFavorite})
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    render() {

        const {partner, account_name, account_no, email, isFavorite} = this.state

        return (
            <>
                <Screen>
                    <StaticInput
                        label='Biller'
                        value={partner}
                    />

                    <StaticInput
                        label='Account Name'
                        value={account_name}
                    />

                    <StaticInput
                        label='Account No.'
                        value={account_no}
                    />

                    <StaticInput
                        label='Email'
                        value={email}
                    />
                    
                    <Outline>
                        <Row bw>
                            <Text>{isFavorite ? 'Remove from' : 'Add to'} favorite</Text>
                            <Switch value={isFavorite} onValueChange={this.handleToggleFavorite} />
                        </Row>
                    </Outline>
                </Screen>

                <Footer>
                    <Button t='Select Biller' onPress={this.handleSelect} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data,
    ...state.billsPayment
})

const mapDispatchToProps = dispatch => ({
    updateBiller:newProp => dispatch(Creators.updateBiller(newProp)),
    refreshAll:refresh => dispatch(Creators.refreshBillersAll(refresh)),
    refreshFavorites:refresh => dispatch(Creators.refreshBillersFavorites(refresh)),
    refreshRecent:refresh => dispatch(Creators.refreshBillersRecent(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)