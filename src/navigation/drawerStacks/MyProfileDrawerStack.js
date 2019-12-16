import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import DrawerNavOptions from '../DrawerNavOptions'
import {MyProfileScreen} from '../../screens'

export default createStackNavigator({
    TouchID: {
        screen:MyProfileScreen,
        navigationOptions:DrawerNavOptions
    }
})