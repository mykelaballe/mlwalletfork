import React from 'react'
import {View, StyleSheet, InteractionManager, Picker} from 'react-native'
import {ScrollView, FlatList, TextInput, Text, Row, Button, ButtonIcon, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

class ReceiveMoney extends React.Component {

    static navigationOptions = {
        title:'Receive Money'
    }

    state = {
        type:this.props.navigation.state.params.type,
        transaction_no:'',
        currency:'',
        amount:'',
        partner_name:'',
        sender_name:'',
        processing:false
    }

    handleChangeTransactionNo = transaction_no => this.setState({transaction_no})

    handleChangeCurrency = currency => this.setState({currency})

    handleChangeAmount = amount => this.setState({amount})

    handleChangePartner = partner_name => this.setState({partner_name})

    handleBrowsePartners = () => this.props.navigation.navigate('Partners')

    handleChangeSender = sender_name => this.setState({sender_name})

    handleSubmit = async () => {
        try {
            let {transaction_no, currency, amount, partner_name, sender_name, processing} = this.state

            if(processing) return false

            this.setState({processing:true})

            transaction_no = transaction_no.trim()
            partner_name = partner_name.trim()
            sender_name = sender_name.trim()

            if(transaction_no == '' || sender_name == '') Say.some(_('8'))
            else {

                let payload = {
                    transaction_no,
                    amount,
                    sender_name
                }
    
                //await API.addNewReceiver(payload)

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
        
        const {type, transaction_no, currency, amount, partner_name, sender_name, processing} = this.state

        return (
            <View style={style.container}>
                <TextInput
                    label='Transaction No.'
                    value={transaction_no}
                    onChangeText={this.handleChangeTransactionNo}
                />

                {type === 'international' &&
                <>
                    <Spacer md />
                    <Text mute>Currency</Text>
                    <Picker
                        selectedValue={currency}
                        onValueChange={this.handleChangeCurrency}
                    >
                        <Picker.Item key={0} label='Choose' value='' />
                        <Picker.Item key={1} label='PHP' value='PHP' />
                        <Picker.Item key={2} label='USD' value='USD' />
                    </Picker>
                </>
                }

                <TextInput
                    label='Amount'
                    value={amount}
                    onChangeText={this.handleChangeAmount}
                    keyboardType='numeric'
                />

                {type === 'international' &&
                <Row>
                    <TextInput
                        style={{flex:1}}
                        label="Partner's Name"
                        value={partner_name}
                        onChangeText={this.handleChangePartner}
                    />
                    <ButtonIcon
                        icon={<Icon name='ios-list' size={Metrics.icon.rg} color={Colors.dark} />}
                        onPress={this.handleBrowsePartners}
                    />
                </Row>
                }

                <TextInput
                    label="Sender's Name"
                    value={sender_name}
                    onChangeText={this.handleChangeSender}
                />

                <View style={style.footer}>
                    <Text center>Make sure to enter the correct Transaction Number. Five attempts will block your account for 24 hours.</Text>
                    <Spacer sm />
                    <Button t='Submit' onPress={this.handleSubmit} />
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

export default ReceiveMoney