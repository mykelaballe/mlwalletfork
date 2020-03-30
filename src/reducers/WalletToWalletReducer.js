import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  newReceiver: null,
  receiverIndex: null,
  newProp: null,
  deletedIndex: null,
  refreshAllReceivers: false,
  refreshFavorites: false
})

const addWalletReceiver = (state, action) => state.merge({ newReceiver:action.newReceiver })

const updateWalletReceiver = (state, action) => state.merge({ receiverIndex:action.receiverIndex, newProp:action.newProp })

const deleteWalletReceiver = (state, action) => state.merge({ deletedIndex:action.deletedIndex })

const refreshWalletAllReceivers = (state, action) => state.merge({ refreshAllReceivers:action.refresh })

const refreshWalletFavorites = (state, action) => state.merge({ refreshFavorites:action.refresh })
  
const ACTION_HANDLERS = {
  [Types.ADD_WALLET_RECEIVER]: addWalletReceiver,
  [Types.UPDATE_WALLET_RECEIVER]: updateWalletReceiver,
  [Types.DELETE_WALLET_RECEIVER]: deleteWalletReceiver,
  [Types.REFRESH_WALLET_ALL_RECEIVERS]: refreshWalletAllReceivers,
  [Types.REFRESH_WALLET_FAVORITES]: refreshWalletFavorites,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
