import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {
    LoginScreen,
    ForgotPasswordScreen,

    RegisterIndexScreen,
    SignUpScreen,
    RegisterSuccessScreen,

    InformationScreen,
    ContactUsScreen,
    FAQScreen,
    AboutScreen,
    LocatorScreen,
    QRCodeScreen,
    RatesScreen,
    SecurityQuestionsScreen,
    TermsAndConditionsScreen,
    ShopStoreListingScreen,
    ShopViewStoreScreen,
    ShopViewProductScreen,
    ShopViewCartScreen,
    ShopMyOrdersScreen,
    ShopCheckoutOrderDetailsScreen,
    ShopCheckoutCustomerInfoScreen,
    ShopCheckoutPaymentScreen,
} from '../screens'
import SignUpStack from './SignUpStack'
import RatesStack from './RatesStack'
import {Colors} from '../themes'

export default createStackNavigator({
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,

    RegisterIndex: RegisterIndexScreen,
    SignUp: {
        screen: SignUpStack,
        navigationOptions: {
            title:'Register'
        }
    },
    RegisterSuccess: RegisterSuccessScreen,
    
    Information: InformationScreen,
    ContactUs: ContactUsScreen,
    FAQ: FAQScreen,
    About: AboutScreen,
    Locator: LocatorScreen,
    QRCode: QRCodeScreen,
    Rates: {
        screen:RatesStack,
        navigationOptions:{
            title:'Rates'
        }
    },
    SecurityQuestions: SecurityQuestionsScreen,
    TermsAndConditions: TermsAndConditionsScreen,
    ShopStoreListing: ShopStoreListingScreen,
    ShopViewStore: ShopViewStoreScreen,
    ShopViewProduct: ShopViewProductScreen,
    ShopViewCart: ShopViewCartScreen,
    ShopMyOrders: ShopMyOrdersScreen,
    ShopCheckoutOrderDetails: ShopCheckoutOrderDetailsScreen,
    ShopCheckoutCustomerInfo: ShopCheckoutCustomerInfoScreen,
    ShopCheckoutPayment: ShopCheckoutPaymentScreen,
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