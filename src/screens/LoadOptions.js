import React from 'react'
import {View, StyleSheet, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import {Screen, Footer, Headline, FlatList, Text, Row, Spacer, Button, TextInput, LoadPromo} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Consts, Func, Say} from '../utils'
import {API} from '../services'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.lg * 2)

const ItemRegularUI = props => {
    let bgColor = props.data.selected ? Colors.brand : Colors.light
    let txtColor = props.data.selected ? Colors.light : Colors.dark

    return (
        <View style={style.itemRegular}>
            <TouchableOpacity onPress={() => props.onPress(props.index)} style={[style.itemInnerRegular,{backgroundColor:bgColor}]}>
                <Text center color={txtColor}>{Consts.currency.PH}</Text>
                <Text center lg color={txtColor}>{props.data.amount}</Text>
            </TouchableOpacity>
        </View>
    )
}

class LoadOptions extends React.Component {

    static navigationOptions = {
        title:'Buy Load'
    }

    state = {
        amount:'',
        promo:null,
        regulars:[],
        promo_codes:[],
        show_regulars:true,
        loading:true
    }

    componentDidMount = () => this.getData()

    getData = async () => {
        const {network, contact_no} = this.props.navigation.state.params
        let regulars = [], promo_codes = []

        try {
            let res = await API.getLoadOptions(network.value, contact_no)
            //promo_codes = network.promos
            regulars = res.regulars
            promo_codes = res.promos
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            regulars,
            promo_codes,
            loading:false
        })
    }

    handleChangeAmount = amount => this.setState({amount})

    handleSubmit = async load => {
        const {amount} = this.state
        const {navigate, state: {params}} = this.props.navigation

        if(Func.formatToCurrency(amount) <= 0) Say.warn(_('89'))
        else {
            navigate('TransactionReview',{
                ...params,
                load,
                transaction: {
                    ...this.state,
                    network:params.network,
                    receiverno:params.receiverno,
                    name:params.name,
                    contact_no:params.contact_no
                },
                status:'success'
            })
        }
    }

    handleShowRegulars = () => this.setState({show_regulars:true})

    handleShowPromoCodes = () => this.setState({show_regulars:false})

    handleSelectRegular = index => {
        let regulars = this.state.regulars.slice()
        let promo_codes = this.state.promo_codes.slice()

        promo_codes.map(r => r.collapsed = false)

        regulars.map(r => r.selected = false)
        regulars[index].selected = true

        this.setState({
            regulars,
            promo_codes,
            promo:regulars[index],
            amount:Func.formatToCurrency(regulars[index].amount)
        })
    }

    handleSelectPromoCode = index => {
        let regulars = this.state.regulars.slice()
        let promo_codes = this.state.promo_codes.slice()

        regulars.map(r => r.selected = false)

        promo_codes.map(r => r.collapsed = false)
        promo_codes[index].collapsed = true

        this.setState({
            regulars,
            promo_codes,
            promo:promo_codes[index],
            amount:Func.formatToCurrency(promo_codes[index].Amount)
        })

    }

    handleSubmitAmount = () => {
        this.setState(prevState => ({
            amount:Func.formatToCurrency(prevState.amount)
        }))
    }

    renderRegulars = ({item, index}) => <ItemRegularUI index={index} data={item} onPress={this.handleSelectRegular} />

    renderPromoCodes = ({item, index}) => <LoadPromo index={index} data={item} onPress={this.handleSelectPromoCode} />

    render() {

        const {network, contact_no} = this.props.navigation.state.params
        const {amount, regulars, promo_codes, show_regulars, loading} = this.state
        let ready = false

        if(amount) ready = true

        return (
            <>

                <Screen ns>
                    <Text b xl center>{Func.formatToPHMobileNumberFull(contact_no)}</Text>
                    <Text b center>{network.label}</Text>

                    <Spacer />

                    <Row ar>
                        <Button mode={show_regulars ? '' : 'outlined'} style={{flex:1}} t='Regular' onPress={this.handleShowRegulars} />
                        <Spacer h sm />
                        <Button mode={!show_regulars ? '' : 'outlined'} style={{flex:1}} t='Promo Code' onPress={this.handleShowPromoCodes} />
                    </Row>

                <Spacer sm />

                {show_regulars &&
                <>
                    {regulars.length > 0 && <Text center mute md>Choose the load amount below.</Text>}

                    {/*<Spacer />

                    <TextInput
                        label={`Load Amount (${Consts.currency.PH})`}
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleSubmitAmount}
                        keyboardType='numeric'
                    />*/}

                    <Spacer />
                    
                    <FlatList
                        data={regulars}
                        renderItem={this.renderRegulars}
                        numColumns={3}
                        loading={loading}
                        placeholder={{text:'No options available'}}
                        //contentContainerStyle={{alignItems:'center'}}
                    />
                </>
                }

                {!show_regulars &&
                <>
                    <Spacer sm />
                    <FlatList
                        data={promo_codes}
                        renderItem={this.renderPromoCodes}
                        loading={loading}
                        skeleton='a'
                    />
                </>
                }
            </Screen>
                <Footer>
                    <Button disabled={!ready} t={_('62')} onPress={this.handleSubmit} />
                </Footer>
            </>
        )
    }
}

const style = StyleSheet.create({
    container: {
        //flex:1,
        padding:Metrics.lg
    },
    itemRegular: {
        width:ITEM_WIDTH,
        height:ITEM_WIDTH,
        alignItems:'center',
        marginHorizontal:Metrics.rg
    },
    itemInnerRegular: {
        width:75,
        height:75,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.mute,
        borderRadius:75
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default LoadOptions