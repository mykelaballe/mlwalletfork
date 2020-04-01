import Types from '../actions/Types'
import Immutable from 'seamless-immutable'
import {createReducer} from 'reduxsauce'

export const INITIAL_STATE = Immutable({
  newReceiver: null,
  receiverIndex: null,
  newProp: null,
  deletedIndex: null,
  refreshAllReceivers: false,
  refreshFavorites: false,
  refreshRecent: false
})

const addKPReceiver = (state, action) => state.merge({ newReceiver:action.newReceiver })

//const updateKPReceiver = (state, action) => state.merge({ receiverIndex:action.receiverIndex, newProp:action.newProp })

const updateKPReceiver = (state, action) => state.merge({ newProp:action.newProp })

const deleteKPReceiver = (state, action) => state.merge({ deletedIndex:action.deletedIndex })

const refreshKPAllReceivers = (state, action) => state.merge({ refreshAllReceivers:action.refresh })

const refreshKPFavorites = (state, action) => state.merge({ refreshFavorites:action.refresh })

const refreshKPRecent = (state, action) => state.merge({ refreshRecent:action.refresh })
  
const ACTION_HANDLERS = {
  [Types.ADD_KP_RECEIVER]: addKPReceiver,
  [Types.UPDATE_KP_RECEIVER]: updateKPReceiver,
  [Types.DELETE_KP_RECEIVER]: deleteKPReceiver,
  [Types.REFRESH_KP_ALL_RECEIVERS]: refreshKPAllReceivers,
  [Types.REFRESH_KP_FAVORITES]: refreshKPFavorites,
  [Types.REFRESH_KP_RECENT]: refreshKPRecent,
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
