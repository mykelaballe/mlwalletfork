import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import DrawerNavOptions from '../DrawerNavOptions'
import {Colors} from '../../themes'
import RatesStack from '../RatesStack'

export default createStackNavigator({
    Rates: {
        screen:RatesStack,
        navigationOptions:{
            ...DrawerNavOptions(),
            title:'Rates'
        }
    }
})