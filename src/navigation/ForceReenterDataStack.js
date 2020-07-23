import {createStackNavigator} from 'react-navigation-stack'
import * as Scrn from '../screens'
import SignUpRoutes from './SignUpRoutes'
import {AppStyles} from '../themes'

export default createStackNavigator({
    ...SignUpRoutes
},{
    defaultNavigationOptions:AppStyles.defaultNavigationOptions
})