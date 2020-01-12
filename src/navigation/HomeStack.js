import React from 'react'
import {View} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation-tabs'
import * as Scrn from '../screens'
import {Colors, Metrics} from '../themes'
import Icon from 'react-native-vector-icons/Ionicons'

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor:Colors.brand
    },
    headerTitleStyle:{
        flex:1,
        color:Colors.light,
        fontWeight:'bold',
        textAlign:'center'
    },
    headerTintColor:Colors.light,
    headerRight:<View />
}

export default createBottomTabNavigator({
    Home: {
        screen:createStackNavigator({
            Home: Scrn.HomeScrn
        },{
            defaultNavigationOptions
        }),
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Icon name='ios-home' color={focused ? Colors.brand : Colors.black} size={Metrics.icon.sm} />
            )
        }
    },
    MyAccount: {
        screen:createStackNavigator({
            MyAccount: Scrn.MyAccountScrn
        },{
            defaultNavigationOptions
        }),
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Icon name='ios-person' color={focused ? Colors.brand : Colors.black} size={Metrics.icon.sm} />
            )
        }
    },
    Notification: {
        screen:createStackNavigator({
            Notification: Scrn.NotificationScrn
        },{
            defaultNavigationOptions
        }),
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Icon name='ios-notifications' color={focused ? Colors.brand : Colors.black} size={Metrics.icon.sm} />
            )
        }
    },
    More: {
        screen:createStackNavigator({
            More: Scrn.MoreScrn
        },{
            defaultNavigationOptions
        }),
        navigationOptions: {
            tabBarIcon: ({focused}) => (
                <Icon name='ios-menu' color={focused ? Colors.brand : Colors.black} size={Metrics.icon.sm} />
            )
        }
    },
},{
    //tabBarPosition:'top',
    tabBarOptions: {
        inactiveTintColor:Colors.black,
        activeTintColor:Colors.brand,
        indicatorStyle: {
            backgroundColor:Colors.light
        },
        style: {
            //backgroundColor:Colors.brand
        }
    }
})