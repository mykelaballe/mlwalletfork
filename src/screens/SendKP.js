import React from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text, Spacer, Button, ButtonText, TextInput, Icon, HeaderRight, View} from '../components'
import {Colors} from '../themes'
import {_, Consts, Func, Say} from '../utils'
import {API} from '../services'

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:Consts.tcn.skp.short_desc,
        headerRight:(
            <HeaderRight>
                <ButtonText color={Colors.light} t='Rates' onPress={() => navigation.navigate('Rates')} />
            </HeaderRight>
        )
    })

    state = {
        receiver:null,
        amount:'',
        charges:'25',
        total:'',
        processing:false
    }

    /*componentDidUpdate = (prevProps, prevState) => {
        const {params = {}} = this.props.navigation.state
        if(params.receiver && params.receiver !== prevState.receiver) {
            this.props.navigation.setParams({receiver:null})
            this.setState({receiver:params.receiver})
        }
    }*/

    handleChangeAmount = amount => {
        this.setState({
            amount,
            total:Func.compute(this.state.charges, amount)
        })
    }

    handleAddNewReceiver = () => this.props.navigation.navigate('SavedKPReceivers')

    handleSendMoney = async () => {
        const {receiver, amount, total, processing} = this.state
        const {params} = this.props.navigation.state

        if(processing) return false

        try {
            this.setState({processing:true})

            let res = await API.sendKPValidate({
                walletno:this.props.user.walletno,
                principal:total
            })

            if(!res.error) {
                this.props.navigation.navigate('TransactionReview',{
                    ...params,
                    transaction: {
                        ...this.state
                    },
                    cancellable:true
                })
            }
            else {
                Say.warn(res.message)
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {receiver, amount, charges, total, processing} = this.state
        let ready = false

        if(receiver && amount) ready = true

        return (
            <>
                <Screen>

                    <TextInput
                        disabled
                        label='Receiver'
                        value={Func.formatName(receiver)}
                        rightContent={<Icon name='user_plus' size={20} />}
                    />

                    <TextInput
                        label='Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                    />
                </Screen>
                
                <Footer>
                    <Text mute>Charge</Text>
                    <Text md>PHP {Func.formatToCurrency(charges)}</Text>

                    <Spacer />

                    <Text mute>Total</Text>
                    <Text md>PHP {Func.formatToCurrency(total)}</Text>

                    <Spacer />
                    
                    <Button disabled={!ready} t={Consts.tcn.skp.submit_text} onPress={this.handleSendMoney} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)