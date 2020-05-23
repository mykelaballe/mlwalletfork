import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import {Provider, FlatList, Text, Row, Modal, Ripple, HeaderRight, ScrollFix, HR, Spacer, Button, ButtonText, ButtonIcon, StaticInput, Picker, MonthPicker, DayPicker, YearPicker} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts, Say, Func} from '../utils'
import {API} from '../services'
import Icon from 'react-native-vector-icons/AntDesign'
//import RNHTMLtoPDF from 'react-native-html-to-pdf'

const {height} = Dimensions.get('window')
const MAX_LIST_HEIGHT = parseInt(height / 3)
const moment = require('moment')
//const NOW = moment()
const CURRENT_YEAR = parseInt(moment().format('YYYY'))
const MIN_YEAR = CURRENT_YEAR - 12

const ItemUI = ({data, onPress}) => (
    <>
        <Row bw style={style.item}>
            <View>
                {((data.transtype === Consts.tcn.skp.code || data.transtype === Consts.tcn.wdc.code) && (data.isclaimed == 0 && data.iscancelled == 0)) && <Text mute>PENDING</Text>}
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
            title:'Transaction History',
            /*headerRight: (
                <HeaderRight>
                    <ButtonIcon icon={<Icon name='download' color={Colors.light} size={Metrics.icon.sm} />} onPress={params.downloadHistory} />
                </HeaderRight>
            )*/
        }
    }

    state = {
        balance:this.props.user.balance,
        list:[],
        timeframe_filters:[
            {
                value:'all_time',
                label:'All Transactions'
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
                label:'This Past Year'
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
                value:Consts.tcn.adm.code,
                label:Consts.tcn.adm.short_desc
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
            },
            {
                value:'pending',
                label:'Pending'
            },
            {
                value:'',
                label:'ML Express'
            }
        ],
        selected_type:{
            value:'all_types'
        },
        selected_timeframe:{
            value:'all_time'
        },
        show_filters:false,
        show_timeframe_filter:false,
        show_timeframe_custom_filter:false,
        show_type_filter:false,
        showMonthFrom:false,
        showMonthTo:false,
        showDayFrom:false,
        showDayTo:false,
        showYearFrom:false,
        showYearTo:false,
        month_from:'',
        month_to:'',
        day_from:'',
        day_to:'',
        year_from:'',
        year_to:'',
        loading:true,
        refreshing:false
    }

    componentDidMount = () => {
        this.props.navigation.setParams({downloadHistory:this.handleDownload})
        InteractionManager.runAfterInteractions(this.getData)
    }

    componentDidUpdate = (prevProps, prevState) => {
        /*const {params = {}} = this.props.navigation.state
        if(params.refresh) {
            this.props.navigation.setParams({refresh:false})
            this.handleRefresh()
        }*/

        if(prevProps.user.balance != this.props.user.balance) {
            this.setState({balance:this.props.user.balance})
            this.handleRefresh()
        }
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
        const now = moment()
        const {walletno} = this.props.user
        const {month_from, day_from, year_from, month_to, day_to, year_to, selected_timeframe, selected_type} = this.state
        let list = [], from = '', to = ''

        try {
            if(selected_timeframe.value == 'past_week') {
                let past_week = now.subtract(1,'weeks')
                from = past_week.startOf('week').format('YYYY-MM-DD')
                to = past_week.endOf('week').format('YYYY-MM-DD')
            }
            else if(selected_timeframe.value == 'past_month') {
                let past_month = now.subtract(1,'months')
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
                type:!selected_type.value || selected_type.value == 'all_types' ? '' : selected_type.value
            })
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            list,
            loading:false,
            refreshing:false
        })
    }

    handleToggleFilters = () => this.setState(prevState => ({show_filters:!prevState.show_filters}))

    handleSelectTimeframeFilter = (selected_timeframe = {}) => {
        const now = moment()
        let {month_from, day_from, year_from, month_to, day_to, year_to} = this.state
        //let month_from = '', day_from = '', year_from = ''
        //let month_to = '', day_to = '', year_to = ''

        if(selected_timeframe.value == 'custom') {
            if(this.state.selected_timeframe.value != 'custom') {
                month_from = now.format('MM')
                day_from = now.format('DD')
                year_from = CURRENT_YEAR
                month_to = now.format('MM')
                day_to = now.format('DD')
                year_to = CURRENT_YEAR
            }

            this.setState({show_timeframe_custom_filter:true})
        }

        this.setState({
            month_from,
            day_from,
            year_from,
            month_to,
            day_to,
            year_to,
            selected_timeframe
        },() => {
            if(selected_timeframe.value != 'custom') this.handleRefresh()
        })
    }

    handleSelectTypeFilter = (selected_type = {}) => this.setState({selected_type},this.handleRefresh)

    handleViewDetails = item => {
        let params = {
            _from:'history',
            type:item.transtype,
            //controlno:item.transactionno,
            kptn:item.transactionno,
            transaction: {
                walletno:item.receiverwalletno,
                contact_no:item.mobileno,
                receiver: {
                    fullname:item.receiverfullname,
                    firstname:item.receiverfirstname,
                    lastname:item.receiverlastname,
                    middlename:item.receivermiddlename,
                },
                biller_partner_name:item.partnername,
                bank:item.partnername,
                partner:item.partnername,
                account_name:item.accountname,
                account_no:item.accountno,
                sender:item.sendername,
                currency:item.currency,
                notes:item.notes,
                amount:item.amount,
                charges:item.charge,
                fixed_charge:item.charge,
                convenience_fee:15,
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
                if(item.iscancelled == 0) params.cancellable = true
                else {
                    params.cancellable = false
                    params.transaction.status = 'cancelled'
                }
            }
        }

        this.props.navigation.navigate('TransactionReceipt',params)
    }

    handleChangeMonthFrom = () => this.setState({showMonthFrom:true})

    handleChangeDayFrom = () => this.setState({showDayFrom:true})

    handleChangeYearFrom = () => this.setState({showYearFrom:true})

    handleSelectMonthFrom = month_from => this.setState({month_from,day_from:1})

    handleSelectDayFrom = day_from => this.setState({day_from})

    handleSelectYearFrom = year_from => this.setState({year_from})

    handleHideMonthFromPicker = () => this.setState({showMonthFrom:false})

    handleHideDayFromPicker = () => this.setState({showDayFrom:false})

    handleHideYearFromPicker = () => this.setState({showYearFrom:false})

    handleChangeMonthTo = () => this.setState({showMonthTo:true})

    handleChangeDayTo = () => this.setState({showDayTo:true})

    handleChangeYearTo= () => this.setState({showYearTo:true})

    handleSelectMonthTo= month_to => this.setState({month_to,day_to:1})

    handleSelectDayTo = day_to => this.setState({day_to})

    handleSelectYearTo= year_to => this.setState({year_to})

    handleHideMonthToPicker = () => this.setState({showMonthTo:false})

    handleHideDayToPicker = () => this.setState({showDayTo:false})

    handleHideYearToPicker = () => this.setState({showYearTo:false})

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderItem = ({item}) => {
        if(typeof Consts.tcn[item.transtype] === 'undefined') return null

        return (
            <ScrollFix>
                <ItemUI data={item} onPress={this.handleViewDetails} />
            </ScrollFix>
        )
    }

    render() {

        const {list, timeframe_filters, type_filters, selected_type, selected_timeframe, show_filters, show_timeframe_filter, show_timeframe_custom_filter, show_type_filter, showMonthFrom, showMonthTo, showDayFrom, showDayTo, showYearFrom, showYearTo, month_from, month_to, day_from, day_to, year_from, year_to, loading, refreshing} = this.state

        return (
            <Provider>
                <View style={style.toolbar}>
                    <ButtonText icon='filter-variant' t='Filters' onPress={this.handleToggleFilters} />
                </View>

                <HR />

                <Modal
                    visible={show_type_filter}
                    title='Transaction Type'
                    onDismiss={() => this.setState({show_type_filter:false})}
                    content={
                            <FlatList
                                style={{maxHeight:MAX_LIST_HEIGHT}}
                                data={type_filters}
                                showsVerticalScrollIndicator
                                renderItem={({item}) => (
                                    <Ripple onPress={() => {
                                        this.setState({show_type_filter:false})
                                        this.handleSelectTypeFilter(item)
                                    }} style={{paddingVertical:Metrics.rg}}>
                                        <Text md center>{item.label}</Text>
                                    </Ripple>
                                )}
                            />
                    }
                />

                <Modal
                    visible={show_timeframe_filter}
                    title='Transaction Timeframe'
                    onDismiss={() => this.setState({show_timeframe_filter:false})}
                    content={
                        <FlatList
                            style={{maxHeight:400}}
                            data={timeframe_filters}
                            showsVerticalScrollIndicator
                            renderItem={({item}) => (
                                <Ripple onPress={() => {
                                    this.setState({show_timeframe_filter:false})
                                    this.handleSelectTimeframeFilter(item)
                                }} style={{paddingVertical:Metrics.rg}}>
                                    <Text md center>{item.label}</Text>
                                </Ripple>
                            )}
                        />
                    }
                />

                <Modal
                    visible={show_timeframe_custom_filter}
                    title='Custom Transaction Timeframe'
                    onDismiss={() => this.setState({show_timeframe_custom_filter:false})}
                    content={
                        <>
                            <Text sm mute>From</Text>
                            <Row bw>
                                <StaticInput
                                    label='Month'
                                    value={month_from ? moment(month_from,'M').format('MMM') : null}
                                    onPress={this.handleChangeMonthFrom}
                                    style={{flex:1}}
                                />
                                <Spacer h xs />
                                <StaticInput
                                    label='Day'
                                    value={day_from}
                                    onPress={this.handleChangeDayFrom}
                                />
                                <Spacer h xs />
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
                                    style={{flex:1}}
                                />
                                <Spacer h xs />
                                <StaticInput
                                    label='Day'
                                    value={day_to}
                                    onPress={this.handleChangeDayTo}
                                />
                                <Spacer h xs />
                                <StaticInput
                                    label='Year'
                                    value={year_to}
                                    onPress={this.handleChangeYearTo}
                                    style={{flex:1}}
                                />
                            </Row>
                            <Button t='Apply' onPress={() => this.setState({show_timeframe_custom_filter:false},this.handleRefresh)} />
                        </>
                    }
                />

                {show_filters &&
                <>
                    <View style={{paddingHorizontal:Metrics.md,paddingVertical:Metrics.rg}}>
                        {/*<Picker
                            selected={selected_timeframe.label}
                            items={timeframe_filters}
                            placeholder='Transaction Timeframe'
                            onChoose={this.handleSelectTimeframeFilter}
                        />*/}
                        <StaticInput
                            label='Transaction Timeframe'
                            value={selected_timeframe.label}
                            onPress={() => this.setState({show_timeframe_filter:true})}
                            rightContent={
                                selected_timeframe.label ? <TouchableOpacity onPress={() => this.handleSelectTimeframeFilter()}>
                                    <Icon name='closecircle' color={Colors.gray} size={Metrics.icon.sm} />
                                </TouchableOpacity> : null
                            }
                            bottomContent={
                                selected_timeframe.value == 'custom' ? <Text>
                                    {`${day_from} ${moment(month_from,'M').format('MMM')} ${year_from} - ${day_to} ${moment(month_to,'M').format('MMM')} ${year_to}`}
                                </Text> : null
                            }
                        />

                        {/*selected_timeframe.value === 'custom' &&
                        <View style={{marginVertical:Metrics.rg}}>
                            <Text sm mute>From</Text>
                            <Row bw>
                                <StaticInput
                                    label='Month'
                                    value={month_from ? moment(month_from,'M').format('MMM') : null}
                                    onPress={this.handleChangeMonthFrom}
                                    style={{flex:1}}
                                />
                                <Spacer h xs />
                                <StaticInput
                                    label='Day'
                                    value={day_from}
                                    onPress={this.handleChangeDayFrom}
                                />
                                <Spacer h xs />
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
                                    style={{flex:1}}
                                />
                                <Spacer h xs />
                                <StaticInput
                                    label='Day'
                                    value={day_to}
                                    onPress={this.handleChangeDayTo}
                                />
                                <Spacer h xs />
                                <StaticInput
                                    label='Year'
                                    value={year_to}
                                    onPress={this.handleChangeYearTo}
                                    style={{flex:1}}
                                />
                            </Row>
                        </View>
                        */}

                        {/*<Picker
                            selected={selected_type.label}
                            items={type_filters}
                            placeholder='Transaction Type'
                            onChoose={this.handleSelectTypeFilter}
                        />*/}

                        <StaticInput
                            label='Transaction Type'
                            value={selected_type.label}
                            onPress={() => this.setState({show_type_filter:true})}
                            rightContent={
                                selected_type.label ? <TouchableOpacity onPress={() => this.handleSelectTypeFilter()}>
                                    <Icon name='closecircle' color={Colors.gray} size={Metrics.icon.sm} />
                                </TouchableOpacity> : null
                            }
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
                    skeleton
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