import React, {useState, useEffect} from 'react'
import {View, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, RefreshControl} from 'react-native'
import {connect} from 'react-redux'
import {Creators} from '../actions'
import {ScrollView, Text, Spacer, Ripple, Icon, Balance, Row} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts} from '../utils'
import {API} from '../services'

const {width, height} = Dimensions.get('window')
const ITEM_WIDTH = (width / 4) - (Metrics.lg)
const ITEM_HEIGHT = 130

const ItemUI = ({icon, label, onPress}) => (
    <Ripple onPress={onPress} style={style.item}>
        <Icon name={icon} style={style.icon} />
        <Spacer sm />
        <Text center sm>{label}</Text>
    </Ripple>
)

const Scrn = props => {

    const [refreshing, setRefreshing] = useState(false)

    const getData = async () => {
        const {walletno} = props.user

        try {
            let res = await API.getAccountInfo(walletno)
            if(!res.error && res.data) {
                props.updateInfo({
                    ...res.data,
                    mobile_no:res.data.mobileNo,
                    email:res.data.EmailAdd
                })
            }
        }
        catch(err) {
            
        }

        setRefreshing(false)
    }

    const handleRefresh = () => {
        setRefreshing(true)
        getData()
    }

    const handleGoToAddMoney = () => props.navigation.navigate('AddMoneyIndex')

    const handleGoToSendMoney = () => props.navigation.navigate(props.hasSeenSendMoneyOnboarding ? 'SendMoneyIndex' : 'SendMoneyOnBoarding')

    const handleGoToReceiveMoney = () => props.navigation.navigate(props.hasSeenReceiveMoneyOnboarding ? 'ReceiveMoneyIndex' : 'ReceiveMoneyOnBoarding')

    const handleGoToWithdrawCash = () => props.navigation.navigate(props.hasSeenWithdrawCashOnboarding ? 'WithdrawCash' : 'WithdrawCashOnBoarding')

    const handleGoToPayBills = () => props.navigation.navigate(props.hasSeenPayBillsOnboarding ? 'PayBillsIndex' : 'PayBillsOnBoarding')

    const handleGoToBuyLoad = () => props.navigation.navigate(props.hasSeenBuyLoadOnboarding ? 'BuyLoadIndex' : 'BuyLoadOnBoarding')

    //const handleGoToBuyItems = () => props.navigation.navigate('ComingSoon',{title:'Buy Items',phrase:"We're working on our store.\nStay tuned for updates."})
    const handleGoToBuyItems = () => props.navigation.navigate('ComingSoon',{title:'Buy Items',uri:'https://mlhuillier1.github.io/ML-Wallet-Online-Shop'})

    const   handleViewVerificationLevels = () => props.navigation.navigate('VerificationLevels')

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {props.user.status > 0 &&
            <TouchableOpacity style={style.topBanner} onPress={handleViewVerificationLevels}>
                <Text center>You are {props.user.status == 1 ? 'semi-verified' : 'fully verified'}. Tap to learn more.</Text>
            </TouchableOpacity>
            }

            <Balance />

            <Spacer />

            <ScrollView refreshControl={<RefreshControl colors={[Colors.brand]} refreshing={refreshing} onRefresh={handleRefresh} />}>
                <View style={{flex:1}}>
                    <Row ar>
                        <ItemUI icon='add_money' label={`Add\nMoney`} onPress={handleGoToAddMoney} />
                        <ItemUI icon='send_money' label={`Send\nMoney`} onPress={handleGoToSendMoney} />
                        <ItemUI icon='receive_money' label={`Receive\nMoney`} onPress={handleGoToReceiveMoney} />
                        <ItemUI icon='withdraw_cash' label={`Withdraw\nMoney`} onPress={handleGoToWithdrawCash} />
                    </Row>

                    <View style={{alignItems:'center'}}>
                        <Row>
                            <ItemUI icon='pay_bills' label={`Pay\Bills`} onPress={handleGoToPayBills} />

                            <Spacer h />

                            <ItemUI icon='buy_load' label={`Buy\neLoad`} onPress={handleGoToBuyLoad} />

                            <Spacer h />

                            <ItemUI icon='buy_items' label={`Buy\nItems`} onPress={handleGoToBuyItems} />
                        </Row>
                    </View>
                </View>

                <Spacer />

                <View style={style.footer}>
                    <ImageBackground source={require('../res/promo_placeholder.png')} style={style.promo} resizeMode='contain'>
                        <Text light bold style={{marginLeft:Metrics.lg}}>V{Consts.appVersion}</Text>
                    </ImageBackground>
                </View>
            </ScrollView>
        </>
    )
}

Scrn.navigationOptions = {
    headerLeft:<View />,
    title:'ML Wallet'
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
        justifyContent:'flex-end',
        alignItems:'center',
        height:parseInt(height * .27),
        paddingVertical:Metrics.md
    },
    promo: {
        width,
        height:110,
        justifyContent:'center'
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
    updateInfo:newInfo => dispatch(Creators.updateUserInfo(newInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Scrn)