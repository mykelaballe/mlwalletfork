import React from 'react'
import {View, StyleSheet, InteractionManager, Dimensions, TouchableOpacity} from 'react-native'
import {FlatList, Text, Row, Spacer, HR, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput, LoadPromo} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

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
        promo_codes:[
            {
                label:'GoSURF10',
                short_desc:'For Globe Prepaid only.',
                long_desc:'100MB data + 30MB for IG. Valid for 2 days',
                amount:10
            },
            {
                label:'GoSURF15',
                short_desc:'For Globe Prepaid only.',
                long_desc:'100MB data + 30MB for IG. Valid for 2 days',
                amount:15
            },
            {
                label:'GoSAKTO70',
                short_desc:'For Globe Prepaid only.',
                long_desc:'100MB data + 30MB for IG. Valid for 2 days',
                amount:70
            },
            {
                label:'GoSURF50',
                short_desc:'For Globe Prepaid only.',
                long_desc:'100MB data + 30MB for IG. Valid for 2 days',
                amount:50
            },
            {
                label:'GoSAKTO90',
                short_desc:'For Globe Prepaid only.',
                long_desc:'100MB data + 30MB for IG. Valid for 2 days',
                amount:90
            }
        ],
        show_regulars:true
    }

    handleChangeAmount = amount => this.setState({amount})

    handleSubmit = async load => {
        const {navigate, state: {params}} = this.props.navigation
        navigate('TransactionReview',{
            ...params,
            load,
            ...this.state,
            status:'success'
        })
    }

    handleShowRegulars = () => this.setState({show_regulars:true})

    handleShowPromoCodes = () => this.setState({show_regulars:false})

    handleSelectRegular = index => {
        let regulars = this.state.regulars.slice()

        regulars.map(r => r.selected = false)
        regulars[index].selected = true

        this.setState({
            regulars,
            amount:regulars[index].amount
        })
    }

    handleSelectPromoCode = index => {
        let promo_codes = this.state.promo_codes.slice()

        promo_codes.map(r => r.collapsed = false)
        promo_codes[index].collapsed = true

        this.setState({
            promo_codes,
            amount:promo_codes[index].amount.toString()
        })

    }

    handleSubmitAmount = amount => this.handleSubmit(amount)

    renderRegulars = ({item, index}) => <ItemRegularUI index={index} data={item} onPress={this.handleSelectRegular} />

    renderPromoCodes = ({item, index}) => <LoadPromo index={index} data={item} onPress={this.handleSelectPromoCode} />

    render() {

        const {amount, regulars, promo_codes, show_regulars} = this.state
        let ready = false

        if(amount) ready = true

        return (
            <View style={style.container}>

                <Text b center xl>09123456789</Text>
                <Text center md b>Globe</Text>

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
                        value={amount ? parseFloat(amount).toFixed(2) : ''}
                        onChangeText={this.handleChangeAmount}
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
                    />
                </>
                }

                <Button disabled={!ready} t='Next' onPress={this.handleSubmit} />
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