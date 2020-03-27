import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import * as Scrn from '../screens'
import {AppStyles} from '../themes'

export default createMaterialTopTabNavigator({
    AllBankTransferReceivers: {
    screen: Scrn.AllBankTransferReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'All'
    })
  },
  FavoriteBankTransferReceivers: {
    screen: Scrn.FavoriteBankTransferReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Favorites'
    })
  },
  RecentBankTransferReceivers: {
    screen: Scrn.RecentBankTransferReceiversScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Recent'
    })
  }
},AppStyles.tabConfig)