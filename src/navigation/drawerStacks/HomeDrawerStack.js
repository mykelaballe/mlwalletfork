import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import DrawerNavOptions from '../DrawerNavOptions'
import {HomeScreen} from '../../screens'

export default createStackNavigator({
    Home: {
        screen:HomeScreen,
        navigationOptions:DrawerNavOptions
    }
})