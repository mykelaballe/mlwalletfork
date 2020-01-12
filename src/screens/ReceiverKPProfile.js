import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class ReceiverKPProfile extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:navigation.state.params.receiver.name
    })

    handleDelete = () => {

    }

    handleEdit = () => {
        const {navigate, state} = this.props.navigation
        const {receiver} = state.params
        navigate('UpdateKPReceiver',{receiver})
    }

    handleSelect = () => {
        this.props.navigation.navigate('SendKP')
    }

    render() {

        const {contact, name} = this.props.navigation.state.params.receiver

        return (
            <View style={style.container}>
                <View style={{alignItems:'flex-end'}}>
                    <ButtonText t='Delete Receiver' onPress={this.handleDelete} />
                </View>

                <Text mute sm>Full Name</Text>
                <Text>{name}</Text>

                <Spacer />

                <Text mute sm>Contact No.</Text>
                <Text>{contact}</Text>

                <View style={style.footer}>
                    <ButtonText t='Edit Receiver' onPress={this.handleEdit} />
                    <Spacer sm />
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

export default ReceiverKPProfile