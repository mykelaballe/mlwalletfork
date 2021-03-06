import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import HR from './HR'
import {Colors, Metrics} from '../themes'
import {Consts, Func} from '../utils'
import {withNavigation} from 'react-navigation'

const ITEM_HEIGHT = 110
const moment = require('moment')

class TransactionHistoryItem extends React.Component {

    state = {
        _from:'history',
        type:this.props.data.transtype,
        //transtype:Consts.tcn[this.props.data.transtype] ? Consts.tcn[this.props.data.transtype].short_desc : this.props.data.transtype,
        kptn:this.props.data.transactionno,
        runningbalance:this.props.data.runningbalance,
        transaction: {
            status:'',
            walletno:this.props.user.walletno == this.props.data.walletno ? this.props.data.receiverwalletno : this.props.data.walletno,
            contact_no:this.props.data.mobileno,
            receiver: {
                fullname:this.props.data.receiverfullname,
                firstname:this.props.data.receiverfname,
                lastname:this.props.data.receiverlname,
                middlename:this.props.data.receivermname,
                suffix:this.props.data.receiversuffix,
            },
            bankname:this.props.data.partnername,
            bank:{
                bankname:this.props.data.partnername,
                convenienceFee:this.props.data.conveniencefee
            },
            cAccountFname:this.props.data.receiverfname,
            cAccountLname:this.props.data.receiverlname,
            partner:this.props.data.partnername,
            account_name:this.props.data.accountname,
            account_no:this.props.data.accountno,
            sender:this.props.data.sendername,
            branchname:this.props.data.branchname,
            currency:this.props.data.currency,
            notes:this.props.data.notes,
            amount:this.props.data.amount,
            charges:this.props.data.charge,
            fixed_charge:this.props.data.fixedcharge,
            convenience_fee:this.props.data.conveniencefee,
            total:this.props.data.totalamount,
            iscancelled:this.props.data.iscancelled,
            isclaimed:this.props.data.isclaimed,
            user:{
                fname:this.props.user.fname,
                lname:this.props.user.lname
            }
        },
        cancellable:false,
        dateformat:this.props.data.transdateformat,
        transdate:this.props.data.transdate
    }

    componentDidMount = () => {
        let newState = {
            ...this.state
        }
        const {data} = this.props

        //if(newState.type === 'LOAD') newState.type = Consts.tcn.stw.code
        //else if(newState.type === 'adm') newState.type = Consts.tcn.stw.code

        if(data.transtype == Consts.tcn.bpm.code) {
            newState.transaction.total = newState.transaction.amount + newState.transaction.fixed_charge + newState.transaction.convenience_fee
        }

        newState.amount = Func.checkTransAmount(newState)

        if(data.transtype == Consts.tcn.skp.code || data.transtype == Consts.tcn.wdc.code) {
            if(data.status == 1) {
                newState.transaction.status = 'success'
                newState.cancellable = false
            }
            
            if(data.isclaimed == 1) {
                newState.transaction.status = 'claimed'
                newState.cancellable = false
            }

            if(data.isclaimed == 0) {
                if(data.iscancelled == 0) newState.cancellable = true
                else {
                    newState.cancellable = false
                    newState.transaction.status = 'cancelled'
                }
            }
        }

        this.setState({
            ...newState
        })
    }

    //shouldComponentUpdate = () => false

    handleView = () => this.props.navigation.navigate('TransactionReceipt',this.state)

    render() {

        const {state} = this

        return (
        <>
            <View bw style={style.item}>
                <View style={{flex:1,marginRight:Metrics.sm}}>
                    {((state.type === Consts.tcn.skp.code || state.type === Consts.tcn.wdc.code) && (state.isclaimed == 0 && state.iscancelled == 0)) &&
                    <Text style={{color:Colors.mute}}>PENDING</Text>
                    }

                    {state.iscancelled > 0 && <Text style={{color:Colors.mute}}>CANCELLED</Text>}

                    <Text style={{fontWeight:'bold',fontSize:Metrics.font.md}}>
                        {Consts.tcn[state.type] ? Consts.tcn[state.type].short_desc : state.type}
                    </Text>
                    <Text style={{color:Colors.mute}}>{state.dateformat}</Text>
                    <Text style={{color:Colors.mute}}>Running Balance: {Func.formatToRealCurrency(state.runningbalance)}</Text>
                </View>

                <View>
                    <Text style={{fontWeight:'bold',fontSize:Metrics.font.md,textAlign:'right'}}>
                        {Consts.currency.PH} {Func.formatToRealCurrency(state.amount)}
                    </Text>
                    <TouchableOpacity onPress={this.handleView}>
                        <Text style={{color:Colors.brand,textAlign:'right'}}>View details</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <HR />
        </>
        )
    }
}

const style = StyleSheet.create({
    item: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:ITEM_HEIGHT,
        paddingHorizontal:Metrics.md,
        paddingVertical:Metrics.md
    }
})

const mapStateToProps = state => ({
    user: state.user.data
})

export default withNavigation(connect(mapStateToProps)(TransactionHistoryItem))