import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'
import {Text, FlatList, Ripple, Icon} from '../components'
import {Colors, Metrics} from '../themes'
import {_} from '../utils'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.xl)
const ITEM_HEIGHT = 80

const CategoryUI = props => (
    <Ripple style={style.item} onPress={() => props.onPress(props.data)}>
        <Icon name={props.data.value} style={{width:40}} />
        <Text center sm>{props.data.label}</Text>
    </Ripple>
)

export default class Scrn extends React.Component {

    state = {
        categories:[
            {
                value:'airline',
                label:'Airline'
            },
            {
                value:'electricity',
                label:'Electricity'
            },
            {
                value:'financing',
                label:'Financing'
            },
            {
                value:'foundation',
                label:'Foundations'
            },
            {
                value:'insurance',
                label:'Insurance'
            },
            {
                value:'loan',
                label:'Loan'
            },
            {
                datvaluea:'online_business',
                label:'Online Businesses'
            },
            {
                value:'school',
                label:'Schools'
            },
            {
                value:'telco',
                label:'Telcos'
            },
            {
                value:'travel',
                label:'Travels'
            },
            {
                value:'water',
                label:'Water'
            },
            {
                value:'other',
                label:'Others'
            }
        ]
    }

    handleSelectCategory = category => this.props.navigation.navigate('Billers',{category})

    renderCategories = ({item}) => <CategoryUI data={item} onPress={this.handleSelectCategory} />

    render() {

        return (               
            <FlatList
                data={this.state.categories}
                renderItem={this.renderCategories}
                numColumns={3}
                columnWrapperStyle={style.columnWrapper}
            />
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