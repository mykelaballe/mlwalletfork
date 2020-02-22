import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity, Dimensions, Image} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {Text, Spacer, FlatList, Ripple, Icon, Balance} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.xl)
const ITEM_HEIGHT = 130

class Scrn extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'ML Wallet'
    }

    state = {
        services:[
            {
                icon:'send_money',
                label:'Send Money',
                onPress:() => this.handleGoToSendMoney()
            },
            {
                icon:'receive_money',
                label:'Receive Money',
                onPress:() => this.handleGoToReceiveMoney()
            },
            {
                icon:'withdraw_cash',
                label:'Withdraw Cash',
                onPress:() => this.handleGoToWithdrawCash()
            },
            {
                icon:'pay_bills',
                label:'Pay Bills',
                onPress:() => this.handleGoToPayBills()
            },
            {
                icon:'buy_load',
                label:'Buy Load',
                onPress:() => this.handleGoToBuyLoad()
            },
            {
                icon:'buy_items',
                label:'Buy Items',
                onPress:() => this.handleGoToBuyItems()
            },
        ],
        show_balance:true,
        verification_level:1,
        promo:null,
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {

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
        if(hasSeenPayBillsOnboarding) navigate('BillsCategory')
        else navigate('PayBillsOnBoarding')
    }

    handleGoToBuyLoad = () => {
        const {navigation: {navigate}, hasSeenBuyLoadOnboarding} = this.props
        if(hasSeenBuyLoadOnboarding) navigate('BuyLoad')
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

        const {services, verification_level, promo, loading} = this.state

        return (
            <>
                <TouchableOpacity style={style.topBanner} onPress={this.handleViewVerificationLevels}>
                    <Text center>You are semi-verified. Tap to learn more.</Text>
                </TouchableOpacity>

                <Balance />

                <Spacer />

                <FlatList
                    data={services}
                    renderItem={this.renderServices}
                    numColumns={3}
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
        padding:Metrics.sm,
        marginHorizontal:Metrics.md
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
    hasSeenSendMoneyOnboarding: state.app.hasSeenSendMoneyOnboarding,
    hasSeenReceiveMoneyOnboarding: state.app.hasSeenReceiveMoneyOnboarding,
    hasSeenWithdrawCashOnboarding: state.app.hasSeenWithdrawCashOnboarding,
    hasSeenPayBillsOnboarding: state.app.hasSeenPayBillsOnboarding,
    hasSeenBuyLoadOnboarding: state.app.hasSeenBuyLoadOnboarding
})

export default connect(mapStateToProps)(Scrn)