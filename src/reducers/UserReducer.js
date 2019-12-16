import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  data: null
})

const setUser = (state, action) => state.merge({ data:{...action.user} })

const clearUser = (state, action) => state.merge({ user:null })
  
const ACTION_HANDLERS = {
  [Types.SET_USER]: setUser,
  [Types.CLEAR_USER]: clearUser
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
