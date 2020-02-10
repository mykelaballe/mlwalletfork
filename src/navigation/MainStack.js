import React from 'react'
import {View} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import HomeStack from './HomeStack'
import {Colors} from '../themes'
import * as Scrn from '../screens'

export default createStackNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            header:null
        }
    },

    SendMoneyOnBoarding: Scrn.SendMoneyOnBoardingScrn,
    SendMoneyIndex: Scrn.SendMoneyIndexScrn,
    ReceiveMoneyOnBoarding: Scrn.ReceiveMoneyOnBoardingScrn,
    ReceiveMoneyIndex: Scrn.ReceiveMoneyIndexScrn,

    SendWalletToWallet: Scrn.SendWalletToWalletScrn,
    SavedWalletReceivers: Scrn.SavedWalletReceiversScrn,
    ReceiverWalletProfile: Scrn.ReceiverWalletProfileScrn,
    AddWalletReceiver: Scrn.AddWalletReceiverScrn,
    UpdateWalletReceiver: Scrn.UpdateWalletReceiverScrn,

    SendKP: Scrn.SendKPScrn,
    SavedKPReceivers: Scrn.SavedKPReceiversScrn,
    ReceiverKPProfile: Scrn.ReceiverKPProfileScrn,
    AddKPReceiver: Scrn.AddKPReceiverScrn,
    UpdateKPReceiver: Scrn.UpdateKPReceiverScrn,

    SavedBankPartners: Scrn.SavedBankPartnersScrn,
    SendBankTransfer: Scrn.SendBankTransferScrn,
    AddBankPartner: Scrn.AddBankPartnerScrn,
    UpdateBankPartner: Scrn.UpdateBankPartnerScrn,
    BankPartnerProfile: Scrn.BankPartnerProfileScrn,

    ReceiveMoneyDomestic: Scrn.ReceiveMoneyDomesticScrn,
    ReceiveMoneyInternational: Scrn.ReceiveMoneyInternationalScrn,

    WithdrawCashOnBoarding: Scrn.WithdrawCashOnBoardingScrn,
    WithdrawCash: Scrn.WithdrawCashScrn,

    BuyLoadOnBoarding: Scrn.BuyLoadOnBoardingScrn,
    BuyLoad: Scrn.BuyLoadScrn,
    SavedLoadReceivers: Scrn.SavedLoadReceiversScrn,
    AddLoadReceiver: Scrn.AddLoadReceiverScrn,
    LoadOptions: Scrn.LoadOptionsScrn,

    PayBillsOnBoarding: Scrn.PayBillsOnBoardingScrn,
    BillsCategory: Scrn.BillsCategoryScrn,
    Billers: Scrn.BillersScrn,
    AddBillerFavorite: Scrn.AddBillerFavoriteScrn,
    BillerProfile: Scrn.BillerProfileScrn,
    FavoriteBillers: Scrn.FavoriteBillersScrn,
    PayBill: Scrn.PayBillScrn,

    Partners: Scrn.PartnersScrn,
    MyContacts: Scrn.MyContactsScrn,
    MyContactProfile: Scrn.MyContactProfileScrn,

    Currencies: Scrn.CurrenciesScrn,
    Reminders: Scrn.RemindersScrn,
    Countries: Scrn.CountriesScrn,
    Provinces: Scrn.ProvincesScrn,
    Cities: Scrn.CitiesScrn,

    TransactionReview: Scrn.TransactionReviewScrn,
    TransactionReceipt: Scrn.TransactionReceiptScrn,
    OTPConfirmation: Scrn.OTPConfirmationScrn,
    TransactionHistory: Scrn.TransactionHistoryScrn,
    Rates: Scrn.RatesScrn,
    Locator: Scrn.LocatorScreen,
    FAQ: Scrn.FAQScrn,
    PrivacyNotice: Scrn.PrivacyNoticeScrn,
    ContactUs: Scrn.ContactUsScreen,
    TermsAndConditions: Scrn.TermsAndConditionsScreen,

    Profile: Scrn.ProfileScrn,
    EditProfile: Scrn.EditProfileScrn,
    VerificationLevels: Scrn.VerificationLevelsScrn,
    MyQR: Scrn.MyQRScrn,
    LoginSecurity: Scrn.LoginSecurityScrn,
    ChangePassword: Scrn.ChangePasswordScrn,

    ComingSoon: Scrn.ComingSoonScrn,
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor:Colors.brand
        },
        headerTitleStyle: {
            color:Colors.light,
            textAlign:'center',
            flex:1
        },
        headerTintColor:Colors.light,
        headerRight:<View />
    }
})