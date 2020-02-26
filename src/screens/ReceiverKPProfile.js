import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Screen, Footer, Text, Row, Button, Spacer, HeaderRight, Outline} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
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
                    <Menu.Item onPress={() => {}} title="Delete Receiver" />
                </Menu>
            )
        }
    }

    state = {
        id:this.props.navigation.state.params.receiver.id,
        firstname:this.props.navigation.state.params.receiver.firstname,
        middlename:this.props.navigation.state.params.receiver.middlename || _('50'),
        lastname:this.props.navigation.state.params.receiver.lastname,
        suffix:this.props.navigation.state.params.receiver.suffix || _('51'),
        contact_no:this.props.navigation.state.params.receiver.contact_no
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
        navigate('UpdateKPReceiver',{receiver})
    }

    handleSelect = () => {
        const {navigation: {navigate, state: {params: {receiver}}}} = this.props
        navigate('SendKP',{receiver})
    }

    render() {

        const {firstname, middlename, lastname, suffix, contact_no} = this.state

        return (
            <>
                <Screen>
                    <Outline>
                        <Text mute sm>First Name</Text>
                        <Text md>{firstname}</Text>
                    </Outline>

                    <Spacer sm />

                    <Outline>
                        <Text mute sm>Middle Name</Text>
                        <Text md>{middlename}</Text>
                    </Outline>

                    <Spacer sm />

                    <Outline>
                        <Text mute sm>Last Name</Text>
                        <Text md>{lastname}</Text>
                    </Outline>

                    <Spacer sm />

                    <Outline>
                        <Text mute sm>Suffix</Text>
                        <Text md>{suffix}</Text>
                    </Outline>

                    <Spacer sm />

                    <Outline>
                        <Text mute sm>Contact No.</Text>
                        <Text>{contact_no}</Text>
                    </Outline>
                </Screen>

                <Footer>
                    <Button t={_('82')} onPress={this.handleSelect} />
                </Footer>
            </>
        )
    }
}

export default Scrn