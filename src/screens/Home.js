import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity, Dimensions, Image, RefreshControl} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {ScrollView, Text, Spacer, FlatList, Ripple, Icon, Balance, Row} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

const {width, height} = Dimensions.get('window')
const ITEM_WIDTH = (width / 4) - (Metrics.lg)
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
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {walletno} = this.props.user

        try {
            //let rates = await API.getRates()
            //this.props.setRates(rates)

            let res = await API.getAccountInfo(walletno)
            if(!res.error && res.data) {
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

        this.setState({
            refreshing:false
        })
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

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

    handleGoToBuyItems = () => this.props.navigation.navigate('ComingSoon',{title:'Buy Items',phrase:"We're working on our store.\nStay tuned for updates."})

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
        const {services, refreshing} = this.state

        return (
            <>
                {status > 0 &&
                <TouchableOpacity style={style.topBanner} onPress={this.handleViewVerificationLevels}>
                    <Text center>You are {status == 1 ? 'semi-verified' : 'fully verified'}. Tap to learn more.</Text>
                </TouchableOpacity>
                }

                <Balance />

                <Spacer />

                {/*<FlatList
                    data={services}
                    renderItem={this.renderServices}
                    numColumns={4}
                    columnWrapperStyle={{justifyContent:'center'}}
                />*/}
                <ScrollView
                    refreshControl={
                        <RefreshControl colors={[Colors.brand]} refreshing={refreshing} onRefresh={this.handleRefresh} />
                    }
                >
                    <View style={{flex:1}}>
                        <Row ar>
                            <Ripple onPress={this.handleGoToAddMoney} style={style.item}>
                                <Icon name='add_money' style={style.icon} />
                                <Spacer sm />
                                <Text center sm>{`Add\nMoney`}</Text>
                            </Ripple>

                            <Ripple onPress={this.handleGoToSendMoney} style={style.item}>
                                <Icon name='send_money' style={style.icon} />
                                <Spacer sm />
                                <Text center sm>{`Send\nMoney`}</Text>
                            </Ripple>

                            <Ripple onPress={this.handleGoToReceiveMoney} style={style.item}>
                                <Icon name='receive_money' style={style.icon} />
                                <Spacer sm />
                                <Text center sm>{`Receive\nMoney`}</Text>
                            </Ripple>

                            <Ripple onPress={this.handleGoToWithdrawCash} style={style.item}>
                                <Icon name='withdraw_cash' style={style.icon} />
                                <Spacer sm />
                                <Text center sm>{`Withdraw\nMoney`}</Text>
                            </Ripple>
                        </Row>

                        <View style={{alignItems:'center'}}>
                            <Row>
                                <Ripple onPress={this.handleGoToPayBills} style={style.item}>
                                    <Icon name='pay_bills' style={style.icon} />
                                    <Spacer sm />
                                    <Text center sm>{`Pay\nBills`}</Text>
                                </Ripple>

                                <Spacer h />

                                <Ripple onPress={this.handleGoToBuyLoad} style={style.item}>
                                    <Icon name='buy_load' style={style.icon} />
                                    <Spacer sm />
                                    <Text center sm>{`Buy\neLoad`}</Text>
                                </Ripple>

                                <Spacer h />

                                <Ripple onPress={this.handleGoToBuyItems} style={style.item}>
                                    <Icon name='buy_items' style={style.icon} />
                                    <Spacer sm />
                                    <Text center sm>{`Buy\nItems`}</Text>
                                </Ripple>
                            </Row>
                        </View>
                    </View>

                    <Spacer />

                    <View style={style.footer}>
                        <Image source={require('../res/promo_placeholder.png')} style={style.promo} resizeMode='contain' />
                    </View>
                </ScrollView>
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
        marginHorizontal:Metrics.xs
    },
    icon: {
        width:40,
        height:40
    },
    footer: {
        //backgroundColor:'blue',
        //flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        height:parseInt(height * .27),
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