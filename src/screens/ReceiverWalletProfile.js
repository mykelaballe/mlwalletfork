import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class ReceiverWalletProfile extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:`${navigation.state.params.receiver.firstname} ${navigation.state.params.receiver.lastname}`
    })

    handleDelete = () => {

    }

    handleEdit = () => {
        const {navigate, state} = this.props.navigation
        const {receiver} = state.params
        navigate('UpdateWalletReceiver',{receiver})
    }

    handleSelect = () => {
        this.props.navigation.navigate('SendWalletToWallet')
    }

    render() {

        const {wallet_id, nickname} = this.props.navigation.state.params.receiver

        return (
            <View style={style.container}>
                <View style={{alignItems:'flex-end'}}>
                    <ButtonText t='Delete Receiver' onPress={this.handleDelete} />
                </View>

                <Text mute sm>Wallet No.</Text>
                <Text>{wallet_id}</Text>

                <Spacer />

                <Text mute sm>Nickname</Text>
                <Text>{nickname}</Text>

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

export default ReceiverWalletProfile