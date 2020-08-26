import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'
import {API} from '../services'

export const INITIAL_STATE = Immutable({
  isLoggedIn: false,
  isForceUpdate: false
})

const login = state => state.merge({ isLoggedIn:true })

const logout = state => {
  API.logout()
  return state.merge({ isLoggedIn:false })
}

const setIsForceUpdate = (state, action) => state.merge({ isForceUpdate:action.isForceUpdate })
  
const ACTION_HANDLERS = {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout,
  [Types.SET_IS_FORCE_UPDATE]: setIsForceUpdate
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
