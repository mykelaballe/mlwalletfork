import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import DrawerNavOptions from '../DrawerNavOptions'
import {Colors} from '../../themes'
import RemitToBankStack from '../RemitToBankStack'

export default createStackNavigator({
    RemitToBank: {
        screen:RemitToBankStack,
        navigationOptions:{
            ...DrawerNavOptions(),
            title:'Remit To Bank'
        }
    }
})