import React from 'react'
import {View} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import * as Scrn from '../screens'
import {Colors} from '../themes'

const noNavHeaderOptions = {
    headerStyle:{
        backgroundColor:'transparent'
    },
    headerTintColor:Colors.brand
}

const defaultNavigationOptions = {
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
}

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
        navigationOptions:noNavHeaderOptions
    },
    SignUpStep1: Scrn.SignUpStep1Scrn,
    SignUpStep2: Scrn.SignUpStep2Scrn,
    SignUpStep3: Scrn.SignUpStep3Scrn,
    SignUpStep4: Scrn.SignUpStep4Scrn,
    SignUpReview: Scrn.SignUpReviewScrn,
    SignUpVerificationMobile: Scrn.SignUpVerificationMobileScrn,
    SignUpVerificationOTP: Scrn.SignUpVerificationOTPScrn,
    SignUpSuccess: Scrn.SignUpSuccessScrn,
    ForgotPassword: {
        screen:Scrn.ForgotPasswordScrn,
        navigationOptions:noNavHeaderOptions
    },
    SecurityQuestion: {
        screen:Scrn.SecurityQuestionAuthScrn,
        navigationOptions:noNavHeaderOptions
    },
    SendPassword: {
        screen:Scrn.SendPasswordScrn,
        navigationOptions:noNavHeaderOptions
    },
    TouchID: {
        screen:Scrn.TouchIDScrn,
        navigationOptions:noNavHeaderOptions
    },
    Countries: Scrn.CountriesScrn,
    Provinces: Scrn.ProvincesScrn,
    Cities: Scrn.CitiesScrn,
    SecurityQuestions: Scrn.SecurityQuestionsScrn,
    TermsAndConditions: Scrn.TermsAndConditionsScreen,
    Camera: Scrn.CameraScrn,
},{
    defaultNavigationOptions
})