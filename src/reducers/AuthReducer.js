import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'
import {Consts, Storage} from '../utils'

export const INITIAL_STATE = Immutable({
  isLoggedIn: false
})

const login = state => state.merge({ isLoggedIn:true })

const logout = state => {
  Storage.doSave(Consts.db.user)
  return state.merge({ isLoggedIn:false })
}
  
const ACTION_HANDLERS = {
  [Types.LOGIN]: login,
  [Types.LOGOUT]: logout,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
