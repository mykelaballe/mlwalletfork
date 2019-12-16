import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import DrawerNavOptions from '../DrawerNavOptions'
import {TouchIDScreen} from '../../screens'

export default createStackNavigator({
    TransactionHistory: {
        screen:TouchIDScreen,
        navigationOptions:DrawerNavOptions
    }
})