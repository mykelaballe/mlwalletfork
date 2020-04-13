import React from 'react'
import {View, StyleSheet, InteractionManager, Dimensions} from 'react-native'
import {Text, Row, Spacer, FlatList, Ripple, ButtonText, Icon} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Say} from '../utils'
import {API} from '../services'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.xl)
const ITEM_HEIGHT = 80

const FavoriteUI = props => (
    <Ripple onPress={() => props.onPress(props.data)} style={style.pill}>
        <Text center numberOfLines={1} light>{props.data.partner}</Text>
    </Ripple>
)

const CategoryUI = props => (
    <Ripple style={style.item} onPress={() => props.onPress(props.data)}>
        <Icon name={props.data.icon} style={{width:40}} />
        <Text center sm>{props.data.label}</Text>
    </Ripple>
)

class Scrn extends React.Component {

    static navigationOptions = {
        title:'Pay Bills'
    }

    state = {
        favorites:[],
        categories:[
            {
                icon:'airline',
                label:'Airline',
                value:'airline'
            },
            {
                icon:'electricity',
                label:'Electricity',
                value:'electricity'
            },
            {
                icon:'financing',
                label:'Financing',
                value:'financing'
            },
            {
                icon:'foundation',
                label:'Foundations',
                value:'foundation'
            },
            {
                icon:'insurance',
                label:'Insurance',
                value:'insurance'
            },
            {
                icon:'loan',
                label:'Loan',
                value:'loan'
            },
            {
                icon:'memorial',
                label:'Memorial',
                value:'memorial'
            },
            {
                icon:'online_business',
                label:'Online Businesses',
                value:'online_business'
            },
            {
                icon:'school',
                label:'Schools',
                value:'school'
            },
            {
                icon:'telco',
                label:'Telcos',
                value:'telco'
            },
            {
                icon:'travel',
                label:'Travels',
                value:'travel'
            },
            {
                icon:'water',
                label:'Water',
                value:'water'
            },
            {
                icon:'other',
                label:'Others',
                value:'other'
            }
        ],
        showFavorites:false,
        loading:true,
        refreshing:false
    }

    componentDidMount = () => InteractionManager.runAfterInteractions(this.getData)

    getData = async () => {
        let favorites = []

        try {
            favorites = await API.getFavoriteBillers()
        }
        catch(err) {
            Say.err(err)
        }

        this.setState({
            favorites,
            loading:false
        })
    }

    handleSelectCategory = category => this.props.navigation.navigate('Billers',{category})

    handleAddFavoriteBiller = () => this.props.navigation.navigate('Billers')

    handleSelectFavorite = biller => this.props.navigation.navigate('BillerProfile',{biller})

    handleToggleFavorites = () => this.setState(prevState => ({showFavorites:!prevState.showFavorites}))

    handleViewFavorites = () => this.props.navigation.navigate('FavoriteBillers')

    handleRefresh = () => this.setState({refreshing:true},this.getData)

    renderFavorites = ({item, index}) => <FavoriteUI data={item} onPress={this.handleSelectFavorite} />

    renderCategories = ({item, index}) => <CategoryUI data={item} onPress={this.handleSelectCategory} />

    render() {

        const {favorites, categories, showFavorites, loading, refreshing} = this.state

        return (
            <>
                {/*<View style={{padding:Metrics.lg}}>
                    <Row bw>
                        <Text b lg>Favorites</Text>
                        <ButtonText color={Colors.brand} icon='plus' t='Add Biller' onPress={this.handleAddFavoriteBiller} />
                    </Row>
                    <FlatList
                        data={favorites.slice(0,3)}
                        renderItem={this.renderFavorites}
                        numColumns={3}
                        style={{paddingTop:Metrics.md}}
                        columnWrapperStyle={{flexWrap:'wrap'}}
                    />

                    {favorites.length > 3 &&
                    <ButtonText color={Colors.brand} t='View All Favorites' onPress={this.handleViewFavorites} />
                    }
                </View>*/}
                
                <FlatList
                    data={categories}
                    renderItem={this.renderCategories}
                    numColumns={3}
                    columnWrapperStyle={style.columnWrapper}
                    refreshing={refreshing}
                    onRefresh={this.handleRefresh}
                    placeholder={{text:'No Biller found'}}
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
        margin:Metrics.sm,
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

export default Scrn