import React from 'react'
import {Screen, Footer, Headline, Text, Spacer, Button, ButtonText, ButtonIcon, TextInput, HeaderRight, View} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts, Func} from '../utils'
import Icon from 'react-native-vector-icons/FontAwesome'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn[navigation.state.params.type].short_desc,
        /*headerRight:(
            <HeaderRight>
                <ButtonIcon
                    icon={<Icon name='university' color={Colors.light} size={Metrics.icon.sm} />}
                    onPress={() => navigation.navigate('SavedBankPartners')}
                />
            </HeaderRight>
        )*/
    })

    state = {
        bank:'',
        account_name:'',
        account_number:'',
        amount:'',
        fixed_charge:'100',
        convenience_fee:'15',
        total:''
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.bank && params.bank.name !== prevState.bank) {
            this.props.navigation.setParams({bank:null})
            this.setState({
                bank:params.bank.name,
                account_name:params.bank.account_name,
                account_number:params.bank.account_no
            })
        }
    }

    handleChangeAccountName = account_name => this.setState({account_name})

    handleChangeAccountNumber = account_number => this.setState({account_number})

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
            ...params,
            transaction: {
                ...this.state
            }
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {bank, account_name, account_number, amount, fixed_charge, convenience_fee, total} = this.state
        let ready = false

        if(bank && account_name && account_number && amount) ready = true

        return (
            <>
                <Screen>

                    {/*<Headline subtext={Consts.tcn[type].short_desc} />*/}

                    <View style={{alignItems:'flex-end'}}>
                        <ButtonText color={Colors.brand} icon='plus' t='Add Bank Partner' onPress={this.handleSelectPartner} />
                    </View>

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
                        value={account_number}
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
                    
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSendMoney} />
                </Footer>
            </>
        )
    }
}

export default Scrn