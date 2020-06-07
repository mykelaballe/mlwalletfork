import Types from './Types'

/*----------------------------------------------------------------------
 STARTUP
 ----------------------------------------------------------------------*/
 
 const startup = () => ({ type: Types.STARTUP })

 /*----------------------------------------------------------------------
 APP
 ----------------------------------------------------------------------*/
 
 const setIsFirstTime = isFirstTime => ({ type: Types.SET_IS_FIRST_TIME, isFirstTime })
 const setIsTouchIDSupported = isSupported => ({ type: Types.SET_IS_TOUCH_ID_SUPPORTED, isSupported })
 const setIsUsingTouchID = isUsing => ({ type: Types.SET_IS_USING_TOUCH_ID, isUsing })
 const setHasSeenSendMoneyOnboarding = hasSeen => ({ type: Types.SET_HAS_SEEN_SENDMONEY_ONBOARDING, hasSeen })
 const setHasSeenReceiveMoneyOnboarding = hasSeen => ({ type: Types.SET_HAS_SEEN_RECEIVEMONEY_ONBOARDING, hasSeen })
 const setHasSeenWithdrawCashOnboarding = hasSeen => ({ type: Types.SET_HAS_SEEN_WITHDRAWCASH_ONBOARDING, hasSeen })
 const setHasSeenPayBillsOnboarding = hasSeen => ({ type: Types.SET_HAS_SEEN_PAYBILLS_ONBOARDING, hasSeen })
 const setHasSeenBuyLoadOnboarding = hasSeen => ({ type: Types.SET_HAS_SEEN_BUYLOAD_ONBOARDING, hasSeen })
 const setIsLocationEnabled = isEnabled => ({ type: Types.SET_IS_LOCATION_ENABLED, isEnabled })
 const rememberLoginCredentials = credentials => ({ type: Types.REMEMBER_LOGIN_CREDENTIALS, credentials })

 /*----------------------------------------------------------------------
 AUTHENTICATION
 ----------------------------------------------------------------------*/

 const login = () => ({ type: Types.LOGIN })
 const logout = () => ({ type: Types.LOGOUT })

 /*----------------------------------------------------------------------
 USER
 ----------------------------------------------------------------------*/

 const setUser = user => ({ type: Types.SET_USER, user })
 const updateBalance = newBalance => ({ type: Types.UPDATE_BALANCE, newBalance })
 const updateUserInfo = newInfo => ({ type: Types.UPDATE_USER_INFO, newInfo })
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
 const updateWalletReceiver = (receiverIndex, newProp) => ({ type: Types.UPDATE_WALLET_RECEIVER, receiverIndex, newProp})
 const deleteWalletReceiver = deletedIndex => ({ type: Types.DELETE_WALLET_RECEIVER, deletedIndex })
 const refreshWalletAllReceivers = refresh => ({ type: Types.REFRESH_WALLET_ALL_RECEIVERS, refresh })
 const refreshWalletFavorites = refresh => ({ type: Types.REFRESH_WALLET_FAVORITES, refresh })
 const refreshWalletRecent = refresh => ({ type: Types.REFRESH_WALLET_RECENT, refresh })

 /*----------------------------------------------------------------------
 KP
 ----------------------------------------------------------------------*/

 const setKPRates = rates => ({ type: Types.SET_KP_RATES, rates })
 const addKPReceiver = newReceiver => ({ type: Types.ADD_KP_RECEIVER, newReceiver })
 const updateKPReceiver = newProp => ({ type: Types.UPDATE_KP_RECEIVER, newProp})
 const deleteKPReceiver = deletedIndex => ({ type: Types.DELETE_KP_RECEIVER, deletedIndex })
 const refreshKPAllReceivers = refresh => ({ type: Types.REFRESH_KP_ALL_RECEIVERS, refresh })
 const refreshKPFavorites = refresh => ({ type: Types.REFRESH_KP_FAVORITES, refresh })
 const refreshKPRecent = refresh => ({ type: Types.REFRESH_KP_RECENT, refresh })

 /*----------------------------------------------------------------------
 BANK TRANSFER
 ----------------------------------------------------------------------*/

 const addBankPartner = newPartner => ({ type: Types.ADD_BANK_PARTNER, newPartner })
 const updateBankPartner = newProp => ({ type: Types.UPDATE_BANK_PARTNER, newProp})
 const deleteBankPartner = deletedIndex => ({ type: Types.DELETE_BANK_PARTNER, deletedIndex })
 const refreshBankAllPartners = refresh => ({ type: Types.REFRESH_BANK_ALL_PARTNERS, refresh })
 const refreshBankFavorites = refresh => ({ type: Types.REFRESH_BANK_FAVORITES, refresh })
 const refreshBankRecent = refresh => ({ type: Types.REFRESH_BANK_RECENT, refresh })

 /*----------------------------------------------------------------------
 BILLS PAYMENT
 ----------------------------------------------------------------------*/
 
 const updateBiller = newProp => ({ type: Types.UPDATE_BILLER, newProp})
 const refreshBillersAll = refresh => ({ type: Types.REFRESH_BILLERS_ALL, refresh })
 const refreshBillersFavorites = refresh => ({ type: Types.REFRESH_BILLERS_FAVORITES, refresh })
 const refreshBillersRecent = refresh => ({ type: Types.REFRESH_BILLERS_RECENT, refresh })

 /*----------------------------------------------------------------------
 ELOAD
 ----------------------------------------------------------------------*/

 const addELoadReceiver = newReceiver => ({ type: Types.ADD_ELOAD_RECEIVER, newReceiver })
 const updateELoadReceiver = newProp => ({ type: Types.UPDATE_ELOAD_RECEIVER, newProp})
 const deleteELoadReceiver = deletedIndex => ({ type: Types.DELETE_ELOAD_RECEIVER, deletedIndex })
 const refreshELoadAllReceivers = refresh => ({ type: Types.REFRESH_ELOAD_ALL_RECEIVERS, refresh })
 const refreshELoadFavorites = refresh => ({ type: Types.REFRESH_ELOAD_FAVORITES, refresh })
 const refreshELoadRecent = refresh => ({ type: Types.REFRESH_ELOAD_RECENT, refresh })

export default {
  startup,

  setIsFirstTime,
  setIsTouchIDSupported,
  setIsUsingTouchID,
  setHasSeenSendMoneyOnboarding,
  setHasSeenReceiveMoneyOnboarding,
  setHasSeenWithdrawCashOnboarding,
  setHasSeenPayBillsOnboarding,
  setHasSeenBuyLoadOnboarding,
  setIsLocationEnabled,
  rememberLoginCredentials,

  addWalletReceiver,
  updateWalletReceiver,
  deleteWalletReceiver,
  refreshWalletAllReceivers,
  refreshWalletFavorites,
  refreshWalletRecent,

  setKPRates,
  addKPReceiver,
  updateKPReceiver,
  deleteKPReceiver,
  refreshKPAllReceivers,
  refreshKPFavorites,
  refreshKPRecent,

  addBankPartner,
  updateBankPartner,
  deleteBankPartner,
  refreshBankAllPartners,
  refreshBankFavorites,
  refreshBankRecent,

  updateBiller,
  refreshBillersAll,
  refreshBillersFavorites,
  refreshBillersRecent,

  addELoadReceiver,
  updateELoadReceiver,
  deleteELoadReceiver,
  refreshELoadAllReceivers,
  refreshELoadFavorites,
  refreshELoadRecent,

  login,
  logout,

  setUser,
  updateBalance,
  updateUserInfo,
  clearUser,

  networkSuccess,
  networkFailure,

  setAttachedFiles,
  clearAttachedFiles,

  setNotifications,
  clearNotifications,
}