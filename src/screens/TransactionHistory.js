import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {Provider, FlatList, Text, Row, HeaderRight, HR, Spacer, ButtonText, StaticInput, Picker, MonthPicker, DayPicker, YearPicker} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts, Say} from '../utils'
import Icon from 'react-native-vector-icons/AntDesign'

const moment = require('moment')

class Scrn extends React.Component {

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
                value:'all_time',
                label:'All Time'
            },
            {
                value:'past_week',
                label:'This Past Week'
            },
            {
                value:'past_month',
                label:'This Past Month'
            },
            {
                value:'past_year',
                label:'This Past year'
            },
            {
                value:'custom',
                label:'Custom'
            }
        ],
        type_filters:[
            {
                value:'all_types',
                label:'All Types'
            },
            {
                value:Consts.tcn.bpm.code,
                label:Consts.tcn.bpm.short_desc
            },
            {
                value:Consts.tcn.bul.code,
                label:Consts.tcn.bul.short_desc
            },
            {
                value:Consts.tcn.stw.code,
                label:Consts.tcn.stw.submit_text
            },
            {
                value:Consts.tcn.rmd.code,
                label:Consts.tcn.rmd.submit_text
            },
            {
                value:Consts.tcn.wdc.code,
                label:Consts.tcn.wdc.submit_text
            }
        ],
        selected_type:{},
        selected_timeframe:{},
        show_filters:false,
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

    handleSelectTimeframeFilter = (selected_timeframe = {}) => this.setState({selected_timeframe})

    handleSelectTypeFilter = (selected_type = {}) => this.setState({selected_type})

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

    renderItem = ({item}) => (
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

        const {list, timeframe_filters, type_filters, selected_type, selected_timeframe, show_filters, showMonthFrom, showMonthTo, showDayFrom, showDayTo, showYearFrom, showYearTo, month_from, month_to, day_from, day_to, year_from, year_to, loading} = this.state

        return (
            <Provider>
                <View style={style.toolbar}>
                    <ButtonText icon='filter-variant' t='Filters' onPress={this.handleToggleFilters} />
                </View>

                <HR />

                {show_filters &&
                <>
                    <View style={{paddingHorizontal:Metrics.md,paddingVertical:Metrics.rg}}>
                        <Picker
                            selected={selected_timeframe.label}
                            items={timeframe_filters}
                            placeholder='Transaction Timeframe'
                            onChoose={this.handleSelectTimeframeFilter}
                        />

                        {selected_timeframe.value === 'custom' &&
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

                        <Picker
                            selected={selected_type.label}
                            items={type_filters}
                            placeholder='Transaction Type'
                            onChoose={this.handleSelectTypeFilter}
                        />
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
    item: {
        paddingHorizontal:Metrics.md,
        paddingVertical:Metrics.md
    }
})

export default Scrn