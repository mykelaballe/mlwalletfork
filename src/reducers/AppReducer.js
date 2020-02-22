import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  isFirstTime: true,
  isUsingTouchID: false
})

const setIsFirstTime = (state, action) => state.merge({ isFirstTime:action.isFirstTime })

const setIsUsingTouchID = (state, action) => state.merge({ isUsingTouchID:action.isUsingTouchID })

const ACTION_HANDLERS = {
  [Types.SET_IS_FIRST_TIME]: setIsFirstTime,
  [Types.SET_IS_USING_TOUCH_ID]: setIsUsingTouchID
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
