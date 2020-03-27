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
        let list = []

        try {
            list = await API.getTransactionHistory(walletno)
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

    handleSelectTimeframeFilter = (selected_timeframe = {}) => this.setState({selected_timeframe})

    handleSelectTypeFilter = (selected_type = {}) => this.setState({selected_type})

    handleViewDetails = item => {
        return false
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

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderItem_ = () => <View />

    renderItem = ({item}) => (
        <>
            <Row bw style={style.item}>
                <View>
                    <Text mute>{item.status !== 'success' ? item.status.toUpperCase() : ''}</Text>
                    <Text b md>{item.label}</Text>
                    <Text mute>{moment(item.date).format('MM/DD/YYYY')}</Text>
                </View>

                <View>
                    <Text b md right>{item.code === Consts.tcn.rmd.code || item.action === Consts.tcn.rmi.code ? '' : '-'}PHP {Func.formatToCurrency(item.amount)}</Text>
                    <TouchableOpacity onPress={() => this.handleViewDetails(item)}>
                        <Text brand right>View details</Text>
                    </TouchableOpacity>
                </View>
            </Row>

            <HR />
        </>
    )

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
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    placeholder={{}}
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

const mapStateToProps = state => ({
    user: state.user.data
})

export default connect(mapStateToProps)(Scrn)