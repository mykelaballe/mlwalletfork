import React from 'react'
import {View, StyleSheet, InteractionManager, Image, TouchableOpacity} from 'react-native'
import {FlatList, TextInput, Text, Row, Button, Spacer, ButtonText, HR, Ripple, TopBuffer} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const ItemUI = props => (
    <TouchableOpacity style={style.item} onPress={() => props.onPress(props.data)}>
        <Image source={{uri:props.data.logo}} style={style.logo} resizeMode='cover' />
        <Spacer sm />
        <Text center numberOfLines={2}>{props.data.name}</Text>
    </TouchableOpacity>
)

class SavedBankPartners extends React.Component {

    static navigationOptions = {
        title:'Bank Transfer'
    }

    state = {
        banks:[],
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let banks = []

        try {
            banks = [
                {
                    logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRALKMNvyXAUKgk2zDlwu2RyDXr9DsD-Q8e7Yc3H9YMxIDI913V',
                    name:'Banco De Oro'
                },
                {
                    logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQu7wXoFoi2TRxisL4Bp3nxYniFodZ-pITvSA3oqTd27KdnMkWB',
                    name:'Bank of the Philippine Islands'
                },
                {
                    logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSggteIu6PSOYeBtSHAQ15_o4RS8osmEHWEtnPN1OMnavslahpT',
                    name:'Landbank'
                },
                {
                    logo:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTaCxawMWju7MFNPyuYPeADb59zNl1EagGMwiR10j1bworwHJ9a',
                    name:'China Bank'
                }
            ]
        }
        catch(err) {

        }

        this.setState({
            banks,
            loading:false
        })
    }

    handleAddNewBank = () => this.props.navigation.navigate('AddBankPartner')

    handleSelectBank = bank => this.props.navigation.navigate('SendBankTransfer',{type:'bank',bank})

    renderBanks = ({item, index}) => <ItemUI data={item} onPress={this.handleSelectBank} />

    render() {

        const {banks, loading} = this.state

        return (
            <View style={style.container}>
                <Text md>My Saved Bank Accounts</Text>

                <Spacer />

                <FlatList
                    data={banks}
                    renderItem={this.renderBanks}
                    loading={loading}
                    horizontal
                />

                <View style={style.footer}>
                    <Button t='Add New Bank Account' onPress={this.handleAddNewBank} />
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        padding:Metrics.lg
    },
    item: {
        marginHorizontal:Metrics.sm,
        width:80,
        height:80
    },
    logo: {
        width:80,
        height:80
    },
    footer: {
        flex:1,
        justifyContent:'flex-end'
    }
})

export default SavedBankPartners