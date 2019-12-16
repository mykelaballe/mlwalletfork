import React from 'react'
import {View, StyleSheet, InteractionManager, TouchableOpacity, Dimensions, Image} from 'react-native'
import {Text, Row, Spacer, HR, Ripple, FlatList, Card, HeaderRight, Cart, Button} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'

const {width, height} = Dimensions.get('window')
const ITEM_WIDTH = (width / 2) - (Metrics.sm + Metrics.rg)
const ITEM_HEIGHT = 200

const ItemCatUI = props => (
    <TouchableOpacity onPress={() => props.onPress(props.data)}>
        <Image source={{uri:props.data.photo}} style={style.categoryImage} resizeMode='cover' />
        <View style={{...StyleSheet.absoluteFill,justifyContent:'flex-end',paddingLeft:Metrics.sm,backgroundColor:'rgba(0,0,0,.4)'}}>
            <Text b light numberOfLines={1}>{props.data.name}</Text>
        </View>
    </TouchableOpacity>
)

const ItemUI = props => (
    <Card style={style.item} onPress={() => props.onPress(props.data)}>
        <Image
            source={{uri:props.data.photo}}
            style={style.image}
            resizeMode='cover'
        />

        <View style={style.textContainer}>
            <Text b center numberOfLines={2}>{props.data.name}</Text>
        </View>

        <View style={{paddingHorizontal:Metrics.sm,paddingBottom:Metrics.sm}}>
            <Button t='Add' onPress={() => props.onAddCart(props.data)} />
        </View>
    </Card>
)

class ShopViewStoreScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:navigation.state.params.store.name,
        headerRight: (
            <HeaderRight>
                <Cart />
            </HeaderRight>
        )
    })

    state = {
        categories:[],
        list:[],
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        const {store} = this.props.navigation.state.params
        let categories = [], list = []

        try {
            categories = store.categories

            list = [
                {
                    name:'Product #1',
                    photo:'https://d2cax41o7ahm5l.cloudfront.net/mi/upload-images/food-beverages-2020-6978.jpg',
                    stock:5
                },
                {
                    name:'Product #2',
                    photo:'https://d2cax41o7ahm5l.cloudfront.net/mi/upload-images/food-beverages-2020-6978.jpg',
                    stock:15
                },
                {
                    name:'Product #3',
                    photo:'https://d2cax41o7ahm5l.cloudfront.net/mi/upload-images/food-beverages-2020-6978.jpg',
                    stock:12
                },
                {
                    name:'Product #4',
                    photo:'https://d2cax41o7ahm5l.cloudfront.net/mi/upload-images/food-beverages-2020-6978.jpg',
                    stock:8
                },
                {
                    name:'Product #5',
                    photo:'https://d2cax41o7ahm5l.cloudfront.net/mi/upload-images/food-beverages-2020-6978.jpg',
                    stock:10
                }
            ]
        }
        catch(err) {
            Say.err(_('18'))
        }

        this.setState({
            categories,
            list,
            loading:false,
            refreshing:false
        })
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    handleSelectCategory = category => {
        alert(category.name)
    }

    handleViewProduct = product => {
        product.store = this.props.navigation.state.params.store
        this.props.navigation.navigate('ShopViewProduct',{product})
    }

    handleAddToCart = product => {
        Say.some(`Added ${product.name} to cart`)
    }

    renderCategories = ({item, index}) => <ItemCatUI data={item} onPress={this.handleSelectCategory} />

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleViewProduct} onAddCart={this.handleAddToCart} />

    render() {

        const {categories, list, loading, refreshing} = this.state

        return (
            <View style={style.container}>
                <Card style={{margin:Metrics.rg}}>
                    <Text b lg>Categories</Text>
                    <Spacer xs />
                    <FlatList
                        data={categories}
                        renderItem={this.renderCategories}
                        horizontal
                        loading={loading}
                    />
                </Card>
                <FlatList
                    data={list}
                    renderItem={this.renderItem}
                    loading={loading}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    columnWrapperStyle={style.columnWrapper}
                    numColumns={2}
                />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        paddingTop:Metrics.sm,
        backgroundColor:Colors.gray
    },
    columnWrapper: {
        padding:Metrics.sm
    },
    categoryImage: {
        width:100,
        height:100,
        marginHorizontal:Metrics.xs,
        borderRadius:Metrics.sm
    },
    item: {
        width:ITEM_WIDTH,
        //height:ITEM_HEIGHT,
        padding:0,
        marginBottom:0,
        marginHorizontal:Metrics.sm
    },
    image: {
        height:ITEM_HEIGHT * .75,
        borderTopLeftRadius:Metrics.sm,
        borderTopRightRadius:Metrics.sm
    },
    textContainer: {
        flex:1,
        padding:Metrics.md,
        paddingBottom:0,
        justifyContent:'center'
    }
})

export default ShopViewStoreScreen