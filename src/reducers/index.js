import {combineReducers} from 'redux'
import AppReducer from './AppReducer'
import AuthReducer from './AuthReducer'
import FileReducer from './FileReducer'
import NetworkReducer from './NetworkReducer'
import NotificationReducer from './NotificationReducer'
import UserReducer from './UserReducer'

export default combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    user: UserReducer,
    file: FileReducer,
    network: NetworkReducer,
    notification: NotificationReducer
})

export const persistentStoreBlacklist = []

export const persistentStoreWhitelist = ['auth','user']
