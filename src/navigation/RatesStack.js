import React from 'react'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {RatesScreen, CashoutRatesScreen} from '../screens'
import {Colors} from '../themes'

export default createMaterialTopTabNavigator({
    Rates: {
        screen:RatesScreen
    },
    CashoutRates: {
        screen:CashoutRatesScreen
    }
},{
    tabBarPosition:'top',
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