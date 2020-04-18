import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  isFirstTime: true,
  isTouchIDSupported: false,
  isUsingTouchID: false,
  hasSeenSendMoneyOnboarding: false,
  hasSeenReceiveMoneyOnboarding: false,
  hasSeenWithdrawCashOnboarding: false,
  hasSeenPayBillsOnboarding: false,
  hasSeenBuyLoadOnboarding: false,
  isLocationEnabled: false
})

const setIsFirstTime = (state, action) => state.merge({ isFirstTime:action.isFirstTime })

const setIsTouchIDSupported = (state, action) => state.merge({ isTouchIDSupported:action.isSupported })

const setIsUsingTouchID = (state, action) => state.merge({ isUsingTouchID:action.isUsing })

const setHasSeenSendMoneyOnboarding = (state, action) => state.merge({ hasSeenSendMoneyOnboarding:action.hasSeen })

const setHasSeenReceiveMoneyOnboarding = (state, action) => state.merge({ hasSeenReceiveMoneyOnboarding:action.hasSeen })

const setHasSeenWithdrawCashOnboarding = (state, action) => state.merge({ hasSeenWithdrawCashOnboarding:action.hasSeen })

const setHasSeenPayBillsOnboarding = (state, action) => state.merge({ hasSeenPayBillsOnboarding:action.hasSeen })

const setHasSeenBuyLoadOnboarding = (state, action) => state.merge({ hasSeenBuyLoadOnboarding:action.hasSeen })

const setIsLocationEnabled = (state, action) => state.merge({ isLocationEnabled:action.isEnabled })

const ACTION_HANDLERS = {
  [Types.SET_IS_FIRST_TIME]: setIsFirstTime,
  [Types.SET_IS_TOUCH_ID_SUPPORTED]: setIsTouchIDSupported,
  [Types.SET_IS_USING_TOUCH_ID]: setIsUsingTouchID,
  [Types.SET_HAS_SEEN_SENDMONEY_ONBOARDING]: setHasSeenSendMoneyOnboarding,
  [Types.SET_HAS_SEEN_RECEIVEMONEY_ONBOARDING]: setHasSeenReceiveMoneyOnboarding,
  [Types.SET_HAS_SEEN_WITHDRAWCASH_ONBOARDING]: setHasSeenWithdrawCashOnboarding,
  [Types.SET_HAS_SEEN_PAYBILLS_ONBOARDING]: setHasSeenPayBillsOnboarding,
  [Types.SET_HAS_SEEN_BUYLOAD_ONBOARDING]: setHasSeenBuyLoadOnboarding,
  [Types.SET_IS_LOCATION_ENABLED]: setIsLocationEnabled
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
