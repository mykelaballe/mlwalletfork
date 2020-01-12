import React from 'react'
import {View} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import DrawerStack from './DrawerStack'
import HomeStack from './HomeStack'
import {Colors} from '../themes'
import * as Scrn from '../screens'

export default createStackNavigator({
    Home: {
        screen: HomeStack,//DrawerStack,
        navigationOptions: {
            header:null
        }
    },
    ProfileIndex: Scrn.ProfileIndexScreen,
    ChangeAccountInfo: Scrn.ChangeAccountInfoScreen,
    ChangeEmail: Scrn.ChangeEmailScreen,
    ChangeUsername: Scrn.ChangeUsernameScreen,
    ChangePassword: Scrn.ChangePasswordScreen,
    ChangePIN: Scrn.ChangePINScreen,
    ChangeMobileNumber: Scrn.ChangeMobileNumberScreen,
    ChangeSecurityQuestion: Scrn.ChangeSecurityQuestionScreen,
    SecurityQuestions: Scrn.SecurityQuestionsScreen,
    
    SubmitKPTN: Scrn.SubmitKPTNScreen,
    SubmitKPTNSender: Scrn.SubmitKPTNSenderScreen,
    SubmitKPTNPartner: Scrn.SubmitKPTNPartnerScreen,

    QRCode: Scrn.QRCodeScreen,

    MyAccount: Scrn.MyAccountScreen,

    AddReceiver: Scrn.AddReceiverScreen,

    ELoad: Scrn.ELoadScreen,

    Branches: Scrn.BranchesScreen,

    Accounts: Scrn.AccountsScreen,

    ShopStoreListing: Scrn.ShopStoreListingScreen,
    ShopViewStore: Scrn.ShopViewStoreScreen,
    ShopViewProduct: Scrn.ShopViewProductScreen,
    ShopViewCart: Scrn.ShopViewCartScreen,
    ShopMyOrders: Scrn.ShopMyOrdersScreen,
    ShopCheckoutOrderDetails: Scrn.ShopCheckoutOrderDetailsScreen,
    ShopCheckoutCustomerInfo: Scrn.ShopCheckoutCustomerInfoScreen,
    ShopCheckoutPayment: Scrn.ShopCheckoutPaymentScreen,

    SendMoneyIndex: Scrn.SendMoneyIndexScrn,
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

    ReceiveMoney: Scrn.ReceiveMoneyScrn,

    WithdrawCash: Scrn.WithdrawCashScrn,

    BuyLoad: Scrn.BuyLoadScrn,
    LoadOptions: Scrn.LoadOptionsScrn,

    BillsCategory: Scrn.BillsCategoryScrn,
    Billers: Scrn.BillersScrn,
    FavoriteBillers: Scrn.FavoriteBillersScrn,
    PayBill: Scrn.PayBillScrn,

    Partners: Scrn.PartnersScrn,
    MyContacts: Scrn.MyContactsScrn,
    MyContactProfile: Scrn.MyContactProfileScrn,

    TransactionReview: Scrn.TransactionReviewScrn,
    TransactionReceipt: Scrn.TransactionReceiptScrn,
    OTPConfirmation: Scrn.OTPConfirmationScrn,
    TransactionHistory: Scrn.TransactionHistoryScrn,
    Rates: Scrn.RatesScrn,
    Locator: Scrn.LocatorScreen,
    FAQ: Scrn.FAQScreen,
    ContactUs: Scrn.ContactUsScreen,
    TermsAndConditions: Scrn.TermsAndConditionsScreen,

    Profile: Scrn.ProfileScrn,
    EditProfile: Scrn.EditProfileScrn,
    VerificationLevels: Scrn.VerificationLevelsScrn,
    MyQR: Scrn.MyQRScrn,
    LoginSecurity: Scrn.LoginSecurityScrn,
    ChangePassword: Scrn.ChangePasswordScrn,
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor:Colors.brand
        },
        headerTitleStyle: {
            color:Colors.light,
            fontWeight:'bold',
            textAlign:'center',
            flex:1
        },
        headerTintColor:Colors.light,
        headerRight:<View />
    }
})