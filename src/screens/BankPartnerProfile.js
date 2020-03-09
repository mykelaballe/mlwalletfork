import React from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, Button, StaticInput, HeaderRight, Prompt} from '../components'
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
        showDeleteModal:false
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

    handleEdit = () => {
        const {navigate, state} = this.props.navigation
        const {bank} = state.params
        this.handleToggleMenu()
        navigate('UpdateBankPartner',{bank})
    }

    handleDelete = () => {
        this.handleToggleMenu()
        this.setState({showDeleteModal:true})
    }

    handleConfirmDelete = () => {
        const {walletno} = this.props.user
        const {index, bank} = this.props.navigation.state.params
        this.handleCloseModal()
        try {
            API.deleteBankPartner({
                walletno,
                partnersid:bank.old_partnersid,
                accountid:bank.old_account_no,
                account_name:bank.old_account_name
            })
            this.props.navigation.navigate('SavedBankPartners',{removeAtIndex:index})
        }
        catch(err) {
            Say.err(_('500'))
        }
    }

    handleSelect = () => {
        const {navigation: {navigate, state: {params: {bank}}}} = this.props
        this.props.navigation.navigate('SendBankTransfer',{bank})
    }

    handleCloseModal = () => this.setState({showDeleteModal:false})

    render() {

        const {bankname, old_account_name, old_account_no} = this.props.navigation.state.params.bank
        const {showDeleteModal} = this.state

        return (
            <>
                <Prompt
                    visible={showDeleteModal}
                    title='Are you sure?'
                    message='You are about to delete a bank partner. This action cannot be undone'
                    type='delete'
                    onConfirm={this.handleConfirmDelete}
                    onDismiss={this.handleCloseModal}
                />

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
                </Screen>

                <Footer>
                    <Button t='Select Bank Account' onPress={this.handleSelect} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)