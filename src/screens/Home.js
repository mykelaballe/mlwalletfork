import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {Actions} from '../actions'
import {ScrollView, Text, Row, Spacer, TopBuffer, FlatList, Ripple} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.xl)
const ITEM_HEIGHT = 130

class Home extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'Home'
    }

    state = {
        balance:'',
        services:[
            {
                icon:'send',
                label:'Send Money',
                onPress:() => this.handleGoToSendMoney()
            },
            {
                icon:'cash',
                label:'Receive Money',
                onPress:() => this.handleGoToReceiveMoney()
            },
            {
                icon:'cash',
                label:'Withdraw Cash',
                onPress:() => this.handleGoToWithdrawCash()
            },
            {
                icon:'card',
                label:'Pay Bills',
                onPress:() => this.handleGoToPayBills()
            },
            {
                icon:'phone-portrait',
                label:'Buy Load',
                onPress:() => this.handleGoToBuyLoad()
            },
            {
                icon:'cart',
                label:'Buy Items',
                onPress:() => this.handleGoToBuyItems()
            }
        ],
        show_balance:true,
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {

    }

    handleToggleBalance = () => this.setState(prevState => ({show_balance:!prevState.show_balance}))

    handleGoToSendMoney = () => this.props.navigation.navigate('SendMoneyIndex')

    handleGoToReceiveMoney = () => this.props.navigation.navigate('ReceiveMoneyIndex')

    handleGoToWithdrawCash = () => this.props.navigation.navigate('WithdrawCash')

    handleGoToPayBills = () => this.props.navigation.navigate('BillsCategory')

    handleGoToBuyLoad = () => this.props.navigation.navigate('BuyLoad')

    handleGoToBuyItems = () => this.props.navigation.navigate('')

    renderServices = ({item, index}) => (
        <Ripple onPress={item.onPress} style={style.item}>
            <Icon name={`ios-${item.icon}`} size={Metrics.icon.md} color={Colors.black} />
            <Text center sm>{item.label}</Text>
        </Ripple>
    )

    render() {

        const {balance, services, show_balance, loading} = this.state

        return (
            <View style={style.container}>
                
                <TopBuffer sm />

                <View style={{alignItems:'center'}}>
                    <Text center mute>Available Balance</Text>
                    <Row>
                        <Text sm>Php</Text>
                        <Spacer h sm />
                        <Text b h3>{show_balance ? '910.50' : '****.**'}</Text>
                        <Spacer h sm />
                        <View style={{marginTop:Metrics.lg}}>
                            <TouchableOpacity onPress={this.handleToggleBalance}>
                                <Icon name={`ios-eye${show_balance ? '-off' : ''}`} size={Metrics.icon.rg} color={Colors.dark} />
                            </TouchableOpacity>
                        </View>
                    </Row>
                </View>

                <Spacer xl />

                <Text center md>Select Services</Text>

                <Spacer />

                <FlatList
                    data={services}
                    renderItem={this.renderServices}
                    numColumns={3}
                />

                <Spacer />

                <View style={style.banner} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        padding:Metrics.rg
    },
    item: {
        justifyContent:'center',
        alignItems:'center',
        width:ITEM_WIDTH,
        height:ITEM_HEIGHT,
        padding:Metrics.sm,
        marginHorizontal:Metrics.rg
    },
    banner: {
        backgroundColor:Colors.mute,
        borderRadius:Metrics.sm,
        height:120,
        marginHorizontal:Metrics.rg
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