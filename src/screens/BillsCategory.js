import React from 'react'
import {View, StyleSheet, InteractionManager, Dimensions} from 'react-native'
import {Text, Row, Spacer, FlatList, Ripple, ButtonText} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.xl)
const ITEM_HEIGHT = 120

const FavoriteUI = props => (
    <Ripple onPress={() => props.onPress(props.data)} style={style.pill}>
        <Text center numberOfLines={1}>{props.data.name}</Text>
    </Ripple>
)

const CategoryUI = props => (
    <Ripple style={style.item} onPress={() => props.onPress(props.data)}>
        <Icon name={`ios-${props.data.icon}`} size={Metrics.icon.md} color={Colors.black} />
        <Text center sm>{props.data.label}</Text>
    </Ripple>
)

class BillsCategory extends React.Component {

    static navigationOptions = {
        title:'Pay Bills'
    }

    state = {
        favorites:[],
        categories:[],
        loading:true
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let favorites = [], categories = []

        try {
            favorites = [
                {
                    name:'Veco'
                },
                {
                    name:'Globe'
                },
                {
                    name:'MCWD'
                }
            ]

            categories = [
                {
                    icon:'',
                    label:'Electricity'
                },
                {
                    icon:'',
                    label:'Cable/Internet'
                },
                {
                    icon:'',
                    label:'Water'
                },
                {
                    icon:'',
                    label:'Telcoms'
                },
                {
                    icon:'',
                    label:'Education'
                },
                {
                    icon:'',
                    label:'Real Estate'
                },
                {
                    icon:'',
                    label:'Insurance'
                },
                {
                    icon:'',
                    label:'Credit Card'
                },
                {
                    icon:'',
                    label:'Travel'
                },
                {
                    icon:'',
                    label:'Charity'
                },
                {
                    icon:'',
                    label:'Government'
                },
                {
                    icon:'',
                    label:'Others'
                }
            ]
        }
        catch(err) {

        }

        this.setState({
            favorites,
            categories,
            loading:false
        })
    }

    handleSelectCategory = category => this.props.navigation.navigate('Billers',{category})

    handleAddFavoriteBiller = () => this.props.navigation.navigate('Billers')

    handleSelectFavorite = biller => this.props.navigation.navigate('PayBill',{biller})

    handleSeeMoreFavorites = () => this.props.navigation.navigate('FavoriteBillers')

    renderFavorites = ({item, index}) => <FavoriteUI data={item} onPress={this.handleSelectFavorite} />

    renderCategories = ({item, index}) => <CategoryUI data={item} onPress={this.handleSelectCategory} />

    render() {

        const {favorites, categories, loading} = this.state

        return (
            <>
                <View style={{padding:Metrics.xl}}>
                    <Row bw>
                        <Text b lg>Favorites</Text>
                        <ButtonText icon='add' t='Add Biller' onPress={this.handleAddFavoriteBiller} />
                    </Row>
                    <FlatList
                        data={favorites}
                        renderItem={this.renderFavorites}
                        horizontal
                        style={{paddingTop:Metrics.md}}
                    />

                    {favorites.length > 0 &&
                    <>
                        <Spacer />
                        <ButtonText t='See More Favorites' onPress={this.handleSeeMoreFavorites} />
                    </>
                    }
                </View>
                
                <FlatList
                    data={categories}
                    renderItem={this.renderCategories}
                    numColumns={3}
                    columnWrapperStyle={style.columnWrapper}
                />
            </>
        )
    }
}

const style = StyleSheet.create({
    columnWrapper: {
        padding:Metrics.rg
    },
    pill: {
        backgroundColor:Colors.gray,
        marginHorizontal:Metrics.sm,
        padding:Metrics.rg,
        justifyContent:'center',
        alignItems:'center'
    },
    item: {
        justifyContent:'center',
        alignItems:'center',
        width:ITEM_WIDTH,
        height:ITEM_HEIGHT,
        padding:Metrics.sm,
        marginHorizontal:Metrics.rg
    }
})

export default BillsCategory