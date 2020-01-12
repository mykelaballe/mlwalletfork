import React from 'react'
import {View, StyleSheet, InteractionManager, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Text, Row, Spacer, FlatList, Ripple} from '../components'
import {Colors, Metrics} from '../themes'
import {_, Storage, Consts} from '../utils'
import Icon from 'react-native-vector-icons/Ionicons'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.xl)
const ITEM_HEIGHT = 120

class More extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'Show More'
    }

    state = {
        items:[
            {
                icon:'calendar',
                label:'Transanction History',
                onPress:() => this.handlePressTransactionHistory()
            },
            {
                icon:'trending-up',
                label:'Rates',
                onPress:() => this.handlePressRates()
            },
            {
                icon:'pin',
                label:'Location',
                onPress:() => this.handlePressLocation()
            },
            {
                icon:'help-circle',
                label:'Frequently Asked Questions',
                onPress:() => this.handlePressFAQ()
            },
            {
                icon:'journal',
                label:'Terms and Conditions',
                onPress:() => this.handlePressTerms()
            },
            {
                icon:'eye',
                label:'Privacy Notice',
                onPress:() => this.handlePressPrivacy()
            },
            {
                icon:'call',
                label:'Contact Us',
                onPress:() => this.handlePressContactUs()
            },
            {
                icon:'log-out',
                label:'Logout',
                onPress:() => this.handlePressLogout()
            }
        ]
    }

    handlePressTransactionHistory = () => this.props.navigation.navigate('TransactionHistory')

    handlePressRates = () => this.props.navigation.navigate('Rates')

    handlePressLocation = () => this.props.navigation.navigate('Locator')

    handlePressFAQ = () => this.props.navigation.navigate('FAQ')

    handlePressTerms = () => this.props.navigation.navigate('TermsAndConditions')

    handlePressPrivacy = () => {}

    handlePressContactUs = () => this.props.navigation.navigate('ContactUs')

    handlePressLogout = async () => {
        await Storage.doSave(Consts.db.user)
        this.props.logout()
    }

    renderItems = ({item, index}) => (
        <Ripple style={style.item} onPress={item.onPress}>
            <Icon name={`ios-${item.icon}`} size={Metrics.icon.md} color={Colors.black} />
            <Text center sm>{item.label}</Text>
        </Ripple>
    )

    render() {

        const {items} = this.state

        return (
            <FlatList
                data={items}
                renderItem={this.renderItems}
                numColumns={3}
                columnWrapperStyle={style.columnWrapper}
                style={{paddingTop:Metrics.lg}}
            />
        )
    }
}

const style = StyleSheet.create({
    columnWrapper: {
        padding:Metrics.rg
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

mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(Actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(More)