import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity, Dimensions, Image} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Text, Spacer, FlatList, Ripple, Icon, Balance} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 4) - (Metrics.xl)
const ITEM_HEIGHT = 130

class Scrn extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'ML Wallet'
    }

    state = {
        services:[
            {
                icon:'add_money',
                label:'Add\nMoney',
                onPress:() => this.handleGoToAddMoney()
            },
            {
                icon:'send_money',
                label:'Send\nMoney',
                onPress:() => this.handleGoToSendMoney()
            },
            {
                icon:'receive_money',
                label:'Receive\nMoney',
                onPress:() => this.handleGoToReceiveMoney()
            },
            {
                icon:'withdraw_cash',
                label:'Withdraw\bMoney',
                onPress:() => this.handleGoToWithdrawCash()
            },
            {
                icon:'pay_bills',
                label:'Pay\nBills',
                onPress:() => this.handleGoToPayBills()
            },
            {
                icon:'buy_load',
                label:'Buy\neLoad',
                onPress:() => this.handleGoToBuyLoad()
            },
            {
                icon:'buy_items',
                label:'Buy\nItems',
                onPress:() => this.handleGoToBuyItems()
            },
        ],
        show_balance:true,
        promo:null,
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {walletno} = this.props.user

        try {
            let rates = await API.getRates()
            this.props.setRates(rates)

            let res = await API.getAccountInfo(walletno)
            if(!res.error) {
                this.props.updateInfo({
                    ...res.data,
                    mobile_no:res.data.mobileNo,
                    email:res.data.EmailAdd
                })
            }
        }
        catch(err) {
            Say.err(err)
        }
    }

    handleGoToAddMoney = () => {
        const {navigation: {navigate}} = this.props
        navigate('AddMoneyIndex')
    }

    handleGoToSendMoney = () => {
        const {navigation: {navigate}, hasSeenSendMoneyOnboarding} = this.props
        if(hasSeenSendMoneyOnboarding) navigate('SendMoneyIndex')
        else navigate('SendMoneyOnBoarding')
    }

    handleGoToReceiveMoney = () => {
        const {navigation: {navigate}, hasSeenReceiveMoneyOnboarding} = this.props
        if(hasSeenReceiveMoneyOnboarding) navigate('ReceiveMoneyIndex')
        else navigate('ReceiveMoneyOnBoarding')
    }

    handleGoToWithdrawCash = () => {
        const {navigation: {navigate}, hasSeenWithdrawCashOnboarding} = this.props
        if(hasSeenWithdrawCashOnboarding) navigate('WithdrawCash')
        else navigate('WithdrawCashOnBoarding')
    }

    handleGoToPayBills = () => {
        const {navigation: {navigate}, hasSeenPayBillsOnboarding} = this.props
        if(hasSeenPayBillsOnboarding) navigate('PayBillsIndex')
        else navigate('PayBillsOnBoarding')
    }

    handleGoToBuyLoad = () => {
        const {navigation: {navigate}, hasSeenBuyLoadOnboarding} = this.props
        if(hasSeenBuyLoadOnboarding) navigate('BuyLoadIndex')
        else navigate('BuyLoadOnBoarding')
    }

    handleGoToBuyItems = () => this.props.navigation.navigate('ComingSoon')

    handleViewVerificationLevels = () => this.props.navigation.navigate('VerificationLevels')

    renderServices = ({item, index}) => (
        <Ripple onPress={item.onPress} style={style.item}>
            <Icon name={item.icon} style={style.icon} />
            <Spacer sm />
            <Text center sm>{item.label}</Text>
        </Ripple>
    )

    render() {

        const {status} = this.props.user
        const {services} = this.state

        return (
            <>
                <TouchableOpacity style={style.topBanner} onPress={this.handleViewVerificationLevels}>
                    <Text center>You are {status == 0 ? 'semi-verified' : 'fully verified'}. Tap to learn more.</Text>
                </TouchableOpacity>

                <Balance />

                <Spacer sm />

                <FlatList
                    data={services}
                    renderItem={this.renderServices}
                    numColumns={4}
                    columnWrapperStyle={{justifyContent:'center'}}
                />

                <Spacer />

                <View style={style.footer}>
                    <Image source={require('../res/promo_placeholder.png')} style={style.promo} resizeMode='contain' />
                </View>
            </>
        )
    }
}

const style = StyleSheet.create({
    topBanner: {
        backgroundColor:Colors.gray,
        paddingVertical:Metrics.rg
    },
    item: {
        justifyContent:'center',
        alignItems:'center',
        width:ITEM_WIDTH,
        height:ITEM_HEIGHT,
        marginHorizontal:Metrics.rg
    },
    icon: {
        width:40,
        height:40
    },
    footer: {
        alignItems:'center',
        paddingVertical:Metrics.md
    },
    promo: {
        width,
        height:110
    }
})

const mapStateToProps = state => ({
    user: state.user.data,
    hasSeenSendMoneyOnboarding: state.app.hasSeenSendMoneyOnboarding,
    hasSeenReceiveMoneyOnboarding: state.app.hasSeenReceiveMoneyOnboarding,
    hasSeenWithdrawCashOnboarding: state.app.hasSeenWithdrawCashOnboarding,
    hasSeenPayBillsOnboarding: state.app.hasSeenPayBillsOnboarding,
    hasSeenBuyLoadOnboarding: state.app.hasSeenBuyLoadOnboarding
})

const mapDispatchToProps = dispatch => ({
    updateInfo:newInfo => dispatch(Creators.updateUserInfo(newInfo)),
    setRates: rates => dispatch(Creators.setKPRates(rates))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)