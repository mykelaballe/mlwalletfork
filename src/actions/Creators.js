import Types from './Types'

/*----------------------------------------------------------------------
 STARTUP
 ----------------------------------------------------------------------*/
 
 const startup = () => ({ type: Types.STARTUP })

 /*----------------------------------------------------------------------
 APP
 ----------------------------------------------------------------------*/
 
 const setIsFirstTime = isFirstTime => ({ type: Types.SET_IS_FIRST_TIME, isFirstTime })

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
 SHOP
 ----------------------------------------------------------------------*/

 const updateCart = items => ({ type: Types.UPDATE_CART, items })

 const addToCart = item => ({ type: Types.ADD_TO_CART, item })

 const removeFromCart = index => ({ type: Types.REMOVE_FROM_CART, index })

 const clearCart = () => ({ type: Types.CLEAR_CART })

/**
 Makes available all the action creators we've created.
 */
export default {
  startup,

  setIsFirstTime,

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

  updateCart,
  addToCart,
  removeFromCart,
  clearCart,
}