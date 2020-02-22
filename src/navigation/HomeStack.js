import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import * as Scrn from '../screens'
import {Icon} from '../components'
import {AppStyles, Colors} from '../themes'

const ICON_SIZE = 20

export default createBottomTabNavigator({
    Home: {
        screen:createStackNavigator({
            Home: Scrn.HomeScrn
        },{
            defaultNavigationOptions:AppStyles.defaultNavigationOptions
        }),
        navigationOptions: {
            tabBarLabel:'Home',
            tabBarIcon: ({focused}) => <Icon name={focused ? 'home_active' : 'home'} size={ICON_SIZE} />
        }
    },
    MyAccount: {
        screen:createStackNavigator({
            MyAccount: Scrn.MyAccountScrn
        },{
            defaultNavigationOptions:AppStyles.defaultNavigationOptions
        }),
        navigationOptions: {
            tabBarLabel:'My Account',
            tabBarIcon: ({focused}) => <Icon name={focused ? 'user_active' : 'user'} size={ICON_SIZE} />
        }
    },
    Notification: {
        screen:createStackNavigator({
            Notification: Scrn.NotificationScrn
        },{
            defaultNavigationOptions:AppStyles.defaultNavigationOptions
        }),
        navigationOptions: {
            tabBarLabel:'Notifications',
            tabBarIcon: ({focused}) => <Icon name={focused ? 'bell_active' : 'bell'} size={ICON_SIZE} />
        }
    },
    More: {
        screen:createStackNavigator({
            More: Scrn.MoreScrn
        },{
            defaultNavigationOptions:AppStyles.defaultNavigationOptions
        }),
        navigationOptions: {
            tabBarLabel:'More',
            tabBarIcon: () => <Icon name='hamburger' size={ICON_SIZE} />
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