import {createStackNavigator} from 'react-navigation-stack'
import * as Scrn from '../screens'
import SignUpRoutes from './SignUpRoutes'
import {AppStyles} from '../themes'

export default createStackNavigator({
    Login: {
        screen:Scrn.LoginScrn,
        navigationOptions:{
            header:null
        }
    },

    ...SignUpRoutes,
    
    ForgotPassword: {
        //screen:Scrn.ForgotPasswordScrn,
        screen:Scrn.AddKPReceiverScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },
    CreatePassword: {
        screen:Scrn.CreatePasswordScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },
    ValidatePIN: {
        screen:Scrn.ValidatePINScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },
    CreatePIN: {
        screen:Scrn.CreatePINScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },
    SecurityQuestion: {
        screen:Scrn.SecurityQuestionAuthScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },
    SendPassword: {
        screen:Scrn.SendPasswordScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },
    TouchID: {
        screen:Scrn.TouchIDScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },
    //Regions: Scrn.RegionsScrn,
},{
    defaultNavigationOptions:AppStyles.defaultNavigationOptions
})