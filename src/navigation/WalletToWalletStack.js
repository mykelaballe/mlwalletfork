import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import * as Scrn from '../screens'
import {AppStyles} from '../themes'

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
},AppStyles.tabConfig)