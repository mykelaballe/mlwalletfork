import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import DrawerStack from './DrawerStack'
import {Colors} from '../themes'
import * as Scrn from '../screens'

export default createStackNavigator({
    Home: {
        screen: DrawerStack,
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
},{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor:Colors.brand
        },
        headerTitleStyle: {
            color:Colors.light
        },
        headerTintColor:Colors.light
    }
})