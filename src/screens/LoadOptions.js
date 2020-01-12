import React from 'react'
import {View, StyleSheet, InteractionManager, Dimensions, TouchableOpacity} from 'react-native'
import {FlatList, Text, Row, Spacer, HR, Button, ButtonIcon, ButtonText, Ripple, TopBuffer, TextInput} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.md)

const ItemRegularUI = props => (
    <View style={style.itemRegular}>
        <TouchableOpacity onPress={() => props.onPress(props.data)} style={style.itemInnerRegular}>
            <Text center sm>PHP</Text>
            <Text center lg b>{props.data}</Text>
        </TouchableOpacity>
    </View>
)

const ItemPromoCodeUI = props => (
    <TouchableOpacity onPress={() => props.onPress(props.data)}>
        <Row style={style.itemPromoCode}>
            <View style={style.circle}>
                <Text center xs>PHP</Text>
                <Text center lg b>{props.data.amount}</Text>
            </View>
            <Spacer h />
            <View>
                <Text>{props.data.label}</Text>
                <Text sm mute>{props.data.details}</Text>
            </View>
        </Row>
        <HR />
    </TouchableOpacity>
)

class LoadOptions extends React.Component {

    static navigationOptions = {
        title:'Buy Load'
    }

    state = {
        amount:'',
        regulars:[10,20,30,50,100,150,300,500,1000],
        promo_codes:[
            {
                label:'GoSURF10',
                details:'50MB data. Valid for 2 days.',
                amount:10
            },
            {
                label:'GoSURF15',
                details:'100MB data. Valid for 2 days.',
                amount:15
            },
            {
                label:'GoSAKTO70',
                details:'1GB data + Unli texts to all networks.',
                amount:70
            },
            {
                label:'GoSURF50',
                details:'1GB data + Unli texts to all networks.',
                amount:50
            },
            {
                label:'GoSAKTO90',
                details:'2GB data + Unli texts to all networks.',
                amount:90
            }
        ],
        show_regulars:true
    }

    handleChangeAmount = amount => this.setState({amount})

    handleSubmit = async load => {
        this.props.navigation.navigate('TransactionReview',{type:'buy_load',load})
    }

    handleShowRegulars = () => this.setState({show_regulars:true})

    handleShowPromoCodes = () => this.setState({show_regulars:false})

    handleSelectRegular = amount => this.handleSubmit(amount)

    handleSelectPromoCode = load => this.handleSubmit(load)

    handleSubmitAmount = amount => this.handleSubmit(amount)

    renderRegulars = ({item, index}) => <ItemRegularUI data={item} onPress={this.handleSelectRegular} />

    renderPromoCodes = ({item, index}) => <ItemPromoCodeUI data={item} onPress={this.handleSelectPromoCode} />

    render() {

        const {amount, regulars, promo_codes, show_regulars} = this.state

        return (
            <View style={style.container}>

                <Text b center lg>09123456789</Text>
                <Text center md>Globe</Text>

                <Spacer />

                <Row ar>
                    <Button mode={show_regulars ? '' : 'outlined'} style={{flex:1}} t='Regular' onPress={this.handleShowRegulars} />
                    <Spacer h sm />
                    <Button mode={!show_regulars ? '' : 'outlined'} style={{flex:1}} t='Promo Code' onPress={this.handleShowPromoCodes} />
                </Row>

                {show_regulars &&
                <>
                    <TextInput
                        label='Enter Load Amount'
                        value={amount}
                        onChangeText={this.handleChangeAmount}
                        keyboardType='numeric'
                        onSubmitEditing={this.handleSubmit}
                    />
                    <Spacer />
                    <Text center>Enter load amount value or choose load amount below.</Text>
                    <Spacer />
                    
                    <FlatList
                        data={regulars}
                        renderItem={this.renderRegulars}
                        numColumns={3}
                    />
                </>
                }

                {!show_regulars &&
                <>
                    <Spacer />
                    <FlatList
                        data={promo_codes}
                        renderItem={this.renderPromoCodes}
                    />
                </>
                }
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
        alignItems:'center'
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
    itemPromoCode: {
        paddingVertical:Metrics.rg
    },
    circle: {
        width:60,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:Colors.mute,
        borderRadius:60
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default LoadOptions