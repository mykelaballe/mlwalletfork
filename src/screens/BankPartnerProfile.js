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
                    <Menu.Item onPress={params.handleEdit} title='Edit Bank Account' />
                    <Menu.Item onPress={params.handleDelete} title="Delete Bank Account" />
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
            this.props.updatePartner(null)
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

    handleEdit = () => {
        const {navigate, state} = this.props.navigation
        const {index, receiver} = state.params
        this.handleToggleMenu()
        navigate('UpdateBankPartner',{index, bank:this.state})
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
        const {old_partnersid, old_account_no, old_account_name, deleting} = this.state

        if(deleting) return false

        try {
            this.setState({deleting:true})

            await API.deleteBankPartner({
                walletno,
                partnersid:old_partnersid,
                accountid:old_account_no,
                account_name:old_account_name
            })
            this.props.refreshAll(true)
            this.props.refreshFavorites(true)
            this.props.refreshRecent(true)
            this.props.navigation.pop()
            Say.ok('Partner successfully deleted')
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({deleting:false})
    }

    handleSelect = () => this.props.navigation.navigate('SendBankTransfer',{bank:this.state})

    handleToggleFavorite = async () => {
        const {walletno} = this.props.user
        const {bankname, old_partnersid, old_account_no, isFavorite, favoriting} = this.state

        if(favoriting) return false
        
        try {
            this.setState({favoriting:true})

            let payload = {
                walletno,
                partnersname:bankname,
                partnersid:old_partnersid,
                accountid:old_account_no
            }

            let res = {}

            if(isFavorite) res = await API.removeFavoriteBankPartner(payload)
            else res = await API.addFavoriteBankPartner(payload)

            if(res.error) throw new Error()

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
        const {bankname, old_account_name, old_account_no, cAccountFname, cAccountLname, isFavorite, deleting, favoriting} = this.state

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

                    {/*<StaticInput
                        label='Customer First Name'
                        value={cAccountFname}
                    />

                    <StaticInput
                        label='Customer Last Name'
                        value={cAccountLname}
                    />*/}
                    
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
                    <Button disabled={deleting} t={deleting ? _('91') : 'Select Bank Account'} onPress={this.handleSelect} loading={deleting} />
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
    updatePartner:newProp => dispatch(Creators.updateBankPartner(newProp)),
    refreshAll:refresh => dispatch(Creators.refreshBankAllPartners(refresh)),
    refreshFavorites:refresh => dispatch(Creators.refreshBankFavorites(refresh)),
    refreshRecent:refresh => dispatch(Creators.refreshBankRecent(refresh))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)