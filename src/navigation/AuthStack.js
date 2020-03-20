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
    SignUpUsername: {
        screen:Scrn.SignUpUsernameScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },
    SignUpPassword: {
        screen:Scrn.SignUpPasswordScrn,
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
    Countries: Scrn.CountriesScrn,
    Provinces: Scrn.ProvincesScrn,
    Cities: Scrn.CitiesScrn,
    Nationalities: Scrn.NationalitiesScrn,
    SourceOfIncome: Scrn.SourceOfIncomeScrn,
    Regions: Scrn.RegionsScrn,
    SecurityQuestions: Scrn.SecurityQuestionsScrn,
    TermsAndConditions: Scrn.TermsAndConditionsScreen,
    Camera: Scrn.CameraScrn,
},{
    defaultNavigationOptions:AppStyles.defaultNavigationOptions
})