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

 /*----------------------------------------------------------------------
 WALLET TO WALLET
 ----------------------------------------------------------------------*/

 const addWalletReceiver = newReceiver => ({ type: Types.ADD_WALLET_RECEIVER, newReceiver })
 const deleteWalletReceiver = deletedIndex => ({ type: Types.DELETE_WALLET_RECEIVER, deletedIndex })

 /*----------------------------------------------------------------------
 KP
 ----------------------------------------------------------------------*/

 const addKPReceiver = newReceiver => ({ type: Types.ADD_KP_RECEIVER, newReceiver })
 const updateKPReceiver = (receiverIndex, newProp) => ({ type: Types.UPDATE_KP_RECEIVER, receiverIndex, newProp})
 const deleteKPReceiver = deletedIndex => ({ type: Types.DELETE_KP_RECEIVER, deletedIndex })

 /*----------------------------------------------------------------------
 BANK TRANSFER
 ----------------------------------------------------------------------*/

 const addBankPartner = newPartner => ({ type: Types.ADD_BANK_PARTNER, newPartner })
 const updateBankPartner = (partnerIndex, newProp) => ({ type: Types.UPDATE_BANK_PARTNER, partnerIndex, newProp})
 const deleteBankPartner = deletedIndex => ({ type: Types.DELETE_BANK_PARTNER, deletedIndex })

 /*----------------------------------------------------------------------
 ELOAD
 ----------------------------------------------------------------------*/

 const addELoadReceiver = newReceiver => ({ type: Types.ADD_ELOAD_RECEIVER, newReceiver })
 const updateELoadReceiver = (receiverIndex, newProp) => ({ type: Types.UPDATE_ELOAD_RECEIVER, receiverIndex, newProp})
 const deleteELoadReceiver = deletedIndex => ({ type: Types.DELETE_ELOAD_RECEIVER, deletedIndex })

export default {
  startup,

  setIsFirstTime,
  setIsUsingTouchID,
  setHasSeenSendMoneyOnboarding,
  setHasSeenReceiveMoneyOnboarding,
  setHasSeenWithdrawCashOnboarding,
  setHasSeenPayBillsOnboarding,
  setHasSeenBuyLoadOnboarding,

  addWalletReceiver,
  deleteWalletReceiver,

  addKPReceiver,
  updateKPReceiver,
  deleteKPReceiver,

  addBankPartner,
  updateBankPartner,
  deleteBankPartner,

  addELoadReceiver,
  updateELoadReceiver,
  deleteELoadReceiver,

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