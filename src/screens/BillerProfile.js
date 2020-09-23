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
                    <Menu.Item onPress={params.handleEdit} title='Edit Biller' />
                    <Menu.Item onPress={params.handleDelete} title="Delete Biller" />
                </Menu>
            ) : null
        }
    }

    state = {
        ...this.props.navigation.state.params.biller,
        account_no:this.props.navigation.state.params.biller.old_account_no,
        account_name:this.props.navigation.state.params.biller.old_account_name,
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
            this.props.updateBiller(null)
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
        this.handleToggleMenu()
        navigate('UpdateBiller',{biller:this.state})
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
        const {old_partnersid, account_no, account_name, deleting} = this.state

        if(deleting) return false

        try {
            this.setState({deleting:true})

            await API.deleteBankPartner({
                walletno,
                partnersid:old_partnersid,
                accountid:account_no,
                account_name
            })
            this.props.refreshAll(true)
            this.props.refreshFavorites(true)
            this.props.refreshRecent(true)
            this.props.navigation.pop()
            Say.ok('Biller successfully deleted')
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({deleting:false})
    }

    handleSelect = () => this.props.navigation.navigate('PayBill',{biller:this.state})

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
        const {bankname, account_name, account_no, email, mobileno, isFavorite, deleting, favoriting} = this.state

        return (
            <>
                <Screen>
                    <StaticInput
                        label='Biller'
                        value={bankname}
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

                    <StaticInput
                        label='Mobile'
                        value={mobileno}
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
                    <Button disabled={deleting} t={deleting ? _('91') : 'Select Biller'} onPress={this.handleSelect} loading={deleting} />
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