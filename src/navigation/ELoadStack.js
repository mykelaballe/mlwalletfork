import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import * as Scrn from '../screens'
import {AppStyles} from '../themes'

export default createMaterialTopTabNavigator({
    AllSavedWalletReceivers: {
    screen: Scrn.AllELoadReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'All'
    })
  },
  FavoriteWalletReceivers: {
    screen: Scrn.FavoriteELoadReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Favorites'
    })
  },
  RecentWalletReceivers: {
    screen: Scrn.RecentELoadReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Recent'
    })
  }
},AppStyles.tabConfig)