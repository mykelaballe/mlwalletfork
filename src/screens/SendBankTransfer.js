import React from 'react'
import {Screen, Footer, Headline, Text, Spacer, Button, ButtonText, TextInput, HeaderRight} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts, Func} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn.stb.short_desc,
        headerRight:(
            <HeaderRight>
                <ButtonText color={Colors.light} t='Rates' onPress={() => navigation.navigate('BankTransferRates')} />
            </HeaderRight>
        )
    })

    state = {
        bank:this.props.navigation.state.params.bank.bankname,
        account_name:this.props.navigation.state.params.bank.old_account_name,
        account_no:this.props.navigation.state.params.bank.old_account_no,
        amount:'',
        fixed_charge:'100',
        convenience_fee:'15',
        total:''
    }

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAccountNumber = account_no => this.setState({account_no})

    handleChangeAmount = amount => {
        const {fixed_charge, convenience_fee} = this.state
        this.setState({
            amount,
            total:Func.compute(fixed_charge, convenience_fee, amount)
        })
    }

    handleSelectPartner = () => this.props.navigation.navigate('SavedBankPartners')

    handleSendMoney = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            type:Consts.tcn.stb.code,
            ...params,
            transaction: {
                ...this.state
            }
        })
    }

    render() {

        const {bank, account_name, account_no, amount, fixed_charge, convenience_fee, total} = this.state
        let ready = false

        if(bank && account_name && account_no && amount) ready = true

        return (
            <>
                <Screen>

                    {/*<View style={{alignItems:'flex-end'}}>
                        <ButtonText color={Colors.brand} icon='plus' t='Add Bank Partner' onPress={this.handleSelectPartner} />
                    </View>*/}

                    <TextInput
                        disabled
                        label='Bank Name'
                        value={bank}
                    />

                    <TextInput
                        disabled
                        label='Account Name'
                        value={account_name}
                        onChangeText={this.handleChangeAccountName}
                    />

                    <TextInput
                        disabled
                        label='Account Number'
                        value={account_no}
                        onChangeText={this.handleChangeAccountNumber}
                        keyboardType='numeric'
                    />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />
                </Screen>
                
                <Footer>
                    <Text mute>Fixed Charge</Text>
                    <Text md>PHP {Func.formatToCurrency(fixed_charge)}</Text>

                    <Spacer />

                    <Text mute>Convenience Fee</Text>
                    <Text md>PHP {Func.formatToCurrency(convenience_fee)}</Text>

                    <Spacer />

                    <Text mute>Total</Text>
                    <Text md>PHP {Func.formatToCurrency(total)}</Text>

                    <Spacer />
                    
                    <Button disabled={!ready} t={Consts.tcn.stb.submit_text} onPress={this.handleSendMoney} />
                </Footer>
            </>
        )
    }
}

export default Scrn