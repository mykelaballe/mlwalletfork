import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import * as Scrn from '../screens'
import {Colors} from '../themes'

export default createMaterialTopTabNavigator({
    AllSavedWalletReceivers: {
    screen: Scrn.AllSavedWalletReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'All'
    })
  },
  FavoriteWalletReceivers: {
    screen: Scrn.FavoriteWalletReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Favorites'
    })
  },
  RecentWalletReceivers: {
    screen: Scrn.RecentWalletReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Recent'
    })
  }
},{
    tabBarOptions: {
        activeTintColor: Colors.light,
        labelStyle: {
          fontSize:11
        },
        style: {
          backgroundColor:Colors.brand
        }
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    showIcon: false
})