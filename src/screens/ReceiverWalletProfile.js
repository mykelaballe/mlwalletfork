import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Button, Spacer, HR, TopBuffer, HeaderRight, Outline} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'
import {Menu} from 'react-native-paper'

class ReceiverWalletProfile extends React.Component {

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
                    <Menu.Item onPress={() => {}} title="Delete Receiver" />
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
        const {receiver} = state.params
        this.handleToggleMenu()
        navigate('UpdateWalletReceiver',{receiver})
    }

    handleSelect = () => {
        this.props.navigation.navigate('SendWalletToWallet')
    }

    render() {

        const {wallet_id, fullname} = this.props.navigation.state.params.receiver

        return (
            <View style={style.container}>

                <Outline>
                    <Text mute sm>Wallet Account Number</Text>
                    <Text md>{wallet_id}</Text>
                </Outline>

                <Spacer sm />

                <Outline>
                    <Text mute sm>Full Name</Text>
                    <Text>{fullname}</Text>
                </Outline>

                <View style={style.footer}>
                    <Button t='Select Receiver' onPress={this.handleSelect} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    },
    item: {
        padding:Metrics.rg
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default ReceiverWalletProfile