import * as Scrn from '../screens'
import {AppStyles} from '../themes'

export default {
    SignUpUsername: {
        screen:Scrn.SignUpUsernameScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },
    SignUpPassword: {
        screen:Scrn.SignUpPasswordScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },
    SignUpPIN: {
        screen:Scrn.SignUpPINScrn,
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
    Nationalities: Scrn.NationalitiesScrn,
    SourceOfIncome: Scrn.SourceOfIncomeScrn,
    NatureOfWork: Scrn.NatureOfWorkScrn,
    SecurityQuestions: Scrn.SecurityQuestionsScrn,
    TermsAndConditions: Scrn.TermsAndConditionsScreen,
    PrivacyNotice: Scrn.PrivacyNoticeScrn,
    Camera: Scrn.CameraScrn,
}