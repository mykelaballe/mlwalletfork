import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import DrawerNavOptions from '../DrawerNavOptions'
import {RewardScreen} from '../../screens'

export default createStackNavigator({
    Reward: {
        screen:RewardScreen,
        navigationOptions:DrawerNavOptions
    }
})