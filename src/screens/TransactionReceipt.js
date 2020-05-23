import React from 'react'
import {InteractionManager} from 'react-native'
import {View, ButtonIcon, HeaderRight, ActivityIndicator} from '../components'
import {SendWalletToWallet, SendKP, SendBankTransfer, ReceiveMoneyDomestic, ReceiveMoneyInternational, WithdrawCash, PayBill, BuyLoad} from '../components/transaction_receipt'
import {Colors, Metrics} from '../themes'
import {_, Say, Consts, Func} from '../utils'
import Icon from 'react-native-vector-icons/AntDesign'
import RNHTMLtoPDF from 'react-native-html-to-pdf'

const moment = require('moment')

export default class Scrn extends React.Component {

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
        date:'',
        time:'',
        loading:true,
        exportData:''
    }

    componentDidMount = () => {
        this.props.navigation.setParams({
            handleExport:this.handleExport
        })
        InteractionManager.runAfterInteractions(this.getData)
    }

    getData = async () => {
        const {params = {}} = this.props.navigation.state
        let now = moment(params.transdate) || moment()

        this.setState({
            date:now.format('MMMM DD, YYYY'),
            time:now.format('hh:mm:ss a'),
            loading:false
        })
    }

    handleSetExportData = exportData => this.setState({exportData})

    handleExport = async () => {
        const {type, kptn} = this.props.navigation.state.params
        const {date, time, exportData} = this.state

        if(!exportData) return false

        let html = `
            <div style="background-color:#323232;padding:3px 15px 3px 15px;margin-top:3px">
                <h2 style="textAlign:center;color:#fff">Transaction Receipt</h2>
                <h4 style="color:#fff;line-height:0">${Func.formatKPTN(kptn)}</h4>
            </div>
            
            <hr />
            
            ${exportData}

            <h4 style="color:#6A6A6A;line-height:0">Date</h4>
            <h3 style="margin-top:0">${date}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Time</h4>
            <h3 style="margin-top:0">${time}</h3>

            <h4 style="color:#6A6A6A;line-height:0">Type</h4>
            <h3 style="margin-top:0">${Consts.tcn[type].long_desc}</h3>
        `
      
        let file = await RNHTMLtoPDF.convert({
            html,
            fileName: kptn,
            directory: 'Documents',
            width:350,
            height:600
        })

        Say.ask(
            `Receipt exported in:\n ${file.filePath}`,
            'Success!',
            {
                yesBtnLabel:'View File',
                noBtnLabel:'Close',
                onConfirm:() => this.props.navigation.navigate('PDFViewer',{
                    title:kptn,
                    source:file.filePath
                })
            }
        )
    }

    render() {
        const {type, _from, cancellable, transaction, kptn, controlno, balance} = this.props.navigation.state.params
        const {date, time, loading} = this.state
        let tcn = ''

        if(loading) return <ActivityIndicator />

        let data = {
            date,
            time,
            ...transaction,
            tcn,
            kptn,
            controlno,
            balance,
            _from,
            cancellable
        }

        if(type === Consts.tcn.stw.code || type === Consts.tcn.rtw.code) return <SendWalletToWallet data={data} onExport={this.handleSetExportData} />

        if(type === Consts.tcn.skp.code) return <SendKP data={data} onExport={this.handleSetExportData} />

        if(type === Consts.tcn.stb.code) return <SendBankTransfer data={data} onExport={this.handleSetExportData} />

        if(type === Consts.tcn.rmd.code) return <ReceiveMoneyDomestic data={data} onExport={this.handleSetExportData} />

        if(type === Consts.tcn.rmi.code) return <ReceiveMoneyInternational data={data} onExport={this.handleSetExportData} />

        if(type === Consts.tcn.wdc.code) return <WithdrawCash data={data} onExport={this.handleSetExportData} />

        if(type === Consts.tcn.bpm.code) return <PayBill data={data} onExport={this.handleSetExportData} />

        if(type === Consts.tcn.bul.code) return <BuyLoad data={data} onExport={this.handleSetExportData} />

        return null
    }
}