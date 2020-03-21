import React from 'react'
import {InteractionManager} from 'react-native'
import {View, ButtonIcon, HeaderRight, ActivityIndicator} from '../components'
import {SendWalletToWallet, SendKP, SendBankTransfer, ReceiveMoneyDomestic, ReceiveMoneyInternational, WithdrawCash, PayBill, BuyLoad} from '../components/transaction_receipt'
import {Colors, Metrics} from '../themes'
import {_, Say, Consts} from '../utils'
import Icon from 'react-native-vector-icons/AntDesign'
import RNHTMLtoPDF from 'react-native-html-to-pdf'

const moment = require('moment')

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state

        return {
            title:'Transaction Receipt',
            headerLeft:params._from === 'history' ? undefined : <View />,
            headerRight: (
                <HeaderRight>
                    <ButtonIcon icon={<Icon name='download' size={Metrics.icon.sm} color={Colors.light} />} onPress={params.handleExport} />
                </HeaderRight>
            )
        }
    }

    state = {
        timestamp:null,
        loading:true
    }

    componentDidMount = () => {
        this.props.navigation.setParams({
            handleExport:this.handleExport
        })
        InteractionManager.runAfterInteractions(this.getData)
    }

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

    handleExport = async () => {
        let kptn = 'MLW121324234'

        let html = `
            <div style="background-color:#323232;padding:5px 20px 5px 20px">
                <h2 style="textAlign:center;color:#fff">Transaction Receipt</h2>
                <h3 style="color:#fff;line-height:0">Transaction No: ${kptn}</h3>
            </div>
            
            <hr />
            
            <h4 style="color:#6A6A6A;line-height:0">Full Legal Name</h4>
            <h3>John Smith</h3>

            <h4 style="color:#6A6A6A;line-height:0">Amount</h4>
            <h3 style="margin-top:0">PHP 100.00</h3>

            <h4 style="color:#6A6A6A;line-height:0">Date</h4>
            <h3 style="margin-top:0">March 21, 2020</h3>

            <h4 style="color:#6A6A6A;line-height:0">Time</h4>
            <h3 style="margin-top:0">10:58:39 pm</h3>

            <h4 style="color:#6A6A6A;line-height:0">Type</h4>
            <h3 style="margin-top:0">Withdraw Cash</h3>
        `
        let options = {
            html,
            fileName: kptn,
            directory: 'Documents'
        }
      
        let file = await RNHTMLtoPDF.convert(options)
        alert(file.filePath)
    }

    render() {
        const {type, _from, cancellable, transaction, kptn, controlno, balance} = this.props.navigation.state.params
        const {timestamp, loading} = this.state
        let tcn = ''

        if(loading) return <ActivityIndicator />

        let data = {
            timestamp,
            ...transaction,
            tcn,
            kptn,
            controlno,
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