import React from 'react'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {RatesScreen, CashoutRatesScreen} from '../screens'
import {Colors} from '../themes'

export default createMaterialTopTabNavigator({
    RemitToBankTab1: {
        screen:RatesScreen,
        navigationOptions: {
            tabBarLabel:'Remit To Bank'
        }
    },
    RemitToBankTab2: {
        screen:CashoutRatesScreen,
        navigationOptions: {
            tabBarLabel:'Transaction History'
        }
    },
    RemitToBankTab3: {
        screen:CashoutRatesScreen,
        navigationOptions: {
            tabBarLabel:'Rates'
        }
    }
},{
    tabBarPosition:'bottom',
    tabBarOptions: {
        inactiveTintColor:'#bbb',
        indicatorStyle: {
            backgroundColor:Colors.light
        },
        style: {
            backgroundColor:Colors.brand
        }
    }
})