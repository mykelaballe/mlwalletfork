import {createStackNavigator} from 'react-navigation-stack'
import * as Scrn from '../screens'
import SignUpRoutes from './SignUpRoutes'
import {AppStyles} from '../themes'

export default createStackNavigator({
    AuthIndex: {
        screen:Scrn.AuthIndexScrn,
        navigationOptions:{
            header:null
        }
    },
    ...SignUpRoutes
},{
    defaultNavigationOptions:AppStyles.defaultNavigationOptions
})