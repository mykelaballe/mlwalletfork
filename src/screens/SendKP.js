import React from 'react'
import {TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Screen, Footer, Headline, Text, Spacer, Button, ButtonText, TextInput, Icon, HeaderRight, View} from '../components'
import {Colors} from '../themes'
import {_, Consts, Func, Say} from '../utils'
import {API} from '../services'

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
        amount:'',
        charges:'25',
        total:'',
        processing:false
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
                Say.some(res.message)
            }
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({processing:false})
    }

    render() {

        const {type} = this.props.navigation.state.params
        const {receiver, amount, charges, total, processing} = this.state
        let ready = false

        if(receiver && amount) ready = true

        return (
            <>
                <Screen>

                    {/*<Headline subtext={Consts.tcn[type].short_desc} />*/}
                    <View style={{alignItems:'flex-end'}}>
                        <ButtonText color={Colors.brand} icon='plus' t='Add Receiver' onPress={this.handleAddNewReceiver} />
                    </View>

                    {/*<TouchableOpacity onPress={this.handleAddNewReceiver}>*/}
                        <TextInput
                            disabled
                            label='Receiver'
                            value={receiver && `${receiver.firstname} ${receiver.middlename} ${receiver.lastname} ${receiver.suffix}`}
                            rightContent={<Icon name='user_plus' size={20} />}
                        />
                    {/*</TouchableOpacity>*/}

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
                    
                    <Button disabled={!ready} t={Consts.tcn[type].submit_text} onPress={this.handleSendMoney} loading={processing} />
                </Footer>
            </>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)