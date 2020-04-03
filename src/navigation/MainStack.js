import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import HomeStack from './HomeStack'
import WalletToWalletStack from './WalletToWalletStack'
import KPStack from './KPStack'
import BankTransferStack from './BankTransferStack'
import ELoadStack from './ELoadStack'
import BillsStack from './BillsStack'
import {HeaderRight, ButtonText} from '../components'
import {AppStyles, Colors} from '../themes'
import {Consts} from '../utils'
import * as Scrn from '../screens'

export default createStackNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            header:null
        }
    },

    AddMoneyIndex: Scrn.AddMoneyIndexScrn,
    AddMoneyBranch: Scrn.AddMoneyBranchScrn,
    DepositMoney: Scrn.DepositMoneyScrn,
    AddMoneyForm: Scrn.AddMoneyFormScrn,

    SendMoneyOnBoarding: Scrn.SendMoneyOnBoardingScrn,
    SendMoneyIndex: Scrn.SendMoneyIndexScrn,
    ReceiveMoneyOnBoarding: Scrn.ReceiveMoneyOnBoardingScrn,
    ReceiveMoneyIndex: Scrn.ReceiveMoneyIndexScrn,

    SendWalletToWallet: Scrn.SendWalletToWalletScrn,
    SavedWalletReceivers: Scrn.SavedWalletReceiversScrn,
    ReceiverWalletProfile: Scrn.ReceiverWalletProfileScrn,
    AddWalletReceiver: Scrn.AddWalletReceiverScrn,
    UpdateWalletReceiver: Scrn.UpdateWalletReceiverScrn,
    SendWalletToWalletIndex: {
        screen:WalletToWalletStack,
        navigationOptions:({navigation}) => ({
            title:Consts.tcn.stw.short_desc,
            headerRight:(
                <HeaderRight>
                    <ButtonText color={Colors.light} t='Rates' onPress={() => navigation.navigate('WalletRates')} />
                </HeaderRight>
            )
        })
    },

    SendKP: Scrn.SendKPScrn,
    SavedKPReceivers: Scrn.SavedKPReceiversScrn,
    ReceiverKPProfile: Scrn.ReceiverKPProfileScrn,
    AddKPReceiver: Scrn.AddKPReceiverScrn,
    UpdateKPReceiver: Scrn.UpdateKPReceiverScrn,
    SendKPIndex: {
        screen:KPStack,
        navigationOptions:({navigation}) => ({
            title:Consts.tcn.skp.short_desc,
            headerRight:(
                <HeaderRight>
                    <ButtonText color={Colors.light} t='Rates' onPress={() => navigation.navigate('Rates')} />
                </HeaderRight>
            )
        })
    },

    SavedBankPartners: Scrn.SavedBankPartnersScrn,
    SendBankTransfer: Scrn.SendBankTransferScrn,
    AddBankPartner: Scrn.AddBankPartnerScrn,
    UpdateBankPartner: Scrn.UpdateBankPartnerScrn,
    BankPartnerProfile: Scrn.BankPartnerProfileScrn,
    SendBankTransferIndex: {
        screen:BankTransferStack,
        navigationOptions:({navigation}) => ({
            title:Consts.tcn.stb.short_desc,
            headerRight:(
                <HeaderRight>
                    <ButtonText color={Colors.light} t='Rates' onPress={() => navigation.navigate('BankTransferRates')} />
                </HeaderRight>
            )
        })
    },

    ReceiveMoneyDomestic: Scrn.ReceiveMoneyDomesticScrn,
    ReceiveMoneyInternational: Scrn.ReceiveMoneyInternationalScrn,

    WithdrawCashOnBoarding: Scrn.WithdrawCashOnBoardingScrn,
    WithdrawCash: Scrn.WithdrawCashScrn,

    BuyLoadOnBoarding: Scrn.BuyLoadOnBoardingScrn,
    BuyLoad: Scrn.BuyLoadScrn,
    SavedLoadReceivers: Scrn.SavedLoadReceiversScrn,
    AddLoadReceiver: Scrn.AddLoadReceiverScrn,
    ReceiverLoadProfile: Scrn.ReceiverLoadReceiverScrn,
    UpdateLoadReceiver: Scrn.UpdateLoadReceiverScrn,
    LoadOptions: Scrn.LoadOptionsScrn,
    BuyLoadIndex: {
        screen:ELoadStack,
        navigationOptions:{
            title:Consts.tcn.bul.short_desc
        }
    },

    PayBillsOnBoarding: Scrn.PayBillsOnBoardingScrn,
    BillsCategory: Scrn.BillsCategoryScrn,
    Billers: Scrn.BillersScrn,
    AddBillerFavorite: Scrn.AddBillerFavoriteScrn,
    BillerProfile: Scrn.BillerProfileScrn,
    AddBiller: Scrn.AddBillerScrn,
    UpdateBiller: Scrn.UpdateBillerScrn,
    FavoriteBillers: Scrn.FavoriteBillersScrn,
    PayBill: Scrn.PayBillScrn,
    PayBillsIndex: {
        screen:BillsStack,
        navigationOptions:{
            title:Consts.tcn.bpm.short_desc
        }
    },

    Partners: Scrn.PartnersScrn,
    MyContacts: Scrn.MyContactsScrn,
    MyContactProfile: Scrn.MyContactProfileScrn,

    Currencies: Scrn.CurrenciesScrn,
    Reminders: Scrn.RemindersScrn,
    Countries: Scrn.CountriesScrn,
    Provinces: Scrn.ProvincesScrn,
    Cities: Scrn.CitiesScrn,
    Nationalities: Scrn.NationalitiesScrn,
    SourceOfIncome: Scrn.SourceOfIncomeScrn,

    TransactionReview: Scrn.TransactionReviewScrn,
    TransactionReceipt: Scrn.TransactionReceiptScrn,
    OTPConfirmation: Scrn.OTPConfirmationScrn,
    PINConfirmation: Scrn.PINConfirmationScrn,
    TransactionQR: Scrn.TransactionQRScrn,

    SecurityQuestion: {
        screen:Scrn.SecurityQuestionAuthScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },

    SecurityQuestions: Scrn.SecurityQuestionsScrn,

    TransactionHistory: Scrn.TransactionHistoryScrn,
    Rates: Scrn.RatesScrn,
    WalletRates: Scrn.WalletRatesScrn,
    BankTransferRates: Scrn.BankTransferRatesScrn,
    Locator: Scrn.LocatorScreen,
    FAQ: Scrn.FAQScrn,
    PrivacyNotice: Scrn.PrivacyNoticeScrn,
    ContactUs: Scrn.ContactUsScreen,
    TermsAndConditions: Scrn.TermsAndConditionsScreen,

    Profile: Scrn.ProfileScrn,
    EditProfileIndex: Scrn.EditProfileIndexScrn,
    EditMyNameIndex: Scrn.EditMyNameIndexScrn,
    EditMyName: Scrn.EditMyNameScrn,
    EditMyBirthdayIndex: Scrn.EditMyBirthdayIndexScrn,
    EditMyBirthday: Scrn.EditMyBirthdayScrn,
    EditMyGender: Scrn.EditMyGenderScrn,
    EditMyMobileNoIndex: Scrn.EditMyMobileNoIndexScrn,
    EditMyMobileNo: Scrn.EditMyMobileNoScrn,
    EditMyEmailIndex: Scrn.EditMyEmailIndexScrn,
    EditMyEmail: Scrn.EditMyEmailScrn,
    EditMyOtherDetails: Scrn.EditMyOtherDetailsScrn,
    EditProfile: Scrn.EditProfileScrn,
    VerificationLevels: Scrn.VerificationLevelsScrn,
    MyQR: Scrn.MyQRScrn,
    MyPoints: Scrn.MyPointsScrn,
    LoginSecurity: Scrn.LoginSecurityScrn,
    ChangePassword: Scrn.ChangePasswordScrn,
    ChangePIN: Scrn.ChangePINScrn,
    SendPIN: {
        screen:Scrn.SendPINScrn,
        navigationOptions:AppStyles.noHeaderNavigationOptions
    },

    ComingSoon: Scrn.ComingSoonScrn,
},{
    defaultNavigationOptions: AppStyles.defaultNavigationOptions
})