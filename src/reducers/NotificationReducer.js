import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  notifications: []
})

const setNotifications = (state, action) => state.merge({ notifications: action.notifications })

const clearNotifications = (state, action) => state.merge({ notifications: [] })
  
const ACTION_HANDLERS = {
  [Types.SET_NOTIFICATIONS]: setNotifications,
  [Types.CLEAR_NOTIFICATIONS]: clearNotifications,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
