import React from 'react'
import {Screen, Footer, Headline, Text, Spacer, Button, ButtonIcon, TextInput, HeaderRight} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'
import Icon from 'react-native-vector-icons/FontAwesome'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn[navigation.state.params.type].short_desc,
        headerRight:(
            <HeaderRight>
                <ButtonIcon
                    icon={<Icon name='university' color={Colors.light} size={Metrics.icon.sm} />}
                    onPress={() => navigation.navigate('SavedBankPartners')}
                />
            </HeaderRight>
        )
    })

    state = {
        receiver:'BDO',
        account_name:'John Smith',
        account_number:'123456789',
        amount:'1000',
        fixed_charge:'',
        convenience_fee:'',
        total:''
    }

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAccountNumber = account_number => this.setState({account_number})

    handleChangeAmount = amount => this.setState({amount})

    handleSendMoney = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            ...params,
            transaction: {
                ...this.state
            }
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {receiver, account_name, account_number, amount, fixed_charge, convenience_fee, total} = this.state
        let ready = false

        if(receiver && account_name && account_number && amount) ready = true

        return (
            <>
                <Screen>

                    <Headline subtext={Consts.tcn[type].short_desc} />

                    <TextInput
                        disabled
                        label='Bank Name'
                        value={receiver}
                    />

                    <Spacer sm />

                    <TextInput
                        disabled
                        label='Account Name'
                        value={account_name}
                        onChangeText={this.handleChangeAccountName}
                    />

                    <Spacer sm />

                    <TextInput
                        disabled
                        label='Account Number'
                        value={account_number}
                        onChangeText={this.handleChangeAccountNumber}
                        keyboardType='numeric'
                    />

                    <Spacer sm />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />
                </Screen>
                
                <Footer>
                    <Text mute>Fixed Charge</Text>
                    <Text md>PHP 100.00</Text>

                    <Spacer />

                    <Text mute>Convenience Fee</Text>
                    <Text md>PHP 15.00</Text>

                    <Spacer />

                    <Text mute>Total</Text>
                    <Text md>PHP 25.00</Text>

                    <Spacer />
                    
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSendMoney} />
                </Footer>
            </>
        )
    }
}

export default Scrn