import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import DrawerNavOptions from '../DrawerNavOptions'
import {RatesScreen, CashoutRatesScreen} from '../../screens'
import {Colors} from '../../themes'

const Stack = createMaterialTopTabNavigator({
    LoadTab1: {
        screen:RatesScreen,
        navigationOptions: {
            tabBarLabel:'Branch'
        }
    },
    LoadTab2: {
        screen:CashoutRatesScreen,
        navigationOptions: {
            tabBarLabel:'Receive KP'
        }
    },
    LoadTab3: {
        screen:RatesScreen,
        navigationOptions: {
            tabBarLabel:'Location'
        }
    },
    LoadTab4: {
        screen:CashoutRatesScreen,
        navigationOptions: {
            tabBarLabel:'Remit From Bank'
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

export default createStackNavigator({
    Load: {
        screen:Stack,
        navigationOptions:{
            ...DrawerNavOptions(),
            title:'Load'
        }
    }
})