import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import * as Scrn from '../screens'
import {Colors} from '../themes'

export default createStackNavigator({
    AuthIndex: {
        screen:Scrn.AuthIndexScrn,
        navigationOptions:{
            header:null
        }
    },
    Login: {
        screen:Scrn.LoginScrn,
        navigationOptions:{
            header:null
        }
    },
    SignUp: {
        screen:Scrn.SignUpScrn,
        navigationOptions:{
            headerStyle:{
                backgroundColor:'transparent'
            },
            headerTintColor:Colors.brand
        }
    },
    ForgotPassword: {
        screen:Scrn.ForgotPasswordScrn,
        navigationOptions:{
            headerStyle:{
                backgroundColor:'transparent'
            },
            headerTintColor:Colors.brand
        }
    },
    TouchID: {
        screen:Scrn.TouchIDScrn,
        navigationOptions:{
            headerStyle:{
                backgroundColor:'transparent'
            },
            headerTintColor:Colors.brand
        }
    }
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor:Colors.brand
        },
        headerTitleStyle: {
            color:Colors.light
        },
        headerTintColor:Colors.light
    }
})