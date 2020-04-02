import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'
import {Consts, Storage} from '../utils'

export const INITIAL_STATE = Immutable({
  data: null
})

const setUser = (state, action) => state.merge({ data:{...action.user} })

const updateBalance = (state, action) => {
  let data = {
    ...state.data,
    balance:action.newBalance
  }
  return state.merge({ data })
}

const updateUserInfo = (state, action) => {
  let data = {
    ...state.data,
    ...action.newInfo
  }
  Storage.doSave(Consts.db.user, data)
  return state.merge({ data })
}

const clearUser = state => state.merge({ user:null })
  
const ACTION_HANDLERS = {
  [Types.SET_USER]: setUser,
  [Types.UPDATE_BALANCE]: updateBalance,
  [Types.UPDATE_USER_INFO]: updateUserInfo,
  [Types.CLEAR_USER]: clearUser
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
