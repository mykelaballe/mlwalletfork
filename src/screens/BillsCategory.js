import React from 'react'
import {View, StyleSheet, InteractionManager, Dimensions} from 'react-native'
import {Text, Row, Spacer, FlatList, Ripple, ButtonText, Icon} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.xl)
const ITEM_HEIGHT = 120

const FavoriteUI = props => (
    <Ripple onPress={() => props.onPress(props.data)} style={style.pill}>
        <Text center numberOfLines={1} light>{props.data.name}</Text>
    </Ripple>
)

const CategoryUI = props => (
    <Ripple style={style.item} onPress={() => props.onPress(props.data)}>
        <Icon name={props.data.icon} style={{width:40}} />
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
        showFavorites:false,
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
                    name:'BDO'
                },
            ]

            categories = [
                {
                    icon:'airline',
                    label:'Airline'
                },
                {
                    icon:'electricity',
                    label:'Electricity'
                },
                {
                    icon:'financing',
                    label:'Financing'
                },
                {
                    icon:'foundation',
                    label:'Foundations'
                },
                {
                    icon:'insurance',
                    label:'Insurance'
                },
                {
                    icon:'loan',
                    label:'Loan'
                },
                {
                    icon:'memorial',
                    label:'Memorial'
                },
                {
                    icon:'online_business',
                    label:'Online Businesses'
                },
                {
                    icon:'school',
                    label:'Schools'
                },
                {
                    icon:'telco',
                    label:'Telcos'
                },
                {
                    icon:'travel',
                    label:'Travels'
                },
                {
                    icon:'water',
                    label:'Water'
                },
                {
                    icon:'other',
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

    handleSelectFavorite = biller => this.props.navigation.navigate('BillerProfile',{biller})

    handleToggleFavorites = () => this.setState(prevState => ({showFavorites:!prevState.showFavorites}))

    renderFavorites = ({item, index}) => <FavoriteUI data={item} onPress={this.handleSelectFavorite} />

    renderCategories = ({item, index}) => <CategoryUI data={item} onPress={this.handleSelectCategory} />

    render() {

        const {favorites, categories, showFavorites, loading} = this.state

        return (
            <>
                <View style={{padding:Metrics.lg}}>
                    <Row bw>
                        <Text b lg>Favorites</Text>
                        <ButtonText color={Colors.brand} icon='plus' t='Add Biller' onPress={this.handleAddFavoriteBiller} />
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
                        <ButtonText color={Colors.brand} t={`${showFavorites ? 'Hide' : 'Show'} More Favorites`} onPress={this.handleToggleFavorites} />
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
        backgroundColor:Colors.brandlight,
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