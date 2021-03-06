import React from 'react'
import {View, StyleSheet, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import Actions from '../actions/Creators'
import {Text, Spacer, FlatList, Ripple, Icon} from '../components'
import {Metrics} from '../themes'
import {_, Say} from '../utils'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = (width / 3) - (Metrics.lg)
const ITEM_HEIGHT = 120

class More extends React.Component {

    static navigationOptions = {
        headerLeft:<View />,
        title:'Show More'
    }

    state = {
        items:[
            {
                icon:'transaction_history',
                label:'Transaction History',
                onPress:() => this.handlePressTransactionHistory()
            },
            {
                icon:'rates',
                label:'Kwarta Padala Rates',
                onPress:() => this.handlePressRates()
            },
            {
                icon:'branches',
                label:'ML Branches',
                onPress:() => this.handlePressLocation()
            },
            {
                icon:'faq',
                label:'FAQs',
                onPress:() => this.handlePressFAQ()
            },
            {
                icon:'terms',
                label:'Terms and Conditions',
                onPress:() => this.handlePressTerms()
            },
            {
                icon:'privacy',
                label:'Privacy Notice',
                onPress:() => this.handlePressPrivacy()
            },
            {
                icon:'contact_us',
                label:'Contact Us',
                onPress:() => this.handlePressContactUs()
            },
            {
                icon:'logout',
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

    handlePressPrivacy = () => this.props.navigation.navigate('PrivacyNotice')

    handlePressContactUs = () => this.props.navigation.navigate('ContactUs')

    handlePressLogout = () => {
        Say.ask(
            'Are you sure?',
            'Logout',
            {
                onConfirm:() => this.props.logout()
            }
        )
    }

    renderItems = ({item, index}) => (
        <Ripple style={style.item} onPress={item.onPress}>
            <Icon name={item.icon} />
            <Spacer sm />
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
        //padding:Metrics.rg
    },
    item: {
        justifyContent:'center',
        alignItems:'center',
        width:ITEM_WIDTH,
        height:ITEM_HEIGHT,
        padding:Metrics.sm,
        margin:Metrics.rg
    }
})

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(Actions.logout())
})

export default connect(null, mapDispatchToProps)(More)