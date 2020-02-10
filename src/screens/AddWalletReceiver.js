import React from 'react'
import {View, StyleSheet, InteractionManager} from 'react-native'
import {ScrollView, FlatList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class AddKPReceiver extends React.Component {

    static navigationOptions = {
        title:'Add New Receiver'
    }

    state = {
        wallet_no:'',
        fullname:'',
        processing:false
    }

    handleChangeWalletNo = wallet_no => this.setState({wallet_no})

    handleChangeFullName = fullname => this.setState({fullname})

    handleSubmit = async () => {
        try {
            let {wallet_no, fullname, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            wallet_no = wallet_no.trim()
            fullname = fullname.trim()

            if(wallet_no == '' || fullname == '') Say.some(_('8'))
            else {

                let payload = {
                    wallet_no,
                    fullname
                }
    
                //await API.addNewReceiver(payload)

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

        const {wallet_no, fullname, processing} = this.state
        let ready = false

        if(wallet_no && fullname) ready = true

        return (
            <View style={style.container}>
                <Text center>Please ensure that the inputted wallet account number is correct.</Text>

                <Spacer />

                <TextInput
                    label='Wallet Account Number'
                    value={wallet_no}
                    onChangeText={this.handleChangeWalletNo}
                    keyboardType='numeric'
                />

                <TextInput
                    label='Full Name'
                    value={fullname}
                    onChangeText={this.handleChangeFullName}
                    autoCapitalize='words'
                />

                <View style={style.footer}>
                    <Button disabled={!ready} t='Save Receiver' onPress={this.handleSubmit} loading={processing} />
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

export default AddKPReceiver