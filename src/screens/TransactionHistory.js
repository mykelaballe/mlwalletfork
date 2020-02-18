import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity, Dimensions} from 'react-native'
import {FlatList, Text, Row, Spacer, HeaderRight, HR, ButtonText} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts, Say} from '../utils'
import Icon from 'react-native-vector-icons/AntDesign'
import {Provider, Menu} from 'react-native-paper'

const {width} = Dimensions.get('window')
const MENU_WIDTH = width - (Metrics.md * 2)

const moment = require('moment')

class TransactionHistory extends React.Component {

    static navigationOptions = {
        title:'Transactions',
        headerRight: (
            <HeaderRight>
                <Icon name='download' color={Colors.light} size={Metrics.icon.sm} />
            </HeaderRight>
        )
    }

    state = {
        list:[],
        timeframe_filters:[
            'All Time',
            'This Past Week',
            'This Past Month',
            'This Past Year',
            'Custom'
        ],
        type_filters:[
            'All Types',
            'Bills Payment',
            'Buy Load',
            'Receive Money',
            'Send Money',
            'Withdraw Cash'
        ],
        show_filters:false,
        show_timeframe_filters:false,
        show_type_filters:false,
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let list = []

        try {
            list = [
                {
                    code:'wdc',
                    label:'Withdraw Cash',
                    amount:1000,
                    date:'2020-02-04',
                    status:'pending'
                },
                {
                    code:'bul',
                    label:'Buy Load',
                    amount:100,
                    date:'2020-02-01',
                    status:'success'
                },
                {
                    code:'skp',
                    label:'Kwarta Padala',
                    amount:1000,
                    date:'2020-01-29',
                    status:'cancelled'
                },
                {
                    code:'rmd',
                    label:'Receive Money',
                    amount:3000,
                    date:'2020-01-12',
                    status:'success'
                },
            ]
        }
        catch(err) {
            Say.err('Something went wrong')
        }

        this.setState({
            list,
            loading:false
        })
    }

    handleToggleFilters = () => this.setState(prevState => ({show_filters:!prevState.show_filters}))

    handleToggleTimeframeFilters = () => this.setState(prevState => ({show_timeframe_filters:!prevState.show_timeframe_filters}))

    handleToggleTypeFilters = () => this.setState(prevState => ({show_type_filters:!prevState.show_type_filters}))

    handleViewDetails = item => {
        this.props.navigation.navigate('TransactionReceipt',{
            type:Consts.tcn.stw.code,
            amount:item.amount,
            status:'success',
            _from:'history'
        })
    }

    renderItem = ({item, index}) => (
        <>
            <Row bw style={style.item}>
                <View>
                    <Text mute>{item.status !== 'success' ? item.status.toUpperCase() : ''}</Text>
                    <Text b md>{item.label}</Text>
                    <Text mute>{moment(item.date).format('MM/DD/YYYY')}</Text>
                </View>

                <View>
                    <Text b md right>{item.code === Consts.tcn.rmd.code || item.action === Consts.tcn.rmi.code ? '' : '-'}PHP {item.amount.toFixed(2)}</Text>
                    <TouchableOpacity onPress={() => this.handleViewDetails(item)}>
                        <Text brand right>View details</Text>
                    </TouchableOpacity>
                </View>
            </Row>

            <HR />
        </>
    )

    render() {

        const {list, timeframe_filters, type_filters, show_filters, show_timeframe_filters, show_type_filters, loading} = this.state

        return (
            <Provider>
                <View style={style.toolbar}>
                    <ButtonText icon='filter-variant' t='Filters' onPress={this.handleToggleFilters} />
                </View>

                <HR />

                {show_filters &&
                <>
                    <View style={{paddingHorizontal:Metrics.md,paddingVertical:Metrics.rg}}>
                        <Menu
                            style={{width:MENU_WIDTH}}
                            visible={show_timeframe_filters}
                            onDismiss={this.handleToggleTimeframeFilters}
                            anchor={
                                <TouchableOpacity onPress={this.handleToggleTimeframeFilters}>
                                    <Row bw style={style.btn}>
                                        <Text gray>Transaction Timeframe</Text>
                                        <Icon name='down' color={Colors.gray} />
                                    </Row>
                                </TouchableOpacity>
                            }
                        >
                            {timeframe_filters.map((f, i) => <ButtonText t={f} onPress={this.handleToggleTimeframeFilters} />)}
                        </Menu>

                        <Menu
                            style={{width:MENU_WIDTH}}
                            visible={show_type_filters}
                            onDismiss={this.handleToggleTypeFilters}
                            anchor={
                                <TouchableOpacity onPress={this.handleToggleTypeFilters}>
                                    <Row bw style={style.btn}>
                                        <Text gray>Transaction Type</Text>
                                        <Icon name='down' color={Colors.gray} />
                                    </Row>
                                </TouchableOpacity>
                            }
                        >
                            {type_filters.map((f, i) => <ButtonText t={f} onPress={this.handleToggleTypeFilters} />)}
                        </Menu>
                    </View>

                    <HR />
                </>
                }

                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    loading={loading}
                />
            </Provider>
        )
    }
}

const style = StyleSheet.create({
    toolbar: {
        alignItems:'flex-end',
        padding:Metrics.md
    },
    btn: {
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.gray,
        borderRadius:Metrics.sm,
        padding:Metrics.md,
        marginVertical:Metrics.sm
    },
    item: {
        paddingHorizontal:Metrics.md,
        paddingVertical:Metrics.md
    }
})

export default TransactionHistory