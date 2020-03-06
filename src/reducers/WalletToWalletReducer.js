import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  newReceiver: null,
  deletedIndex: null
})

const addWalletReceiver = (state, action) => state.merge({ newReceiver:action.newReceiver })

const deleteWalletReceiver = (state, action) => state.merge({ deletedIndex:action.deletedIndex })
  
const ACTION_HANDLERS = {
  [Types.ADD_WALLET_RECEIVER]: addWalletReceiver,
  [Types.DELETE_WALLET_RECEIVER]: deleteWalletReceiver,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
