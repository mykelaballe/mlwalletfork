import {createStackNavigator} from 'react-navigation-stack'
import * as Scrn from '../screens'
import SignUpRoutes from './SignUpRoutes'
import {AppStyles} from '../themes'

export default createStackNavigator({
    SignUpPIN:SignUpRoutes.SignUpPIN,
    SignUpStep1:SignUpRoutes.SignUpStep1,
    SignUpStep3:SignUpRoutes.SignUpStep3,
    SourceOfIncome:SignUpRoutes.SourceOfIncome,
    NatureOfWork:SignUpRoutes.NatureOfWork,
    Camera:SignUpRoutes.Camera
},{
    defaultNavigationOptions:AppStyles.defaultNavigationOptions
})