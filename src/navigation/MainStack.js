import {createStackNavigator} from 'react-navigation-stack'
import HomeStack from './HomeStack'
import WalletToWalletStack from './WalletToWalletStack'
import KPStack from './KPStack'
import BankTransferStack from './BankTransferStack'
import ELoadStack from './ELoadStack'
import {AppStyles} from '../themes'
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
    SendWalletToWalletIndex: WalletToWalletStack,

    SendKP: Scrn.SendKPScrn,
    SavedKPReceivers: Scrn.SavedKPReceiversScrn,
    ReceiverKPProfile: Scrn.ReceiverKPProfileScrn,
    AddKPReceiver: Scrn.AddKPReceiverScrn,
    UpdateKPReceiver: Scrn.UpdateKPReceiverScrn,
    SendKPIndex: KPStack,

    SavedBankPartners: Scrn.SavedBankPartnersScrn,
    SendBankTransfer: Scrn.SendBankTransferScrn,
    AddBankPartner: Scrn.AddBankPartnerScrn,
    UpdateBankPartner: Scrn.UpdateBankPartnerScrn,
    BankPartnerProfile: Scrn.BankPartnerProfileScrn,
    SendBankTransferIndex: BankTransferStack,

    ReceiveMoneyDomestic: Scrn.ReceiveMoneyDomesticScrn,
    ReceiveMoneyInternational: Scrn.ReceiveMoneyInternationalScrn,

    WithdrawCashOnBoarding: Scrn.WithdrawCashOnBoardingScrn,
    WithdrawCash: Scrn.WithdrawCashScrn,

    BuyLoadOnBoarding: Scrn.BuyLoadOnBoardingScrn,
    BuyLoad: Scrn.BuyLoadScrn,
    SavedLoadReceivers: Scrn.SavedLoadReceiversScrn,
    AddLoadReceiver: Scrn.AddLoadReceiverScrn,
    LoadOptions: Scrn.LoadOptionsScrn,
    BuyLoadIndex: ELoadStack,

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