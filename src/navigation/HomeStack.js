import React from 'react'
import {View} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation-tabs'
import * as Scrn from '../screens'
import {Icon} from '../components'
import {Colors, Metrics, Res} from '../themes'

const defaultNavigationOptions = {
    headerStyle: {
        backgroundColor:Colors.brand
    },
    headerTitleStyle:{
        flex:1,
        color:Colors.light,
        textAlign:'center',
        fontFamily:'Lato'
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
            tabBarLabel:'Home',
            tabBarIcon: ({focused}) => (
                //<Icon name='ios-home' color={focused ? Colors.brand : Colors.black} size={Metrics.icon.sm} />
                <Icon name={focused ? 'home_active' : 'home'} size={20} />
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
            tabBarLabel:'My Account',
            tabBarIcon: ({focused}) => (
                <Icon name={focused ? 'user_active' : 'user'} size={20} />
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
            tabBarLabel:'Notifications',
            tabBarIcon: ({focused}) => (
                <Icon name='bell' size={20} />
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
            tabBarLabel:'More',
            tabBarIcon: ({focused}) => (
                <Icon name='hamburger' size={20} />
            )
        }
    },
},{
    tabBarOptions: {
        inactiveTintColor:Colors.black,
        activeTintColor:Colors.brand,
        indicatorStyle: {
            backgroundColor:Colors.light
        }
    }
})