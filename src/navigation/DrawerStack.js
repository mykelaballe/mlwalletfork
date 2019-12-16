import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import Icon from 'react-native-vector-icons/Ionicons'
import {Drawer} from '../components'
import {Colors, Metrics} from '../themes'
import {
    HomeDrawerStack,
    RemitToBankDrawerStack,
    LoadDrawerStack,
    PendingCashoutDrawerStack,
    TransactionHistoryDrawerStack,
    NotificationDrawerStack,
    RewardDrawerStack,
    LocationDrawerStack,
    MyProfileDrawerStack,
    RatesDrawerStack,
    TouchIDDrawerStack,
} from './drawerStacks'

const ICON_SIZE = Metrics.icon.sm

const createIcon = ({focused}, iconName) => <Icon name={iconName} size={ICON_SIZE} color={focused ? Colors.brand : Colors.black} />

export default createDrawerNavigator({
    Home:{
        screen: HomeDrawerStack,
        navigationOptions:{
            drawerIcon:(params) => createIcon(params, 'ios-home')
        }
    },
    RemitToBank:{
        screen: RemitToBankDrawerStack,
        navigationOptions:{
            drawerLabel:'Remit To Bank',
            drawerIcon:(params) => createIcon(params, 'ios-cash')
        }
    },
    Load:{
        screen: LoadDrawerStack,
        navigationOptions:{
            drawerLabel:'Load',
            drawerIcon:(params) => createIcon(params, 'ios-card')
        }
    },
    PendingCashout:{
        screen: PendingCashoutDrawerStack,
        navigationOptions:{
            drawerLabel:'Pending Cashout',
            drawerIcon:(params) => createIcon(params, 'ios-filing')
        }
    },
    TransactionHistory:{
        screen: TransactionHistoryDrawerStack,
        navigationOptions:{
            drawerLabel:'Transaction History',
            drawerIcon:(params) => createIcon(params, 'ios-journal')
        }
    },
    Notification:{
        screen: NotificationDrawerStack,
        navigationOptions:{
            drawerIcon:(params) => createIcon(params, 'ios-notifications')
        }
    },
    Reward:{
        screen: RewardDrawerStack,
        navigationOptions:{
            drawerIcon:(params) => createIcon(params, 'ios-trophy')
        }
    },
    Location:{
        screen: LocationDrawerStack,
        navigationOptions:{
            drawerIcon:(params) => createIcon(params, 'ios-pin')
        }
    },
    MyReceiver:{
        screen: HomeDrawerStack,
        navigationOptions:{
            drawerLabel:'My Receiver',
            drawerIcon:(params) => createIcon(params, 'ios-person-add')
        }
    },
    MyBillsPay:{
        screen: HomeDrawerStack,
        navigationOptions:{
            drawerLabel:'My Bills Pay',
            drawerIcon:(params) => createIcon(params, 'ios-people')
        }
    },
    MyProfile:{
        screen: MyProfileDrawerStack,
        navigationOptions:{
            drawerLabel:'My Profile',
            drawerIcon:(params) => createIcon(params, 'ios-contact')
        }
    },
    Rates:{
        screen: RatesDrawerStack,
        navigationOptions:{
            drawerIcon:(params) => createIcon(params, 'ios-trending-up')
        }
    },
    TouchID:{
        screen: TouchIDDrawerStack,
        navigationOptions:{
            drawerLabel:'Touch ID',
            drawerIcon:(params) => createIcon(params, 'ios-finger-print')
        }
    }
},{
    contentComponent: Drawer,
    contentOptions: {
        activeTintColor:Colors.brand
    },
    unmountInactiveRoutes: true
})