import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import DrawerNavOptions from '../DrawerNavOptions'
import {RatesScreen, CashoutRatesScreen} from '../../screens'
import {Colors} from '../../themes'

const Stack = createMaterialTopTabNavigator({
    LocationTab1: {
        screen:RatesScreen,
        navigationOptions: {
            tabBarLabel:'Branch'
        }
    },
    LocationTab2: {
        screen:CashoutRatesScreen,
        navigationOptions: {
            tabBarLabel:'Receive KP'
        }
    },
    LocationTab3: {
        screen:RatesScreen,
        navigationOptions: {
            tabBarLabel:'Location'
        }
    },
    LocationTab4: {
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
    Location: {
        screen:Stack,
        navigationOptions:{
            ...DrawerNavOptions(),
            title:'Location'
        }
    }
})