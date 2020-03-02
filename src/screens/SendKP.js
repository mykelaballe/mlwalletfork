import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Screen, Footer, Headline, Text, Spacer, Button, ButtonText, TextInput, Icon, HeaderRight} from '../components'
import {Colors} from '../themes'
import {_, Consts, Func} from '../utils'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn[navigation.state.params.type].short_desc,
        headerRight:(
            <HeaderRight>
                <ButtonText color={Colors.light} t='Rates' onPress={() => navigation.navigate('Rates')} />
            </HeaderRight>
        )
    })

    state = {
        receiver:null,
        /*receiver:{
            firstname:'',
            middlename:'',
            lastname:'',
            suffix:''
        },*/
        amount:'',
        charges:'25',
        total:''
    }

    componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.receiver && params.receiver !== prevState.receiver) {
            this.props.navigation.setParams({receiver:null})
            this.setState({receiver:params.receiver})
        }
    }

    handleChangeAmount = amount => {
        this.setState({
            amount,
            total:Func.compute(this.state.charges, amount)
        })
    }

    handleAddNewReceiver = () => this.props.navigation.navigate('SavedKPReceivers')

    handleSendMoney = async () => {
        const {params} = this.props.navigation.state
        this.props.navigation.navigate('TransactionReview',{
            ...params,
            transaction: {
                ...this.state
            },
            cancellable:true
        })
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {receiver, amount, charges, total} = this.state
        let ready = false

        if(receiver && amount) ready = true

        return (
            <>
                <Screen>

                    <Headline subtext={Consts.tcn[type].short_desc} />

                    <TouchableOpacity onPress={this.handleAddNewReceiver}>
                        <TextInput
                            disabled
                            label='Receiver'
                            value={receiver && `${receiver.firstname} ${receiver.middlename} ${receiver.lastname} ${receiver.suffix}`}
                            rightContent={<Icon name='user_plus' size={20} />}
                        />
                    </TouchableOpacity>

                    <Spacer sm />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />
                </Screen>
                
                <Footer>
                    <Text mute>Charges</Text>
                    <Text md>PHP {Func.formatToCurrency(charges)}</Text>

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