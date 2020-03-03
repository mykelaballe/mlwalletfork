import React from 'react'
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'
import {FlatList, Text, Row, Spacer, Button, TextInput, LoadPromo} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Func} from '../utils'
import {API} from '../services'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.lg * 2)

const ItemRegularUI = props => {
    let bgColor = props.data.selected ? Colors.brand : Colors.light
    let txtColor = props.data.selected ? Colors.light : Colors.dark

    return (
        <View style={style.itemRegular}>
            <TouchableOpacity onPress={() => props.onPress(props.index)} style={[style.itemInnerRegular,{backgroundColor:bgColor}]}>
                <Text center color={txtColor}>PHP</Text>
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
        promo_code:'',
        regulars:[
            {
                amount:'10',
                selected:false
            },
            {
                amount:'20',
                selected:false
            },
            {
                amount:'30',
                selected:false
            },
            {
                amount:'50',
                selected:false
            },
            {
                amount:'100',
                selected:false
            },
            {
                amount:'150',
                selected:false
            },
            {
                amount:'300',
                selected:false
            },
            {
                amount:'500',
                selected:false
            },
            {
                amount:'1000',
                selected:false
            },
        ],
        promo_codes:[],
        show_regulars:true,
        loading:true
    }

    componentDidMount = () => this.getData()

    getData = async () => {
        let promo_codes = []

        try {
            promo_codes = await API.getLoadPromoCodes()
        }
        catch(err) {

        }

        this.setState({
            promo_codes,
            loading:false
        })
    }

    handleChangeAmount = amount => this.setState({amount})

    handleSubmit = async load => {
        const {navigate, state: {params}} = this.props.navigation
        navigate('TransactionReview',{
            ...params,
            load,
            transaction: {
                ...this.state,
                contact_no:params.contact_no
            },
            status:'success'
        })
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
            promo_code:'',
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
            promo_code:promo_codes[index].label,
            amount:Func.formatToCurrency(promo_codes[index].amount)
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

        const {contact_no} = this.props.navigation.state.params
        const {amount, regulars, promo_codes, show_regulars, loading} = this.state
        let ready = false

        if(amount) ready = true

        return (
            <View style={style.container}>

                <Text b center xl>{contact_no}</Text>
                {/*<Text center md b>Globe</Text>*/}

                <Spacer />

                <Row ar>
                    <Button mode={show_regulars ? '' : 'outlined'} style={{flex:1}} t='Regular' onPress={this.handleShowRegulars} />
                    <Spacer h sm />
                    <Button mode={!show_regulars ? '' : 'outlined'} style={{flex:1}} t='Promo Code' onPress={this.handleShowPromoCodes} />
                </Row>

                <Spacer />

                {show_regulars &&
                <View style={{alignItems:'center'}}>
                    <Text center mute md>Enter load amount value or choose the load amount below.</Text>

                    <Spacer />

                    <TextInput
                        label='Load Amount (PHP)'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        onSubmitEditing={this.handleSubmitAmount}
                        keyboardType='numeric'
                    />

                    <Spacer />
                    
                    <FlatList
                        data={regulars}
                        renderItem={this.renderRegulars}
                        numColumns={3}
                    />
                </View>
                }

                {!show_regulars &&
                <>
                    <Spacer sm />
                    <FlatList
                        data={promo_codes}
                        renderItem={this.renderPromoCodes}
                        loading={loading}
                    />
                </>
                }

                <Button disabled={!ready} t={_('62')} onPress={this.handleSubmit} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    },
    input: {
        flex:1
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