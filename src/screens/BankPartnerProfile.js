import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {ScrollView, Text, Row, Button, Spacer, HR, TopBuffer, HeaderRight} from '../components'
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
            <View style={style.container}>

                <View style={style.a}>
                    <Text mute sm>Bank Name</Text>
                    <Text md>{name}</Text>
                </View>

                <Spacer sm />

                <View style={style.a}>
                    <Text mute sm>Account Name</Text>
                    <Text>{account_name}</Text>
                </View>

                <Spacer sm />

                <View style={style.a}>
                    <Text mute sm>Account No.</Text>
                    <Text md>{account_no}</Text>
                </View>

                <View style={style.footer}>
                    <Button t='Select Bank Account' onPress={this.handleSelect} />
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
    a: {
        padding:Metrics.md,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.mute,
        borderRadius:Metrics.sm,
        marginVertical:Metrics.sm
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default Scrn