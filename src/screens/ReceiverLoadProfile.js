import React from 'react'
import {Screen, Footer, Text, Button, Spacer, Outline} from '../components'
import {_} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title:'Saved Receiver'
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
        this.props.navigation.navigate('SendKP')
    }

    render() {

        const {fullname, contact_no} = this.props.navigation.state.params.receiver

        return (
            <>
                <Screen>
                    <Outline>
                        <Text mute sm>Full Legal Name</Text>
                        <Text md>{fullname}</Text>
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