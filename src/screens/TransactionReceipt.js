import React from 'react'
import {InteractionManager} from 'react-native'
import {View, ButtonIcon, HeaderRight, ActivityIndicator} from '../components'
import {SendWalletToWallet, SendKP, SendBankTransfer, ReceiveMoneyDomestic, ReceiveMoneyInternational, WithdrawCash, PayBill, BuyLoad} from '../components/transaction_receipt'
import {Colors, Metrics} from '../themes'
import {_, Say, Consts} from '../utils'
import Icon from 'react-native-vector-icons/AntDesign'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title:'Transaction Receipt',
            headerLeft:params._from === 'history' ? undefined : <View />,
            headerRight: (
                <HeaderRight>
                    <ButtonIcon icon={<Icon name='download' size={Metrics.icon.sm} color={Colors.light} />} onPress={() => {}} />
                </HeaderRight>
            )
        }
    }

    state = {
        timestamp:null,
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {

        try {
            
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            timestamp:moment(),
            loading:false
        })
    }

    render() {
        const {type, _from, cancellable, transaction, kptn, balance} = this.props.navigation.state.params
        const {timestamp, loading} = this.state
        let tcn = 'MLW-0011-718-2031-822-1211'

        if(loading) return <ActivityIndicator />

        let data = {
            timestamp,
            ...transaction,
            tcn,
            kptn,
            balance,
            _from,
            cancellable
        }

        if(type === Consts.tcn.stw.code) return <SendWalletToWallet data={data} />

        if(type === Consts.tcn.skp.code) return <SendKP data={data} />

        if(type === Consts.tcn.stb.code) return <SendBankTransfer data={data} />

        if(type === Consts.tcn.rmd.code) return <ReceiveMoneyDomestic data={data} />

        if(type === Consts.tcn.rmi.code) return <ReceiveMoneyInternational data={data} />

        if(type === Consts.tcn.wdc.code) return <WithdrawCash data={data} />

        if(type === Consts.tcn.bpm.code) return <PayBill data={data} />

        if(type === Consts.tcn.bul.code) return <BuyLoad data={data} />

        return null
    }
}

export default Scrn