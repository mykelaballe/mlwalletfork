import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import * as Scrn from '../screens'
import {AppStyles} from '../themes'

export default createMaterialTopTabNavigator({
    AllSavedWalletReceivers: {
    screen: Scrn.AllKPReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'All'
    })
  },
  FavoriteWalletReceivers: {
    screen: Scrn.FavoriteKPReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Favorites'
    })
  },
  RecentWalletReceivers: {
    screen: Scrn.RecentKPReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Recent'
    })
  }
},AppStyles.tabConfig)