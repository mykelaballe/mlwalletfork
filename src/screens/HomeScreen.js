import React from 'react'
import {StyleSheet, View, FlatList, Dimensions, TouchableOpacity, Image} from 'react-native'
import {Text, Button, Card, Spacer, Row, Balance} from '../components'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Ionicons'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 2) - (Metrics.sm * 4)

class HomeScreen extends React.Component {

    static navigationOptions = {
        title:'Home'
    }

    state = {
        list:[
            {
                label:'SENDOUT',
                icon:require('../res/sendout_icon.png'),
                route:'SubmitKPTNPartner'
            },
            {
                label:'BILLSPAY',
                icon:require('../res/billspay_icon.png'),
                route:''
            },
            {
                label:'CASHOUT',
                icon:require('../res/cashout_icon.png'),
                route:''
            },
            {
                label:'ELOAD',
                icon:require('../res/eload_icon.png'),
                route:'ELoad'
            },
            {
                label:'ML SHOP',
                icon:require('../res/shop_icon.png'),
                route:''
            },
            {
                label:'ML PAY',
                icon:require('../res/pay_icon.png'),
                route:''
            },
        ],
        loading:true,
        refreshing:false,
        error:false
    }

    componentDidMount = () => {

    }

    getData = async () => {
        try {

        }
        catch(err) {
            
        }
    }

    renderItem = ({item}) => (
        <Card style={style.box} onPress={() => this.props.navigation.navigate(item.route)}>
            <Image source={item.icon} style={{width:70,height:70}} resizeMode='contain' />
            <Spacer />
            <Text b center lg>{item.label}</Text>
        </Card>
    )

    render() {

        const {list, loading, refreshing, error} = this.state

        return (
            <View style={style.container}>
                <Balance />

                <Spacer />
    
                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    columnWrapperStyle={{paddingHorizontal:Metrics.rg}}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:Colors.gray
    },
    box: {
        alignItems:'center',
        width:ITEM_WIDTH,
        height:150,
        marginHorizontal:Metrics.sm,
        justifyContent:'center'
    }
})

export default HomeScreen