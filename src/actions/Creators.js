import Types from './Types'

/*----------------------------------------------------------------------
 STARTUP
 ----------------------------------------------------------------------*/
 
 const startup = () => ({ type: Types.STARTUP })

 /*----------------------------------------------------------------------
 APP
 ----------------------------------------------------------------------*/
 
 const setIsFirstTime = isFirstTime => ({ type: Types.SET_IS_FIRST_TIME, isFirstTime })

 const setIsUsingTouchID = isUsing => ({ type: Types.SET_IS_USING_TOUCH_ID, isUsing })

 const setHasSeenSendMoneyOnboarding = hasSeen => ({ type: Types.SET_HAS_SEEN_SENDMONEY_ONBOARDING, hasSeen })

 const setHasSeenReceiveMoneyOnboarding = hasSeen => ({ type: Types.SET_HAS_SEEN_RECEIVEMONEY_ONBOARDING, hasSeen })

 const setHasSeenWithdrawCashOnboarding = hasSeen => ({ type: Types.SET_HAS_SEEN_WITHDRAWCASH_ONBOARDING, hasSeen })

 const setHasSeenPayBillsOnboarding = hasSeen => ({ type: Types.SET_HAS_SEEN_PAYBILLS_ONBOARDING, hasSeen })

 const setHasSeenBuyLoadOnboarding = hasSeen => ({ type: Types.SET_HAS_SEEN_BUYLOAD_ONBOARDING, hasSeen })

 /*----------------------------------------------------------------------
 AUTHENTICATION
 ----------------------------------------------------------------------*/

 const login = () => ({ type: Types.LOGIN })

 const logout = () => ({ type: Types.LOGOUT })

 /*----------------------------------------------------------------------
 USER
 ----------------------------------------------------------------------*/

 const setUser = user => ({ type: Types.SET_USER, user })

 const clearUser = () => ({ type: Types.CLEAR_USER })

 /*----------------------------------------------------------------------
 FILES
 ----------------------------------------------------------------------*/

 const setAttachedFiles = files => ({ type: Types.SET_ATTACHED_FILES, files })

 const clearAttachedFiles = () => ({ type: Types.CLEAR_ATTACHED_FILES })

 /*----------------------------------------------------------------------
 NETWORK
 ----------------------------------------------------------------------*/

 const networkSuccess = () => ({ type: Types.NETWORK_SUCCESS })

 const networkFailure = () => ({ type: Types.NETWORK_FAILURE })

 /*----------------------------------------------------------------------
 NOTIFICATION
 ----------------------------------------------------------------------*/

 const setNotifications = notifications => ({ type: Types.SET_NOTIFICATIONS, notifications })

 const clearNotifications = () => ({ type: Types.CLEAR_NOTIFICATIONS })

export default {
  startup,

  setIsFirstTime,
  setIsUsingTouchID,
  setHasSeenSendMoneyOnboarding,
  setHasSeenReceiveMoneyOnboarding,
  setHasSeenWithdrawCashOnboarding,
  setHasSeenPayBillsOnboarding,
  setHasSeenBuyLoadOnboarding,

  login,
  logout,

  setUser,
  clearUser,

  networkSuccess,
  networkFailure,

  setAttachedFiles,
  clearAttachedFiles,

  setNotifications,
  clearNotifications,
}