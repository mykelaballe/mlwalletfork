import {combineReducers} from 'redux'
import AppReducer from './AppReducer'
import AuthReducer from './AuthReducer'
import FileReducer from './FileReducer'
import NetworkReducer from './NetworkReducer'
import NotificationReducer from './NotificationReducer'
import UserReducer from './UserReducer'
import WalletToWalletReducer from './WalletToWalletReducer'
import KPReducer from './KPReducer'

export default combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    user: UserReducer,
    file: FileReducer,
    network: NetworkReducer,
    notification: NotificationReducer,
    walletToWallet: WalletToWalletReducer,
    kp: KPReducer,
})

export const persistentStoreBlacklist = []

export const persistentStoreWhitelist = ['app', 'auth','user']
