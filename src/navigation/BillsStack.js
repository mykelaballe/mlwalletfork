import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import * as Scrn from '../screens'
import {AppStyles} from '../themes'

export default createMaterialTopTabNavigator({
  BillsCategory: {
    screen: Scrn.BillsCategoryScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Category'
    })
  },
  AllBillsPartners: {
    screen: Scrn.AllBillsPartnersScrn,
    navigationOptions:() => ({
      tabBarLabel: 'All'
    })
  },
  FavoriteBillsPartners: {
    screen: Scrn.FavoriteBillsPartnersScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Favorites'
    })
  },
  RecentBillsPartners: {
    screen: Scrn.RecentBillsPartnersScrn,
    navigationOptions:() => ({
      tabBarLabel: 'Recent'
    })
  }
},AppStyles.tabConfig)