import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Screen, Footer, Button, StaticInput, HeaderRight} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
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
                    <Menu.Item onPress={() => {}} title="Delete Bank Account" />
                </Menu>
            )
        }
    }

    componentDidMount = () => {
        this.props.navigation.setParams({
            menuOpen:false,
            handleToggleMenu:this.handleToggleMenu,
            handleEdit:this.handleEdit
        })
    }

    handleToggleMenu = () => {
        let {menuOpen} = this.props.navigation.state.params

        menuOpen = !menuOpen

        this.props.navigation.setParams({menuOpen})
    }

    handleDelete = () => {

    }

    handleEdit = () => {
        const {navigate, state} = this.props.navigation
        const {bank} = state.params
        this.handleToggleMenu()
        navigate('UpdateBankPartner',{bank})
    }

    handleSelect = () => {
        this.props.navigation.navigate('SendBankTransfer')
    }

    render() {

        const {name, account_name, account_no} = this.props.navigation.state.params.bank

        return (
            <>
                <Screen>
                    <StaticInput
                        label='Bank Name'
                        value={name}
                    />

                    <StaticInput
                        label='Account Name'
                        value={account_name}
                    />

                    <StaticInput
                        label='Account No.'
                        value={account_no}
                    />
                </Screen>

                <Footer>
                    <Button t='Select Bank Account' onPress={this.handleSelect} />
                </Footer>
            </>
        )
    }
}

export default Scrn