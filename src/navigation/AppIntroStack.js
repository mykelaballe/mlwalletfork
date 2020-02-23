import {createStackNavigator} from 'react-navigation-stack'
import * as Scrn from '../screens'
import {AppStyles} from '../themes'

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
    Countries: Scrn.CountriesScrn,
    Provinces: Scrn.ProvincesScrn,
    Cities: Scrn.CitiesScrn,
    SecurityQuestions: Scrn.SecurityQuestionsScrn,
    TermsAndConditions: Scrn.TermsAndConditionsScreen,
    Camera: Scrn.CameraScrn,
},{
    ...AppStyles.defaultNavigationOptions
})