import {combineReducers} from 'redux'
import AppReducer from './AppReducer'
import AuthReducer from './AuthReducer'
import FileReducer from './FileReducer'
import NetworkReducer from './NetworkReducer'
import NotificationReducer from './NotificationReducer'
import UserReducer from './UserReducer'
import WalletToWalletReducer from './WalletToWalletReducer'
import KPReducer from './KPReducer'
import BankTransferReducer from './BankTransferReducer'
import BillsPaymentReducer from './BillsPaymentReducer'
import ELoadReducer from './ELoadReducer'
import TransactionReducer from './TransactionReducer'

export default combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    user: UserReducer,
    file: FileReducer,
    network: NetworkReducer,
    notification: NotificationReducer,
    walletToWallet: WalletToWalletReducer,
    kp: KPReducer,
    bankTransfer: BankTransferReducer,
    billsPayment: BillsPaymentReducer,
    eLoad: ELoadReducer,
    transaction: TransactionReducer
})

export const persistentStoreBlacklist = []

export const persistentStoreWhitelist = ['app','user']
