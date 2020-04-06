import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Provider, FlatList, Text, Row, HeaderRight, HR, Spacer, ButtonText, ButtonIcon, StaticInput, Picker, MonthPicker, DayPicker, YearPicker} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts, Say, Func} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/AntDesign'
//import RNHTMLtoPDF from 'react-native-html-to-pdf'

const moment = require('moment')
const NOW = moment()
const CURRENT_YEAR = parseInt(NOW.format('YYYY'))
const MIN_YEAR = CURRENT_YEAR - 12

const ItemUI = ({data, onPress}) => (
    <>
        <Row bw style={style.item}>
            <View>
                {((data.transtype === Consts.tcn.skp.code || data.transtype === Consts.tcn.wdc.code) && data.status == 0) && <Text mute>PENDING</Text>}
                {((data.transtype === Consts.tcn.skp.code || data.transtype === Consts.tcn.wdc.code) && data.iscancelled == 1) && <Text mute>CANCELLED</Text>}
                <Text b md>{Consts.tcn[data.transtype].short_desc}</Text>
                <Text mute>{moment(data.transdate).format('MM/DD/YYYY')}</Text>
            </View>

            <View>
                <Text b md right>{data.transtype === Consts.tcn.rmd.code || data.transtype === Consts.tcn.rmi.code ? '' : '-'}PHP {Func.formatToRealCurrency(data.amount)}</Text>
                <TouchableOpacity onPress={() => onPress(data)}>
                    <Text brand right>View details</Text>
                </TouchableOpacity>
            </View>
        </Row>

        <HR />
    </>
)

class Scrn extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params = {}} = navigation.state
        return {
            title:'Transactions',
            /*headerRight: (
                <HeaderRight>
                    <ButtonIcon icon={<Icon name='download' color={Colors.light} size={Metrics.icon.sm} />} onPress={params.downloadHistory} />
                </HeaderRight>
            )*/
        }
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
                value:'add_money',
                label:'Add Money'
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
                label:Consts.tcn.stw.short_desc
            },
            {
                value:Consts.tcn.skp.code,
                label:Consts.tcn.skp.short_desc
            },
            {
                value:Consts.tcn.stb.code,
                label:Consts.tcn.stb.short_desc
            },
            {
                value:Consts.tcn.rmd.code,
                label:Consts.tcn.rmd.long_desc
            },
            {
                value:Consts.tcn.rmi.code,
                label:Consts.tcn.rmi.long_desc
            },
            {
                value:Consts.tcn.wdc.code,
                label:Consts.tcn.wdc.short_desc
            }
        ],
        selected_type:{
            value:'all_types'
        },
        selected_timeframe:{
            value:'all_time'
        },
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
        loading:true,
        refreshing:false
    }

    componentDidMount = () => {
        this.props.navigation.setParams({downloadHistory:this.handleDownload})
        InteractionManager.runAfterInteractions(this.getData)
    }

    handleDownload = async () => {
        let file = await RNHTMLtoPDF.convert({
            html: "<img src='' />",
            fileName: 'ML WALLET PDF',
            directory: 'Documents'
        })

        Say.some(file.filePath)
    }

    getData = async () => {
        const {walletno} = this.props.user
        const {month_from, day_from, year_from, month_to, day_to, year_to, selected_timeframe, selected_type} = this.state
        let list = [], from = '', to = ''

        try {
            if(selected_timeframe.value == 'past_week') {
                let past_week = NOW.subtract(1,'weeks')
                from = past_week.startOf('week').format('YYYY-MM-DD')
                to = past_week.endOf('week').format('YYYY-MM-DD')
            }
            else if(selected_timeframe.value == 'past_month') {
                let past_month = NOW.subtract(1,'months')
                from = past_month.startOf('month').format('YYYY-MM-DD')
                to = past_month.endOf('month').format('YYYY-MM-DD')
            }
            else if(selected_timeframe.value == 'past_year') {
                from = `${CURRENT_YEAR - 1}-01-31`
                to = `${CURRENT_YEAR - 1}-12-31`
            }
            else if(selected_timeframe.value == 'custom') {
                from = `${year_from}-${month_from}-${day_from}`
                to = `${year_to}-${month_to}-${day_to}`
            }

            list = await API.getTransactionHistory({
                walletno,
                from,
                to,
                type:selected_type.value == 'all_types' ? '' : selected_type.value
            })
        }
        catch(err) {
            Say.err(_('500'))
        }

        this.setState({
            list,
            loading:false,
            refreshing:false
        })
    }

    handleToggleFilters = () => this.setState(prevState => ({show_filters:!prevState.show_filters}))

    handleSelectTimeframeFilter = (selected_timeframe = {}) => {
        let month_from = '', day_from = '', year_from = ''
        let month_to = '', day_to = '', year_to = ''

        if(selected_timeframe.value == 'custom') {
            month_from = NOW.format('MM')
            day_from = NOW.format('DD')
            year_from = CURRENT_YEAR
            month_to = NOW.format('MM')
            day_to = NOW.format('DD')
            year_to = CURRENT_YEAR
        }

        this.setState({
            month_from,
            day_from,
            year_from,
            month_to,
            day_to,
            year_to,
            selected_timeframe
        },this.handleRefresh)
    }

    handleSelectTypeFilter = (selected_type = {}) => this.setState({selected_type},this.handleRefresh)

    handleViewDetails = item => {
        let params = {
            _from:'history',
            type:item.transtype,
            kptn:item.transactionno,
            transaction: {
                contact_no:item.mobileno,
                amount:item.amount,
                charges:item.charge,
                fixed_charge:item.fixedcharge,
                convenience_fee:item.conveniencefee,
                total:item.totalamount,
                user:{
                    fname:this.props.user.fname,
                    lname:this.props.user.lname
                }
            },
            cancellable:false,
            transdate:item.transdate
        }

        if(params.type == Consts.tcn.skp.code || params.type == Consts.tcn.wdc.code) {
            if(item.status == 1 || item.isclaimed == 1) params.transaction.status == 'success'
            if(item.isclaimed == 0) {
                if(item.cancelled == 0) params.cancellable = true
                else params.cancellable = false
            }
        }

        this.props.navigation.navigate('TransactionReceipt',params)
    }

    handleChangeMonthFrom = () => this.setState({showMonthFrom:true})

    handleChangeDayFrom = () => this.setState({showDayFrom:true})

    handleChangeYearFrom = () => this.setState({showYearFrom:true})

    handleSelectMonthFrom = month_from => this.setState({month_from,day_from:1},this.handleRefresh)

    handleSelectDayFrom = day_from => this.setState({day_from},this.handleRefresh)

    handleSelectYearFrom = year_from => this.setState({year_from},this.handleRefresh)

    handleHideMonthFromPicker = () => this.setState({showMonthFrom:false})

    handleHideDayFromPicker = () => this.setState({showDayFrom:false})

    handleHideYearFromPicker = () => this.setState({showYearFrom:false})

    handleChangeMonthTo = () => this.setState({showMonthTo:true})

    handleChangeDayTo = () => this.setState({showDayTo:true})

    handleChangeYearTo= () => this.setState({showYearTo:true})

    handleSelectMonthTo= month_to => this.setState({month_to,day_to:1},this.handleRefresh)

    handleSelectDayTo = day_to => this.setState({day_to},this.handleRefresh)

    handleSelectYearTo= year_to => this.setState({year_to},this.handleRefresh)

    handleHideMonthToPicker = () => this.setState({showMonthTo:false})

    handleHideDayToPicker = () => this.setState({showDayTo:false})

    handleHideYearToPicker = () => this.setState({showYearTo:false})

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderItem = ({item}) => <ItemUI data={item} onPress={this.handleViewDetails} />

    render() {

        const {list, timeframe_filters, type_filters, selected_type, selected_timeframe, show_filters, showMonthFrom, showMonthTo, showDayFrom, showDayTo, showYearFrom, showYearTo, month_from, month_to, day_from, day_to, year_from, year_to, loading, refreshing} = this.state

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
                                    value={month_to ? moment(month_to,'M').format('MMM') : null}
                                    onPress={this.handleChangeMonthTo}
                                    style={{flex:2}}
                                />
                                <Spacer h xs/>
                                <StaticInput
                                    label='Day'
                                    value={day_to}
                                    onPress={this.handleChangeDayTo}
                                    style={{flex:1}}
                                />
                                <Spacer h xs/>
                                <StaticInput
                                    label='Year'
                                    value={year_to}
                                    onPress={this.handleChangeYearTo}
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
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    placeholder={{}}
                />

                <MonthPicker visible={showMonthFrom} onSelect={this.handleSelectMonthFrom} onDismiss={this.handleHideMonthFromPicker} />

                <DayPicker month={month_from} visible={showDayFrom} onSelect={this.handleSelectDayFrom} onDismiss={this.handleHideDayFromPicker} />

                <YearPicker visible={showYearFrom} max={CURRENT_YEAR} min={MIN_YEAR} onSelect={this.handleSelectYearFrom} onDismiss={this.handleHideYearFromPicker} />

                <MonthPicker visible={showMonthTo} onSelect={this.handleSelectMonthTo} onDismiss={this.handleHideMonthToPicker} />

                <DayPicker month={month_to} visible={showDayTo} onSelect={this.handleSelectDayTo} onDismiss={this.handleHideDayToPicker} />

                <YearPicker visible={showYearTo} max={CURRENT_YEAR} min={MIN_YEAR} onSelect={this.handleSelectYearTo} onDismiss={this.handleHideYearToPicker} />   
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

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)