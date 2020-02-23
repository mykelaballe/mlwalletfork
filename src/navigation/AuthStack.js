import {createStackNavigator} from 'react-navigation-stack'
import * as Scrn from '../screens'
import {AppStyles} from '../themes'

export default createStackNavigator({
    Login: {
        screen:Scrn.LoginScrn,
        navigationOptions:{
            header:null
        }
    },
    SignUp: {
        screen:Scrn.SignUpScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
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
    Countries: Scrn.CountriesScrn,
    Provinces: Scrn.ProvincesScrn,
    Cities: Scrn.CitiesScrn,
    Nationalities: Scrn.NationalitiesScrn,
    SecurityQuestions: Scrn.SecurityQuestionsScrn,
    TermsAndConditions: Scrn.TermsAndConditionsScreen,
    Camera: Scrn.CameraScrn,
},{
    defaultNavigationOptions:AppStyles.defaultNavigationOptions
})