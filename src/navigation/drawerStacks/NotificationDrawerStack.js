import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import DrawerNavOptions from '../DrawerNavOptions'
import {NotificationScreen} from '../../screens'

export default createStackNavigator({
    Notification: {
        screen:NotificationScreen,
        navigationOptions:DrawerNavOptions
    }
})