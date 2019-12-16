import React from 'react'
import {View, StyleSheet, Image, InteractionManager, TouchableOpacity, Dimensions} from 'react-native'
import {Text, Row, Spacer, Card, HeaderRight, FlatList, Cart, Loader} from '../components'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Ionicons'
import {_, Say} from '../utils'

const {width, height} = Dimensions.get('window')
const ITEM_WIDTH = (width / 2) - (Metrics.sm + Metrics.rg)
const ITEM_HEIGHT = 200

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
    </Card>
)

class ShopStoreListingScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title:'Stores',
        headerRight:(
            <HeaderRight>
                <Cart />
            </HeaderRight>
        )
    })

    state = {
        list:[],
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let list = []

        try {
            list = [
                {
                    id:1,
                    name:'Food and Beverages',
                    photo:'https://d2cax41o7ahm5l.cloudfront.net/mi/upload-images/food-beverages-2020-6978.jpg',
                    categories:[
                        {
                            name:'Fruit',
                            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX69k6Ah9s4UfjsjTxHowr82_XyZHUKeOgC-729XArtuaVsQml&s'
                        },
                        {
                            name:'Wine',
                            photo:'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/beveragedaily.com/article/2019/08/20/bottled-wine-narrowly-beats-out-canned-wine-in-flavor/10047400-1-eng-GB/Bottled-wine-narrowly-beats-out-canned-wine-in-flavor_wrbm_large.jpg'
                        }
                    ]
                },
                {
                    id:2,
                    name:'Jewelry',
                    photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCd2gWFizIpouxQGAIbqPPdv4qaJbg4Kk3_DNQSLR2nRjN-W64GQ&s',
                    categories:[
                        {
                            name:'Bangle',
                            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCd2gWFizIpouxQGAIbqPPdv4qaJbg4Kk3_DNQSLR2nRjN-W64GQ&s'
                        },
                        {
                            name:'Bracelet',
                            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCd2gWFizIpouxQGAIbqPPdv4qaJbg4Kk3_DNQSLR2nRjN-W64GQ&s'
                        },
                        {
                            name:'Earring',
                            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCd2gWFizIpouxQGAIbqPPdv4qaJbg4Kk3_DNQSLR2nRjN-W64GQ&s'
                        },
                        {
                            name:'Necklace',
                            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCd2gWFizIpouxQGAIbqPPdv4qaJbg4Kk3_DNQSLR2nRjN-W64GQ&s'
                        },
                        {
                            name:'Pendant',
                            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCd2gWFizIpouxQGAIbqPPdv4qaJbg4Kk3_DNQSLR2nRjN-W64GQ&s'
                        },
                        {
                            name:'Ring',
                            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCd2gWFizIpouxQGAIbqPPdv4qaJbg4Kk3_DNQSLR2nRjN-W64GQ&s'
                        },
                        {
                            name:'Watch',
                            photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCd2gWFizIpouxQGAIbqPPdv4qaJbg4Kk3_DNQSLR2nRjN-W64GQ&s'
                        }
                    ]
                },
                {
                    id:3,
                    name:'Mobile Phone Accessories',
                    photo:'https://my-test-11.slatic.net/p/ac9122a83f5c19f46de2f45c071dda07.jpg_720x720q80.jpg_.webp',
                    categories:[
                        {
                            name:'Alcatel',
                            photo:'https://my-test-11.slatic.net/p/ac9122a83f5c19f46de2f45c071dda07.jpg_720x720q80.jpg_.webp'
                        },
                        {
                            name:'Asus',
                            photo:'https://my-test-11.slatic.net/p/ac9122a83f5c19f46de2f45c071dda07.jpg_720x720q80.jpg_.webp'
                        },
                        {
                            name:'Charger',
                            photo:'https://my-test-11.slatic.net/p/ac9122a83f5c19f46de2f45c071dda07.jpg_720x720q80.jpg_.webp'
                        },
                        {
                            name:'iPhone',
                            photo:'https://my-test-11.slatic.net/p/ac9122a83f5c19f46de2f45c071dda07.jpg_720x720q80.jpg_.webp'
                        },
                        {
                            name:'Lenovo',
                            photo:'https://my-test-11.slatic.net/p/ac9122a83f5c19f46de2f45c071dda07.jpg_720x720q80.jpg_.webp'
                        },
                        {
                            name:'Nokia',
                            photo:'https://my-test-11.slatic.net/p/ac9122a83f5c19f46de2f45c071dda07.jpg_720x720q80.jpg_.webp'
                        },
                        {
                            name:'Oppo',
                            photo:'https://my-test-11.slatic.net/p/ac9122a83f5c19f46de2f45c071dda07.jpg_720x720q80.jpg_.webp'
                        },
                        {
                            name:'Samsung',
                            photo:'https://my-test-11.slatic.net/p/ac9122a83f5c19f46de2f45c071dda07.jpg_720x720q80.jpg_.webp'
                        },
                    ]
                },
                {
                    id:4,
                    name:'Other Pawnable Items (OPI)',
                    photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg',
                    categories:[
                        {
                            name:'Acer',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Asus',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Blender',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Camera',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Cellphone',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Charger',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Cooker',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Cookware',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Drill',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Grinder',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Guitar',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'iPad',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'iPhone',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Kitchen Ware',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Laptop',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Lenovo',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        },
                        {
                            name:'Living Ware',
                            photo:'https://www.cebuanalhuillier.com/wp-content/uploads/2017/08/1-1.jpg'
                        }
                    ]
                }
            ]
        }
        catch(err) {
            Say.err(_('18'))
        }

        this.setState({
            list,
            loading:false,
            refreshing:false
        })
    }

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    handleViewStore = store => this.props.navigation.navigate('ShopViewStore',{store})

    renderItem = ({item, index}) => <ItemUI data={item} onPress={this.handleViewStore} />

    render() {

        const {list, loading, refreshing} = this.state

        return (
            <Loader
                loading={true}
                layout={[
                    {key:'1',width:220,height:20,marginBottom:6},
                    {key:'1',width:220,height:20,marginBottom:6}
                ]}
                style={{flexDirection:'row'}}
            />
        )

        return (
            <FlatList
                data={list}
                renderItem={this.renderItem}
                numColumns={2}
                style={style.container}
                columnWrapperStyle={style.columnWrapper}
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
            />
        )
    }
}

const style = StyleSheet.create({
    container: {
        paddingTop:Metrics.sm,
        backgroundColor:Colors.gray
    },
    columnWrapper: {
        padding:Metrics.sm
    },
    item: {
        width:ITEM_WIDTH,
        height:ITEM_HEIGHT,
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
        justifyContent:'center'
    }
})

export default ShopStoreListingScreen