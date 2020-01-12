import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, FlatList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class UpdateWalletReceiver extends React.Component {

    static navigationOptions = {
        title:'Update Receiver'
    }

    state = {
        ...this.props.navigation.state.params.receiver,
        processing:false
    }

    handleChangeWalletNo = wallet_no => this.setState({wallet_no})

    handleChangeNickname = nickname => this.setState({nickname})

    handleSubmit = async () => {
        try {
            let {wallet_id, nickname, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            wallet_id = wallet_id.trim()
            nickname = nickname.trim()

            if(wallet_id == '' || nickname == '') Say.some(_('8'))
            else {

                let payload = {
                    wallet_id,
                    nickname
                }
    
                //await API.updateReceiver(payload)

                Say.ok('success')
                this.props.navigation.pop()
            }

            this.setState({processing:false})
        }
        catch(err) {
            this.setState({processing:false})
            Say.err(_('18'))
        }
    }

    render() {

        const {wallet_id, nickname, processing} = this.state

        return (
            <View style={style.container}>
                <TextInput
                    label='Wallet No.'
                    placeholder='Enter Wallet No.'
                    value={wallet_id}
                    onChangeText={this.handleChangeWalletNo}
                    keyboardType='numeric'
                />

                <TextInput
                    label='Nickname'
                    placeholder='Enter Nickname'
                    value={nickname}
                    onChangeText={this.handleChangeNickname}
                />

                <View style={style.footer}>
                    <Button t='Update Receiver' onPress={this.handleSubmit} />
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
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default UpdateWalletReceiver