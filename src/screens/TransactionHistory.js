import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity, Dimensions} from 'react-native'
import {FlatList, Text, Row, HeaderRight, HR, Spacer, ButtonText, StaticInput, MonthPicker, DayPicker, YearPicker} from '../components'
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
            {
                type:'all_time',
                label:'All Time'
            },
            {
                type:'past_week',
                label:'This Past Week'
            },
            {
                type:'past_month',
                label:'This Past Month'
            },
            {
                type:'past_year',
                label:'This Past year'
            },
            {
                type:'custom',
                label:'Custom'
            }
        ],
        type_filters:[
            {
                type:'all_types',
                label:'All Types'
            },
            {
                type:Consts.tcn.bpm.code,
                label:Consts.tcn.bpm.short_desc
            },
            {
                type:Consts.tcn.bul.code,
                label:Consts.tcn.bul.short_desc
            },
            {
                type:Consts.tcn.stw.code,
                label:Consts.tcn.stw.submit_text
            },
            {
                type:Consts.tcn.rmd.code,
                label:Consts.tcn.rmd.submit_text
            },
            {
                type:Consts.tcn.wdc.code,
                label:Consts.tcn.wdc.submit_text
            }
        ],
        selected_type:null,
        selected_timeframe:null,
        show_filters:false,
        show_timeframe_filters:false,
        show_type_filters:false,
        showMonthFrom:false,
        showMonthTo:false,
        showDayFrom:false,
        showDayTo:false,
        showYearFrom:false,
        showYearTo:false,
        month_from:null,
        month_to:null,
        day_from:null,
        day_to:null,
        year_from:null,
        year_to:null,
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

    handleSelectTimeframeFilter = selected_timeframe => {
        this.setState({selected_timeframe})
        this.handleToggleTimeframeFilters()
    }

    handleSelectTypeFilter = selected_type => {
        this.setState({selected_type})
        this.handleToggleTypeFilters()
    }

    handleClearTimeframeFilter = () => this.setState({selected_timeframe:null})

    handleClearTypeFilter = () => this.setState({selected_type:null})

    handleViewDetails = item => {
        this.props.navigation.navigate('TransactionReceipt',{
            type:Consts.tcn.stw.code,
            amount:item.amount,
            status:'success',
            _from:'history'
        })
    }

    handleChangeMonthFrom = () => this.setState({showMonthFrom:true})

    handleChangeDayFrom = () => this.setState({showDayFrom:true})

    handleChangeYearFrom = () => this.setState({showYearFrom:true})

    handleSelectMonthFrom = () => {}

    handleSelectDayFrom = () => {}

    handleSelectYearFrom = () => {}

    handleHideMonthFromPicker = () => this.setState({showMonthFrom:false})

    handleHideDayFromPicker = () => this.setState({showDayFrom:false})

    handleHideYearFromPicker = () => this.setState({showYearFrom:false})

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

        const {list, timeframe_filters, type_filters, selected_type, selected_timeframe, show_filters, show_timeframe_filters, show_type_filters, showMonthFrom, showMonthTo, showDayFrom, showDayTo, showYearFrom, showYearTo, month_from, month_to, day_from, day_to, year_from, year_to, loading} = this.state

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
                                        <Text gray>{selected_timeframe ? selected_timeframe.label : 'Transaction Timeframe'}</Text>
                                        {!selected_timeframe && <Icon name='down' color={Colors.gray} />}

                                        {selected_timeframe &&
                                        <TouchableOpacity onPress={this.handleClearTimeframeFilter}>
                                            <Icon name='closecircle' color={Colors.gray} size={Metrics.icon.sm} />
                                        </TouchableOpacity>
                                        }
                                    </Row>
                                </TouchableOpacity>
                            }
                        >
                            {timeframe_filters.map((f, i) => <ButtonText key={i} t={f.label} onPress={() => this.handleSelectTimeframeFilter(f)} />)}
                        </Menu>

                        {(selected_timeframe && selected_timeframe.type === 'custom') &&
                        <View style={{marginVertical:Metrics.rg}}>
                            <Text sm mute>From</Text>
                            <Row bw>
                                <StaticInput
                                    label='Month'
                                    value={month_from ? moment(month_from,'M').format('MMM') : null}
                                    onPress={this.handleChangeMonthFrom}
                                    style={{flex:2}}
                                />
                                <Spacer h xs/>
                                <StaticInput
                                    label='Day'
                                    value={day_from}
                                    onPress={this.handleChangeDayFrom}
                                    style={{flex:1}}
                                />
                                <Spacer h xs/>
                                <StaticInput
                                    label='Year'
                                    value={year_from}
                                    onPress={this.handleChangeYearFrom}
                                    style={{flex:1}}
                                />
                            </Row>

                            <Text sm mute>To</Text>
                            <Row bw>
                                <StaticInput
                                    label='Month'
                                    value={month_from ? moment(month_from,'M').format('MMM') : null}
                                    onPress={this.handleChangeMonthFrom}
                                    style={{flex:2}}
                                />
                                <Spacer h xs/>
                                <StaticInput
                                    label='Day'
                                    value={day_from}
                                    onPress={this.handleChangeDayFrom}
                                    style={{flex:1}}
                                />
                                <Spacer h xs/>
                                <StaticInput
                                    label='Year'
                                    value={year_from}
                                    onPress={this.handleChangeYearFrom}
                                    style={{flex:1}}
                                />
                            </Row>
                        </View>
                        }

                        <Menu
                            style={{width:MENU_WIDTH}}
                            visible={show_type_filters}
                            onDismiss={this.handleToggleTypeFilters}
                            anchor={
                                <TouchableOpacity onPress={this.handleToggleTypeFilters}>
                                    <Row bw style={style.btn}>
                                        <Text gray>{selected_type ? selected_type.label : 'Transaction Type'}</Text>
                                        {!selected_type && <Icon name='down' color={Colors.gray} />}

                                        {selected_type &&
                                        <TouchableOpacity onPress={this.handleClearTypeFilter}>
                                            <Icon name='closecircle' color={Colors.gray} size={Metrics.icon.sm} />
                                        </TouchableOpacity>
                                        }
                                    </Row>
                                </TouchableOpacity>
                            }
                        >
                            {type_filters.map((f, i) => <ButtonText key={i} t={f.label} onPress={() => this.handleSelectTypeFilter(f)} />)}
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

                <MonthPicker visible={showMonthFrom} onSelect={this.handleSelectMonthFrom} onDismiss={this.handleHideMonthFromPicker} />

                <DayPicker visible={showDayFrom} onSelect={this.handleSelectDayFrom} onDismiss={this.handleHideDayFromPicker} />

                <YearPicker visible={showYearFrom} onSelect={this.handleSelectYearFrom} onDismiss={this.handleHideYearFromPicker} />   
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