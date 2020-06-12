import React from 'react'
import {View} from 'react-native'
import Colors from './Colors'

export default {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor:Colors.brand,
        },
        headerTitleStyle: {
            flex:1,
            color:Colors.light,
            textAlign:'center'
        },
        headerTintColor:Colors.light,
        headerRight:<View />
    },

    noHeaderNavigationOptions: {
        headerStyle:{
            backgroundColor:Colors.light,
            elevation:0
        },
        headerTintColor:Colors.brand
    },

    tabConfig: {
        tabBarOptions: {
            activeTintColor: Colors.light,
            labelStyle: {
              fontSize:10
            },
            style: {
              backgroundColor:Colors.brand
            }
        },
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        showIcon: false,
        lazy:true
    }
}