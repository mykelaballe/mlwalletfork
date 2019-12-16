import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  isFirstTime: true
})

const setIsFirstTime = (state, action) => state.merge({ isFirstTime:action.isFirstTime })

const ACTION_HANDLERS = {
  [Types.SET_IS_FIRST_TIME]: setIsFirstTime
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
