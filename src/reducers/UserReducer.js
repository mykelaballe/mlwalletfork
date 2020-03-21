import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

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

const clearUser = state => state.merge({ user:null })
  
const ACTION_HANDLERS = {
  [Types.SET_USER]: setUser,
  [Types.UPDATE_BALANCE]: updateBalance,
  [Types.CLEAR_USER]: clearUser
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
