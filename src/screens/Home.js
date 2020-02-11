import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity, Dimensions, Image} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from '../actions'
import {Text, Row, Spacer, FlatList, Ripple, Icon} from '../components'
import {Colors, Metrics, Res} from '../themes'
import {_} from '../utils'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.xl)
const ITEM_HEIGHT = 130

class Home extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'ML Wallet'
    }

    state = {
        balance:'910.50',
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

    handleToggleBalance = () => this.setState(prevState => ({show_balance:!prevState.show_balance}))

    handleGoToSendMoney = () => {
        //this.props.navigation.navigate('SendMoneyIndex')
        this.props.navigation.navigate('SendMoneyOnBoarding')
    }

    handleGoToReceiveMoney = () => {
        this.props.navigation.navigate('ReceiveMoneyOnBoarding')
    }

    handleGoToWithdrawCash = () => this.props.navigation.navigate('WithdrawCashOnBoarding')

    handleGoToPayBills = () => {
        this.props.navigation.navigate('PayBillsOnBoarding')
    }

    handleGoToBuyLoad = () => this.props.navigation.navigate('BuyLoadOnBoarding')

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

        const {balance, services, show_balance, verification_level, promo, loading} = this.state

        return (
            <>
                <TouchableOpacity style={style.topBanner} onPress={this.handleViewVerificationLevels}>
                    <Text center>You are semi-verified. Tap to learn more.</Text>
                </TouchableOpacity>

                <View style={style.jumbo}>
                    <Text center light md>Available Balance</Text>
                    <Row>
                        <Text rg light>Php</Text>
                        <Spacer h xs />
                        <Text b h3 light>{show_balance ? balance : '****.**'}</Text>
                        <Spacer h sm />
                        <TouchableOpacity onPress={this.handleToggleBalance}>
                            <Entypo name={`eye${!show_balance ? '-with-line' : ''}`} size={Metrics.icon.rg} color={Colors.light} />
                        </TouchableOpacity>
                    </Row>
                </View>

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
    jumbo: {
        alignItems:'center',
        backgroundColor:Colors.dark,
        paddingVertical:Metrics.xl
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

mapStateToProps = state => {
    return {

    }
}

mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)